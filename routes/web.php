<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
*/

// --- HOMEPAGE ---
// This handles the hero section and featured products shown in your HomeController
Route::get('/', [HomeController::class, 'index'])->name('home');

// --- PRODUCT CATALOG (SHOP) ---
// Note: Changed from '/shop' to '/products' to match common ecommerce standards
// and the controller's logic which expects category/brand filters.
Route::get('/products', [ProductController::class, 'index'])->name('products.index');

// --- PRODUCT DETAIL PAGE ---
// This handles the individual product view based on the slug
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// --- CHECKOUT & ORDERS ---
// 1. The UI Page: Displays the checkout form and order summary
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');

// 2. The Logic: This handles the POST request when clicking "Place Secure Order"
// You should create a 'store' method in your CheckoutController to handle DB saving
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');

// --- (Optional) SUCCESS PAGE ---
// A page to redirect users to after a successful purchase
Route::get('/order-confirmation/{order_number}', [CheckoutController::class, 'success'])->name('checkout.success');




Route::get('/search', [HomeController::class,'search']);
