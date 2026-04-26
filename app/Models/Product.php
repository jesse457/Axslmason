<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Product extends Model {
    protected $fillable = [
        'category_id', 'brand_id', 'name', 'slug', 'description',
        'price', 'original_price', 'discount_percent',
        'stock_quantity', 'features', 'images', 'main_image', 'is_featured'
    ];

    protected $casts = [
        'features' => 'array',
        'images'   => 'array',
        'is_featured' => 'boolean',
        'price' => 'decimal:2',
        'original_price' => 'decimal:2',
        'discount_percent' => 'integer',
        'stock_quantity' => 'integer',
    ];

    public function category(): BelongsTo {
        return $this->belongsTo(Category::class);
    }

    public function brand(): BelongsTo {
        return $this->belongsTo(Brand::class);
    }

    public function scopeFilter(Builder $query, array $filters): void {
        $query->when($filters['category'] ?? null, function ($q, $category) {
            $q->whereHas('category', fn($sq) => $sq->where('slug', $category));
        });

        $query->when($filters['brand'] ?? null, function ($q, $brand) {
            $brands = is_array($brand) ? $brand : [$brand];
            $q->whereHas('brand', fn($sq) => $sq->whereIn('slug', $brands));
        });

        $query->when($filters['min_price'] ?? null, fn($q, $min) => $q->where('price', '>=', $min));
        $query->when($filters['max_price'] ?? null, fn($q, $max) => $q->where('price', '<=', $max));

        $query->when($filters['sort'] ?? null, function ($q, $sort) {
            if ($sort === 'price_asc') $q->orderBy('price', 'asc');
            elseif ($sort === 'price_desc') $q->orderBy('price', 'desc');
            else $q->latest();
        });
    }
}
