<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\OrderItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class CheckoutController extends Controller
{
    public function index()
    {
        return Inertia::render('Checkout', [
            'btcRate' => 0.000015, // Could fetch from API in production
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => 'required|email|max:255',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'address' => 'required|string|max:500',
            'city' => 'required|string|max:255',
            'state' => 'nullable|string|max:255',
            'postal_code' => 'required|string|max:20',
            'shipping_method' => 'required|in:standard,express',
            'payment_method' => 'required|in:bitcoin',
            'items' => 'required|array|min:1',
            'items.*.id' => 'required|integer|exists:products,id',
            'items.*.cartQuantity' => 'required|integer|min:1',
            'items.*.name' => 'required|string',
            'items.*.price' => 'required|numeric|min:0',
        ]);

        return DB::transaction(function () use ($validated) {
            $subtotal = 0;
            $itemsToProcess = [];

            // Verify products & calculate subtotal server-side
            foreach ($validated['items'] as $cartItem) {
                $product = Product::lockForUpdate()->find($cartItem['id']);

                if (!$product) {
                    return back()->withErrors(['items' => "One or more products no longer exist."]);
                }

                if ($product->stock_quantity < $cartItem['cartQuantity']) {
                    return back()->withErrors([
                        'items' => "{$product->name} is out of stock. Only {$product->stock_quantity} remaining."
                    ]);
                }

                // Use DB price, not client-sent price (security)
                $subtotal += $product->price * $cartItem['cartQuantity'];
                $itemsToProcess[] = [
                    'product' => $product,
                    'quantity' => $cartItem['cartQuantity'],
                    'price' => $product->price
                ];
            }

            // Calculate totals
            $shipping = $validated['shipping_method'] === 'express' ? 35.00 : 15.00;
            $tax = $subtotal * 0.08;
            $total = $subtotal + $shipping + $tax;

            // Simulate BTC payment processing (replace with real gateway in production)
            // sleep(1);
            // if (rand(1, 100) <= 5) {
            //     return back()->withErrors(['payment' => 'Payment simulation declined. Please try again.']);
            // }

            $order = Order::create([
                'order_number' => Order::generateOrderNumber(),
                'email' => $validated['email'],
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'state' => $validated['state'] ?? null,
                'postal_code' => $validated['postal_code'],
                'shipping_method' => $validated['shipping_method'],
                'payment_method' => $validated['payment_method'],
                'subtotal' => $subtotal,
                'shipping_cost' => $shipping,
                'tax' => $tax,
                'total' => $total,
                'status' => 'processing',
            ]);

            // Create order items & update stock
            foreach ($itemsToProcess as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product']->id,
                    'quantity' => $item['quantity'],
                    'price_at_purchase' => $item['price'],
                ]);
                $item['product']->decrement('stock_quantity', $item['quantity']);
            }

            // Return success data via Inertia props (no redirect needed)
            return Inertia::render('Checkout', [
                'successOrder' => [
                    'order_number' => $order->order_number,
                    'total' => $order->total,
                    'items' => $order->items->map(fn($i) => [
                        'name' => $i->product?->name ?? 'Unknown',
                        'quantity' => $i->quantity,
                        'price' => $i->price_at_purchase,
                    ]),
                ],
                'btcRate' => 0.000015,
            ]);
        });
    }
}
