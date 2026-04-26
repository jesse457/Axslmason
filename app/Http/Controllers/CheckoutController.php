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
        return Inertia::render('Checkout');
    }

    public function store(Request $request)
    {
        // 1. Validate Form Data
        $validated = $request->validate([
            'email' => 'required|email',
            'first_name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'address' => 'required|string',
            'city' => 'required|string',
            'postal_code' => 'required|string',
            'items' => 'required|array|min:1',
        ]);

        // 2. Start Database Transaction
        // This ensures that if the payment "fails" or an error occurs, no data is saved.
        return DB::transaction(function () use ($request, $validated) {

            $subtotal = 0;
            $itemsToProcess = [];

            // 3. Verify Items and Calculate Subtotal from DB (Security check)
            foreach ($request->items as $cartItem) {
                $product = Product::lockForUpdate()->find($cartItem['id']);

                if (!$product || $product->stock_quantity < $cartItem['cartQuantity']) {
                    return back()->withErrors(['items' => "Product {$product->name} is out of stock."]);
                }

                $subtotal += $product->price * $cartItem['cartQuantity'];

                $itemsToProcess[] = [
                    'product' => $product,
                    'quantity' => $cartItem['cartQuantity'],
                    'price' => $product->price
                ];
            }

            // 4. Simulate Online Payment Processing
            // We "sleep" the server for 2 seconds to simulate talking to a bank
            sleep(2);

            // Simulate a 5% chance of payment failure
            if (rand(1, 100) <= 5) {
                return back()->withErrors(['payment' => 'The simulated payment was declined by the bank. Please try again.']);
            }

            // 5. Create the Order
            $shipping = 15.00;
            $tax = $subtotal * 0.08;
            $total = $subtotal + $shipping + $tax;

            $order = Order::create([
                'order_number' => Order::generateOrderNumber(),
                'email' => $validated['email'],
                'first_name' => $validated['first_name'],
                'last_name' => $validated['last_name'],
                'address' => $validated['address'],
                'city' => $validated['city'],
                'postal_code' => $validated['postal_code'],
                'subtotal' => $subtotal,
                'shipping_cost' => $shipping,
                'tax' => $tax,
                'total' => $total,
                'status' => 'processing', // Payment "cleared", so we move to processing
            ]);

            // 6. Create Order Items & Decrement Stock
            foreach ($itemsToProcess as $item) {
                OrderItem::create([
                    'order_id' => $order->id,
                    'product_id' => $item['product']->id,
                    'quantity' => $item['quantity'],
                    'price_at_purchase' => $item['price'],
                ]);

                // Update stock in DB
                $item['product']->decrement('stock_quantity', $item['quantity']);
            }

            // 7. Redirect to Success Page
            return redirect()->route('checkout.success', $order->order_number);
        });
    }

    public function success($order_number)
    {
        $order = Order::where('order_number', $order_number)->firstOrFail();

        return Inertia::render('OrderSuccess', [
            'order' => $order
        ]);
    }
}
