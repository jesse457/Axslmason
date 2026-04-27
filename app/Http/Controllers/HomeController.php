<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Product;
use App\Models\Brand;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index()
    {
        $featuredProducts = Product::where('is_featured', true)
            ->with(['category', 'brand'])
            ->latest()
            ->limit(8)
            ->get();

        return Inertia::render('Home', [
            'featuredProducts' => $featuredProducts->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'original_price' => $p->original_price,
                'discount_percent' => $p->discount_percent,
                'image' => $p->main_image ? asset('storage/' . $p->main_image) : '/images/placeholder.jpg',
                'category' => $p->category?->name,
                'brand_name' => $p->brand?->name,
            ]),
            'collections' => Category::limit(6)->get()->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'image' => $cat->image ? asset('storage/' . $cat->image) : '/images/cat-placeholder.jpg',
            ]),
            'brands' => Brand::all()->map(fn($b) => [
                'id' => $b->id,
                'name' => $b->name,
                'logo' => $b->logo_url ? asset('storage/' . $b->logo_url) : null,
            ]),
            'reviews' => [
                [
                    'id' => 1,
                    'user' => 'John R. - Site Foreman',
                    'rating' => 5,
                    'comment' => 'The high-torque drills from AUGIMEN saved us 3 days on our last project. Incredible durability.',
                    'date' => '2 days ago'
                ],
                [
                    'id' => 2,
                    'user' => 'Sarah M. - Logistics Manager',
                    'rating' => 5,
                    'comment' => 'Fast delivery and the equipment arrived fully certified. Our primary hardware partner now.',
                    'date' => '1 week ago'
                ]
            ]
        ]);
    }

    public function search(Request $request)
    {
        $query = $request->input('q');
        if (!$query) return response()->json(['products' => []]);

        $products = Product::where('name', 'LIKE', "%{$query}%")
            ->take(6)
            ->get()
            ->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'image' => $p->main_image ? asset('storage/' . $p->main_image) : '/images/placeholder.jpg',
            ]);

        return response()->json(['products' => $products]);
    }

    // --- DEALS & QUOTES ---

    public function deals()
    {
        // Get products that have an original price (indicating a sale)
        $deals = Product::whereNotNull('original_price')
            ->where('original_price', '>', 0)
            ->with('brand')
            ->latest()
            ->get();

        return Inertia::render('Deals', [
            'deals' => $deals->map(fn($p) => [
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'price' => $p->price,
                'original_price' => $p->original_price,
                'discount_percent' => $p->discount_percent,
                'image' => $p->main_image ? asset('storage/' . $p->main_image) : '/images/placeholder.jpg',
                'brand_name' => $p->brand?->name,
            ])
        ]);
    }

    public function quote()
    {
        return Inertia::render('Quote');
    }

    // --- COMPANY PAGES ---

    public function about()
    {
        return Inertia::render('About');
    }

    public function contact()
    {
        return Inertia::render('Contact');
    }

    public function blog()
    {
        return Inertia::render('Blog');
    }

    // --- LEGAL & POLICIES ---

    public function privacyPolicy()
    {
        return Inertia::render('PrivacyPolicy');
    }

    public function shippingPolicy()
    {
        return Inertia::render('ShippingPolicy');
    }

    public function refundsPolicy()
    {
        return Inertia::render('RefundsPolicy');
    }

    public function terms()
    {
        return Inertia::render('Terms');
    }
}
