<?php

namespace App\Filament\Imports;

use App\Models\Product;
use App\Models\Brand;
use App\Models\Category;
use Filament\Actions\Imports\ImportColumn;
use Filament\Actions\Imports\Importer;
use Filament\Actions\Imports\Models\Import;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Log;

class ProductImporter extends Importer
{
    protected static ?string $model = Product::class;

    public static function getColumns(): array
    {
        return[
            ImportColumn::make('name')
                ->label('Product Name')
                ->helperText('The full commercial name.')
                ->requiredMapping()
                ->rules(['required', 'max:255']),

            ImportColumn::make('slug')
                ->label('URL Slug')
                ->helperText('Leave empty to auto-generate.'),

            ImportColumn::make('category')
                ->label('Sector/Category')
                ->helperText('e.g. Oil And Gas Exploration Equipment')
                ->requiredMapping()
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    if (blank($state)) return;

                    $category = Category::firstOrCreate(
                        ['name' => trim($state)],
                        ['slug' => Str::slug($state)]
                    );
                    $record->category_id = $category->id;
                }),

            ImportColumn::make('brand')
                ->label('Brand Name')
                ->helperText('e.g. CAT or CORE-DRILL')
                ->requiredMapping()
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    if (blank($state)) return;

                    $brand = Brand::firstOrCreate(['name' => trim($state)],
                        ['slug' => Str::slug($state)]
                    );
                    $record->brand_id = $brand->id;
                }),

            ImportColumn::make('price')
                ->label('Current Price')
                ->numeric()
                ->requiredMapping()
                ->rules(['required', 'numeric', 'min:0']),

            ImportColumn::make('original_price')
                ->label('Original Price (Optional)')
                ->numeric()
                ->rules(['nullable', 'numeric', 'min:0']),

            ImportColumn::make('stock_quantity')
                ->label('Stock Quantity')
                ->numeric()
                ->rules(['required', 'integer', 'min:0']),

            ImportColumn::make('description')
                ->label('Description'),

            ImportColumn::make('main_image')
                ->label('Main Image Path')
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    if (blank($state)) return;

                    if (filter_var($state, FILTER_VALIDATE_URL)) {
                        try {
                            // Added timeout so a bad link doesn't hang the queue
                            $response = Http::timeout(10)->get($state);
                            if ($response->successful()) {
                                $filename = 'products/' . Str::random(10) . '.jpg';
                                Storage::disk('public')->put($filename, $response->body());
                                $record->main_image = $filename;
                            }
                        } catch (\Exception $e) {
                            Log::error("Product Import: Failed to download main_image from {$state}");
                        }
                    } else {
                        // If it's already a local path string, just save it
                        $record->main_image = $state;
                    }
                }),

            ImportColumn::make('images')
                ->label('Gallery Images (Comma Separated)')
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    if (blank($state)) {
                        $record->images =[];
                        return;
                    }

                    $urls = array_filter(array_map('trim', explode(',', $state)));
                    $downloadedPaths =[];

                    foreach ($urls as $url) {
                        if (filter_var($url, FILTER_VALIDATE_URL)) {
                            try {
                                $response = Http::timeout(10)->get($url);
                                if ($response->successful()) {
                                    $name = 'products/gallery/' . Str::random(10) . '.jpg';
                                    Storage::disk('public')->put($name, $response->body());
                                    $downloadedPaths[] = $name;
                                }
                            } catch (\Exception $e) {
                                Log::error("Product Import: Failed to download gallery image from {$url}");
                            }
                        } else {
                            $downloadedPaths[] = $url;
                        }
                    }

                    // Assign the array of downloaded paths to the model
                    $record->images = $downloadedPaths;
                }),

            ImportColumn::make('features')
                ->label('Features (Comma Separated)')
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    if (blank($state)) return;
                    $record->features = array_filter(array_map('trim', explode(',', $state)));
                }),

            ImportColumn::make('is_featured')
                ->label('Featured Product')
                ->helperText('1 for Yes, 0 for No')
                ->boolean(),
        ];
    }

    public function resolveRecord(): ?Product
    {

    Log::info("Importing row: " . ($this->data['name'] ?? 'Unknown'));
        // 1. Find by slug, or create new instance
        $product = Product::firstOrNew([
            'slug' => $this->data['slug'] ?? Str::slug($this->data['name']),
        ]);

        // 2. Logic: Auto-calculate discount percent
        $price = (float) ($this->data['price'] ?? 0);
        $original = (float) ($this->data['original_price'] ?? 0);

        if ($original > $price) {
            $product->discount_percent = round((($original - $price) / $original) * 100);
        } else {
            $product->discount_percent = 0;
        }

        return $product;
    }

    public function getJobRetryUntil(): ?\Carbon\CarbonInterface
    {
        return now()->addMinutes(5);
    }

    public static function getCompletedNotificationTitle(Import $import): string
    {
        return 'Import Successfully Processed';
    }

    public static function getCompletedNotificationBody(Import $import): string
    {
        $body = "Your product catalog import has completed. {$import->successful_rows} row(s) imported successfully.";

        if ($failedRowsCount = $import->getFailedRowsCount()) {
            $body .= " " . number_format($failedRowsCount) . " row(s) failed to import. Check your error logs for bad image URLs.";
        }

        return $body;
    }
}
