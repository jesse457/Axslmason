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
                ->rules(['required', 'string', 'max:255']),

            ImportColumn::make('slug')
                ->label('URL Slug')
                ->helperText('Leave empty to auto-generate.')
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    if (!blank($state)) {
                        $record->slug = Str::slug($state);
                    }
                    // IMPORTANT: If state is blank, we do NOTHING.
                    // This prevents Filament from overwriting the auto-generated slug in resolveRecord().
                }),

            ImportColumn::make('category')
                ->label('Sector/Category')
                ->requiredMapping()
                ->rules(['required', 'string']) // Validates missing rows gracefully before DB crashes
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    if (blank($state)) return;

                    $category = Category::firstOrCreate(
                        ['name' => trim($state)],['slug' => Str::slug($state)]
                    );
                    $record->category_id = $category->id;
                }),

            ImportColumn::make('brand')
                ->label('Brand Name')
                ->requiredMapping()
                ->rules(['required', 'string']) // Validates missing rows gracefully
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    if (blank($state)) return;

                    $brand = Brand::firstOrCreate(
                        ['name' => trim($state)],['slug' => Str::slug($state)]
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
                ->rules(['nullable', 'numeric', 'min:0'])
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    // Prevents NULL constraint if DB requires a value
                    $record->original_price = blank($state) ? 0 : (float) $state;
                }),

            ImportColumn::make('stock_quantity')
                ->label('Stock Quantity')
                ->numeric()
                ->rules(['required', 'integer', 'min:0']),

            ImportColumn::make('description')
                ->label('Description')
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    // Prevents NULL DB constraint
                    $record->description = $state ?? '';
                }),

            ImportColumn::make('main_image')
                ->label('Main Image Path')
                ->fillRecordUsing(function (Product $record, ?string $state): void {

                    $setPlaceholder = function () use ($record) {
                        $placeholderPath = 'products/placeholder.png';

                        if (!Storage::disk('public')->exists($placeholderPath)) {
                            try {
                                $url = 'https://placehold.co/600x600.png?text=No+Image';
                                $response = Http::timeout(10)->get($url);
                                if ($response->successful()) {
                                    Storage::disk('public')->put($placeholderPath, $response->body());
                                }
                            } catch (\Exception $e) {
                                Log::error("Product Import: Failed to fetch fallback placeholder.");
                            }
                        }

                        $record->main_image = $placeholderPath;
                    };

                    if (blank($state)) {
                        $setPlaceholder();
                        return;
                    }

                    if (filter_var($state, FILTER_VALIDATE_URL)) {
                        try {
                            $response = Http::timeout(10)->get($state);

                            if ($response->successful()) {
                                $filename = 'products/' . Str::random(10) . '.jpg';
                                Storage::disk('public')->put($filename, $response->body());
                                $record->main_image = $filename;
                            } else {
                                Log::error("Product Import: Bad status code downloading main_image from {$state}");
                                $setPlaceholder();
                            }
                        } catch (\Exception $e) {
                            Log::error("Product Import: Failed to download main_image from {$state}");
                            $setPlaceholder();
                        }
                    } else {
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

                    $record->images = $downloadedPaths;
                }),

            ImportColumn::make('features')
                ->label('Features (Comma Separated)')
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    if (blank($state)) {
                        $record->features =[];
                        return;
                    }
                    $record->features = array_filter(array_map('trim', explode(',', $state)));
                }),

            ImportColumn::make('is_featured')
                ->label('Featured Product')
                ->boolean()
                ->fillRecordUsing(function (Product $record, ?string $state): void {
                    // Prevents NULL constraint
                    $record->is_featured = filter_var($state, FILTER_VALIDATE_BOOLEAN);
                }),
        ];
    }

    public function resolveRecord(): ?Product
    {
        $slug = $this->data['slug'] ?? null;

        if (blank($slug)) {
            $slug = Str::slug($this->data['name'] ?? '');
        }

        // Deep fail-safe in case the generated name was empty to prevent empty UNIQUE crashes
        if (blank($slug)) {
            $slug = 'product-' . Str::random(8);
        }

        $product = Product::firstOrNew(['slug' => $slug]);

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
