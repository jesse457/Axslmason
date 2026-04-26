<?php

namespace App\Filament\Imports;



use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Filament\Actions\Imports\ImportColumn;
use Filament\Actions\Imports\Importer;
use Filament\Actions\Imports\Models\Import;
use Illuminate\Support\Str;

class ProductImporter extends Importer
{
    protected static ?string $model = Product::class;

    public static function getColumns(): array
    {
        return [
            ImportColumn::make('name')
                ->requiredMapping()
                ->rules(['required', 'max:255']),

            ImportColumn::make('slug'),

            // We map "Category" string to category_id
            ImportColumn::make('category')
                ->requiredMapping()
                ->relationship(resolveUsing: 'name'),

            // We map "Brand" string to brand_id
            ImportColumn::make('brand')
                ->requiredMapping()
                ->relationship(resolveUsing: 'name'),

            ImportColumn::make('price')
                ->numeric()
                ->requiredMapping()
                ->rules(['required', 'numeric', 'min:0']),

            ImportColumn::make('original_price')
                ->numeric()
                ->rules(['nullable', 'numeric', 'min:0']),

            ImportColumn::make('stock_quantity')
                ->numeric()
                ->rules(['required', 'integer', 'min:0']),

            ImportColumn::make('description'),

            ImportColumn::make('main_image'),

            // Accept comma-separated strings for arrays
            ImportColumn::make('images')
                ->label('Gallery Images'),

            ImportColumn::make('features')
                ->label('Features (Comma Separated)'),

            ImportColumn::make('is_featured')
                ->boolean(),
        ];
    }

    public function resolveRecord(): Product
    {
        // 1. Find by slug, or create new
        $product = Product::firstOrNew([
            'slug' => $this->data['slug'] ?? Str::slug($this->data['name']),
        ]);

        // 2. Map Name to Category ID
        if (isset($this->data['category'])) {
            $category = Category::firstOrCreate(['name' => $this->data['category']], [
                'slug' => Str::slug($this->data['category'])
            ]);
            $product->category_id = $category->id;
        }

        // 3. Map Name to Brand ID
        if (isset($this->data['brand'])) {
            $brand = Brand::firstOrCreate(['name' => $this->data['brand']], [
                'slug' => Str::slug($this->data['brand'])
            ]);
            $product->brand_id = $brand->id;
        }

        // 4. Handle Comma-Separated Arrays (Features & Gallery)
        if (isset($this->data['features'])) {
            $product->features = array_map('trim', explode(',', $this->data['features']));
        }

        if (isset($this->data['images'])) {
            $product->images = array_map('trim', explode(',', $this->data['images']));
        }

        // 5. Logic: Auto-calculate discount percent
        $price = (float) $this->data['price'];
        $original = (float) ($this->data['original_price'] ?? 0);

        if ($original > $price) {
            $product->discount_percent = round((($original - $price) / $original) * 100);
        }

        return $product;
    }

    public static function getCompletedNotificationBody(Import $import): string
    {
        return "Product import complete. Success: {$import->successful_rows} | Failed: {$import->getFailedRowsCount()}";
    }
}
