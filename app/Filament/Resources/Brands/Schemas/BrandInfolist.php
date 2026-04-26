<?php

namespace App\Filament\Resources\Brands\Schemas;

use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Infolists\Components\ImageEntry;
use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class BrandInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Grid::make(3)
                    ->schema([
                        // ----------------------------------------------------
                        // LEFT COLUMN: MAIN CONTENT (Spans 2 columns)
                        // ----------------------------------------------------
                        Group::make([
                            Section::make('Brand Overview')
                                ->schema([
                                    ImageEntry::make('logo_url') // Matches your Model's 'logo_url' fillable
                                        ->hiddenLabel()
                                        // Specific styling for logos to keep them looking like clean brand assets
                                        ->extraImgAttributes(['class' => 'rounded-xl shadow-sm border border-gray-100 max-w-xs object-contain p-4 bg-white'])
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
                                ]),
                        ])->columnSpan(['default' => 3, 'md' => 2]),

                        // ----------------------------------------------------
                        // RIGHT COLUMN: METADATA & METRICS (Spans 1 column)
                        // ----------------------------------------------------
                        Group::make([
                            Section::make('Metrics')
                                ->schema([
                                    // Automatically counts products tied to this Brand!
                                    TextEntry::make('products_count')
                                        ->label('Total Products')
                                        ->badge()
                                        ->color('primary')
                                        ->icon('heroicon-m-cube')
                                        ->state(fn ($record) => $record?->products()?->count() ?? 0),
                                ]),

                            Section::make('System')
                                ->collapsed()
                                ->schema([
                                    TextEntry::make('created_at')
                                        ->dateTime()
                                        ->since(),

                                    TextEntry::make('updated_at')
                                        ->dateTime()
                                        ->since(),
                                ]),
                        ])->columnSpan(['default' => 3, 'md' => 1]),
                    ]),
            ]);
    }
}
