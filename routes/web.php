<?php

use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\ProductController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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

Route::middleware(['web'])->group(function () {
    // Policy Pages
    Route::get('/shipping-policy', fn() => Inertia::render('Policy/ShippingPolicy', [
        'lastUpdated' => 'March 15, 2026'
    ]))->name('shipping-policy');

    Route::get('/return-policy', fn() => Inertia::render('Policy/ReturnPolicy', [
        'lastUpdated' => 'March 15, 2026'
    ]))->name('return-policy');

    Route::get('/terms', fn() => Inertia::render('Policy/TermsAndConditions', [
        'lastUpdated' => 'March 15, 2026'
    ]))->name('terms');

    Route::get('/privacy', fn() => Inertia::render('Policy/PrivacyPolicy'))->name('privacy');
});

// --- PRODUCT CATALOG (SHOP) ---
Route::get('/products', [ProductController::class, 'index'])->name('products.index');
Route::get('/products/{slug}', [ProductController::class, 'show'])->name('products.show');

// --- CHECKOUT & ORDERS ---
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/order-confirmation/{order_number}', [CheckoutController::class, 'success'])->name('checkout.success');
