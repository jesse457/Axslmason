<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductController extends Controller
{
 // In ShopController@index

public function index(Request $request)
{
    $productsQuery = Product::with(['category', 'brand'])
        ->filter($request->only(['category', 'brand', 'min_price', 'max_price', 'sort']));

    // Apply sorting
    match ($request->sort) {
        'price_low' => $productsQuery->orderBy('price', 'asc'),
        'price_high' => $productsQuery->orderBy('price', 'desc'),
        'name_a_z' => $productsQuery->orderBy('name', 'asc'),
        default => $productsQuery->latest(),
    };

    // Paginate with 12 items per page
    $products = $productsQuery->paginate(12)->withQueryString();

    $categories = Category::withCount('products')->get()->map(fn($cat) => [
        'id' => $cat->id,
        'name' => $cat->name,
        'slug' => $cat->slug,
        'products_count' => $cat->products_count,
        'image' => $cat->image ? asset('storage/' . $cat->image) : null,
    ]);

    $brands = Brand::all()->map(fn($b) => [
        'id' => $b->id,
        'name' => $b->name,
        'slug' => $b->slug,
        'image' => $b->logo_url ? asset('storage/' . $b->logo_url) : null,
    ]);

    return Inertia::render('Shop/Index', [
        'products' => $products,
        'categories' => $categories,
        'brands' => $brands,
        'max_db_price' => Product::max('price') ?? 1000,
        'filters' => $request->only(['category', 'brand', 'min_price', 'max_price', 'sort']),
    ]);
}
    public function show(string $slug)
    {
        $product = Product::with(['category', 'brand'])
            ->where('slug', $slug)
            ->firstOrFail();

        $related = Product::where('category_id', $product->category_id)
            ->where('id', '!=', $product->id)
            ->limit(4)
            ->get()
            ->map(fn($p) => $this->transformProduct($p));

        return Inertia::render('Products/Show', [
            'product' => $this->transformProduct($product, true),
            'relatedProducts' => $related
        ]);
    }

   private function transformProduct($product, $includeFullDetails = false) {
    $mainImageUrl = $product->main_image ? asset('storage/' . $product->main_image) : '/images/placeholder.jpg';

    $data = [
        'id' => $product->id,
        'name' => $product->name,
        'slug' => $product->slug,
        'price' => (float) $product->price,
        'original_price' => (float) $product->original_price,
        'discount_percent' => $product->discount_percent,
        'image' => $mainImageUrl, // This is the "main_image"
        'category' => $product->category?->only(['name', 'slug']),
        'brand' => $product->brand?->only(['name', 'slug']),
        'stock_quantity' => $product->stock_quantity,
    ];

    if ($includeFullDetails) {
        $data['description'] = $product->description;
        $data['features'] = $product->features;

        // Create an array that starts with the main image, then adds the gallery images
        $gallery = collect([$product->main_image])
            ->merge($product->images ?? [])
            ->filter() // Remove nulls
            ->unique() // Remove duplicates if main_image is also in images array
            ->map(fn($img) => asset('storage/' . $img))
            ->values();

        $data['gallery'] = $gallery;
    }

    return $data;
}
}
