<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Group;
use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Schemas\Components\Section;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class CategoryInfolist
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
                            Section::make('Category Overview')
                                ->schema([
                                    ImageEntry::make('image') // Matches your Model's 'image' fillable
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

                                    // Displays description beautifully if it exists
                                    TextEntry::make('description')
                                        ->html()
                                        ->prose()
                                        ->columnSpanFull()
                                        ->visible(fn ($state) => filled($state)),
                                ]),
                        ])->columnSpan(['default' => 3, 'md' => 2]),

                        // ----------------------------------------------------
                        // RIGHT COLUMN: METADATA & METRICS (Spans 1 column)
                        // ----------------------------------------------------
                        Group::make([
                            Section::make('Status & Metrics')
                                ->schema([
                                    IconEntry::make('is_featured')
                                        ->boolean()
                                        ->label('Featured Category'),

                                    // Automatically counts products tied to this Category!
                                    TextEntry::make('products_count')
                                        ->label('Total Products')
                                        ->badge()
                                        ->color('info')
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
                    ])->columnSpan(['default' => 12, 'lg' => 4]),
            ]);
    }
}
