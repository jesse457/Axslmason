<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ProductInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                // Using a 3-column grid for a rock-solid responsive layout
                // (Desktop: 2/3 Left, 1/3 Right. Mobile: Stacked)
                Grid::make(3)
                    ->schema([

                        // ----------------------------------------------------
                        // LEFT COLUMN: MAIN CONTENT (Spans 2 columns)
                        // ----------------------------------------------------
                        Group::make([
                            Section::make('Product Overview')
                                ->schema([
                                    ImageEntry::make('main_image')
                                        ->hiddenLabel()
                                        ->extraImgAttributes(['class' => 'rounded-xl shadow-sm border border-gray-100'])
                                        ->width('100%')
                                        ->height('auto')
                                        ->columnSpanFull(),

                                    Grid::make(2)->schema([
                                        TextEntry::make('name')
                                            ->weight('bold')
                                            ->size('lg'),

                                        TextEntry::make('slug')
                                            ->color('gray')
                                            ->icon('heroicon-m-link'),
                                    ]),

                                    // Renders your rich-text description beautifully instead of raw HTML tags
                                    TextEntry::make('description')
                                        ->html()
                                        ->prose()
                                        ->columnSpanFull(),
                                ]),

                            Section::make('Media & Features')
                                ->schema([
                                    // Converts your JSON array 'images' into a clean 3-column grid gallery
                                    ImageEntry::make('images')
                                        ->label('Product Gallery')
                                        ->extraImgAttributes(['class' => 'rounded-lg border border-gray-200'])
                                        ->columnSpanFull(),

                                    // Converts your JSON array 'features' into a bulleted list
                                    TextEntry::make('features')
                                        ->label('Key Features')
                                        ->bulleted()
                                        ->columnSpanFull(),
                                ]),
                        ])->columnSpan(['default' => 3, 'md' => 2]),

                        // ----------------------------------------------------
                        // RIGHT COLUMN: METADATA & PRICING (Spans 1 column)
                        // ----------------------------------------------------
                        Group::make([
                            Section::make('Pricing')
                                ->schema([
                                    TextEntry::make('price')
                                        ->money()
                                        ->weight('bold')
                                        ->color('success')
                                        ->size('lg'),

                                    Grid::make(2)->schema([
                                        TextEntry::make('original_price')
                                            ->label('Original')
                                            ->money()
                                            ->color('gray')
                                            ->visible(fn ($state) => filled($state)),

                                        TextEntry::make('discount_percent')
                                            ->label('Discount')
                                            ->badge()
                                            ->color('danger')
                                            ->suffix('% OFF')
                                            ->visible(fn ($state) => $state > 0), // Only show if discount exists
                                    ]),
                                ]),

                            Section::make('Inventory & Organization')
                                ->schema([
                                    TextEntry::make('stock_quantity')
                                        ->badge()
                                        ->color(fn (int $state): string => match (true) {
                                            $state > 20 => 'success',
                                            $state > 0 => 'warning',
                                            default => 'danger',
                                        })
                                        ->icon('heroicon-m-cube'),

                                    // Pulls the names directly from your BelongsTo relationships
                                    TextEntry::make('category.name')
                                        ->badge()
                                        ->color('info')
                                        ->icon('heroicon-m-folder'),

                                    TextEntry::make('brand.name')
                                        ->badge()
                                        ->color('primary')
                                        ->icon('heroicon-m-building-storefront'),

                                    IconEntry::make('is_featured')
                                        ->boolean()
                                        ->label('Featured on Homepage'),
                                ]),

                            Section::make('System')
                                ->collapsed() // Keeps sidebar clean
                                ->schema([
                                    TextEntry::make('created_at')
                                        ->dateTime()
                                        ->since(),

                                    TextEntry::make('updated_at')
                                        ->dateTime()
                                        ->since(),
                                ]),
                        ])->columnSpan(['default' => 3, 'md' => 1]),
                    ]) ->columnSpan(['default' => 12, 'lg' => 4]),
            ]);
    }
}
