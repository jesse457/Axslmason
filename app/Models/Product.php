<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model
{
    protected $fillable = [
        'category_id',
        'brand_id',
        'name',
        'slug',
        'description',
        'price',
        'original_price',
        'discount_percent',
        'stock_quantity',
        'features',
        'images',
        'main_image',
        'is_featured',
    ];

    protected $casts = [
        'features' => 'array',
        'images' => 'array',
        'is_featured' => 'boolean',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'discount_percent' => 'integer',
        'stock_quantity' => 'integer',
    ];

    /**
     * Get the category that owns the product
     */
    public function category(): BelongsTo
    {
        return $this->belongsTo(Category::class);
    }

    /**
     * Get the brand that owns the product
     */
    public function brand(): BelongsTo
    {
        return $this->belongsTo(Brand::class);
    }

    /**
     * Scope: Apply filters (category, brand, price)
     * NOTE: Sorting is handled in the controller, not here
     */
    public function scopeFilter(Builder $query, array $filters): Builder
    {
        // Category filter (single slug or comma-separated)
        $query->when($filters['category'] ?? null, function ($q, $category) {
            $q->whereHas('category', fn($sq) => $sq->where('slug', $category));
        });

        // Brand filter (supports multi-select: "nike,adidas")
        $query->when($filters['brand'] ?? null, function ($q, $brand) {
            $slugs = is_array($brand) ? $brand : explode(',', $brand);
            $q->whereHas('brand', fn($sq) => $sq->whereIn('slug', array_filter($slugs)));
        });

        // Price range filters
        $query->when($filters['min_price'] ?? null, fn($q, $min) =>
            $q->where('price', '>=', (float) $min)
        );

        $query->when($filters['max_price'] ?? null, fn($q, $max) =>
            $q->where('price', '<=', (float) $max)
        );

        return $query;
    }

    /**
     * Scope: Only in-stock products
     */
    public function scopeInStock(Builder $query): Builder
    {
        return $query->where('stock_quantity', '>', 0);
    }

    /**
     * Scope: Only featured products
     */
    public function scopeFeatured(Builder $query): Builder
    {
        return $query->where('is_featured', true);
    }

    /**
     * Get the product's main image URL with fallback
     */
    public function getMainImageUrlAttribute(): string
    {
        return $this->main_image
            ? asset('storage/' . $this->main_image)
            : '/images/placeholder.jpg';
    }

    /**
     * Check if product has a discount
     */
    public function getOnSaleAttribute(): bool
    {
        return $this->discount_percent > 0 && $this->original_price > $this->price;
    }

    /**
     * Calculate sale price if on sale
     */
    public function getSalePriceAttribute(): ?float
    {
        return $this->on_sale ? (float) $this->price : null;
    }
}
