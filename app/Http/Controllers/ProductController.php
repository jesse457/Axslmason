<?php

namespace App\Http\Controllers;

use App\Models\Brand;
use App\Models\Category;
use App\Models\Product;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Collection;

class ProductController extends Controller
{
    /**
     * Display a listing of products with filters, sorting, and pagination.
     */
    public function index(Request $request)
    {
        // 1. Base query with relationships
        $productsQuery = Product::with(['category', 'brand']);

        // 2. Apply filters via scope
        $productsQuery->filter($request->only(['category', 'brand', 'min_price', 'max_price']));

        // 3. Apply sorting
        $productsQuery->when($request->sort, function ($query, $sort) {
            return match ($sort) {
                'price_low' => $query->orderBy('price', 'asc'),
                'price_high' => $query->orderBy('price', 'desc'),
                'name_a_z' => $query->orderBy('name', 'asc'),
                'name_z_a' => $query->orderBy('name', 'desc'),
                default => $query->latest(),
            };
        }, fn($q) => $q->latest());

        // 4. Paginate
        $products = $productsQuery->paginate(12)->withQueryString();

        // 5. Load categories with counts + preview products for sidebar
        $categories = Category::withCount('products')
            ->with([
                'subcategories' => function ($q) {
                    $q->withCount('products');
                },
                'products' => function ($q) {
                    $q->limit(3)->select('id', 'name', 'slug', 'price', 'main_image');
                }
            ])
            ->get()
            ->map(fn($cat) => [
                'id' => $cat->id,
                'name' => $cat->name,
                'slug' => $cat->slug,
                'products_count' => $cat->products_count,
                'subcategories' => $cat->subcategories->map(fn($sub) => [
                    'id' => $sub->id,
                    'name' => $sub->name,
                    'slug' => $sub->slug,
                    'products_count' => $sub->products_count,
                ]),
                'products' => collect($cat->products)->map(fn($p) => $this->transformProduct($p))->values(),
            ]);

        // 6. Load brands
        $brands = Brand::all()->map(fn($b) => [
            'id' => $b->id,
            'name' => $b->name,
            'slug' => $b->slug,
            'logo_url' => $b->logo_url ? asset('storage/' . $b->logo_url) : null,
        ]);

        // ✅ FIX: Manually build pagination links array (do NOT use $products->links())
        $paginationLinks = [];
        $currentPage = $products->currentPage();
        $lastPage = $products->lastPage();

        // Previous link
        $paginationLinks[] = [
            'url' => $products->previousPageUrl(),
            'label' => '&laquo; Previous',
            'active' => false,
        ];

        // Page numbers (smart range: first, last, current +/- 2)
        for ($page = 1; $page <= $lastPage; $page++) {
            if ($page === 1 || $page === $lastPage || ($page >= $currentPage - 2 && $page <= $currentPage + 2)) {
                $paginationLinks[] = [
                    'url' => $products->url($page),
                    'label' => (string) $page,
                    'active' => $page === $currentPage,
                ];
            } elseif ($page === $currentPage - 3 || $page === $currentPage + 3) {
                $paginationLinks[] = [
                    'url' => null,
                    'label' => '...',
                    'active' => false,
                ];
            }
        }

        // Next link
        $paginationLinks[] = [
            'url' => $products->nextPageUrl(),
            'label' => 'Next &raquo;',
            'active' => false,
        ];

        // 7. Return Inertia response
        return Inertia::render('Shop/Index', [
            'products' => [
                'data' => collect($products->items())->map(fn($p) => $this->transformProduct($p))->values(),
                'current_page' => $products->currentPage(),
                'last_page' => $products->lastPage(),
                'per_page' => $products->perPage(),
                'total' => $products->total(),
                'from' => $products->firstItem(),
                'to' => $products->lastItem(),
                'links' => $paginationLinks, // ✅ Safe array, not a View object
            ],
            'categories' => $categories,
            'brands' => $brands,
            'max_db_price' => Product::max('price') ?? 10000000,
            'filters' => $request->only(['category', 'brand', 'min_price', 'max_price', 'sort']),
        ]);
    }

    /**
     * Display the specified product.
     */
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
            'relatedProducts' => $related,
        ]);
    }

    /**
     * Transform product model to API-ready array.
     */
    private function transformProduct($product, bool $includeFullDetails = false): array
    {
        $mainImageUrl = $product->main_image
            ? asset('storage/' . $product->main_image)
            : '/images/placeholder.jpg';

        $data = [
            'id' => $product->id,
            'name' => $product->name,
            'slug' => $product->slug,
            'price' => (float) $product->price,
            'original_price' => $product->original_price ? (float) $product->original_price : null,
            'discount_percent' => $product->discount_percent,
            'main_image' => $mainImageUrl,
            'image' => $mainImageUrl,
            'category' => $product->category ? [
                'id' => $product->category->id,
                'name' => $product->category->name,
                'slug' => $product->category->slug,
            ] : null,
            'brand' => $product->brand ? [
                'id' => $product->brand->id,
                'name' => $product->brand->name,
                'slug' => $product->brand->slug,
            ] : null,
            'stock_quantity' => $product->stock_quantity,
            'is_in_stock' => $product->stock_quantity > 0,
        ];

        if ($includeFullDetails) {
            $data['description'] = $product->description;
            $data['features'] = is_array($product->features)
                ? $product->features
                : json_decode($product->features ?? '[]', true);

            $data['specifications'] = is_array($product->specifications)
                ? $product->specifications
                : json_decode($product->specifications ?? '[]', true);

            // Build gallery safely
            $images = collect();
            if ($product->main_image) {
                $images->push($product->main_image);
            }
            if (is_array($product->images)) {
                $images = $images->merge($product->images);
            }

            $gallery = $images
                ->filter()
                ->unique()
                ->map(fn($img) => asset('storage/' . $img))
                ->values()
                ->toArray();

            $data['gallery'] = $gallery;
        }

        return $data;
    }
}
