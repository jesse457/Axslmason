<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;

// --- HOMEPAGE & SEARCH ---
Route::get('/', [HomeController::class, 'index'])->name('home');
Route::get('/search', [HomeController::class, 'search']);

// --- CORE PAGES ---
Route::get('/deals', [HomeController::class, 'deals'])->name('deals');
Route::get('/quote', [HomeController::class, 'quote'])->name('quote');
Route::get('/about', [HomeController::class, 'about'])->name('about');
Route::get('/contact', [HomeController::class, 'contact'])->name('contact');
Route::get('/blog', [HomeController::class, 'blog'])->name('blog');

// --- LEGAL & POLICIES ---
Route::get('/privacy-policy', [HomeController::class, 'privacyPolicy'])->name('privacy.policy');
Route::get('/shipping-policy', [HomeController::class, 'shippingPolicy'])->name('shipping.policy');
Route::get('/refunds-policy', [HomeController::class, 'refundsPolicy'])->name('refunds.policy');
Route::get('/terms-and-conditions', [HomeController::class, 'terms'])->name('terms');

// --- PRODUCT CATALOG (SHOP) ---
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// --- CHECKOUT & ORDERS ---
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/order-confirmation/{order_number}', [CheckoutController::class, 'success'])->name('checkout.success');
