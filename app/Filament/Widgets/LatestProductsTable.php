<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestProductsTable extends BaseWidget
{
    // Order on dashboard (2 = under stats)
    protected static ?int $sort = 2;

    // Forces the table to take up the full width of the screen
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                // Fetch the latest 5 products
                Product::query()->latest()->limit(5)
            )
            ->heading('Recently Added Products')
            ->columns([
                Tables\Columns\ImageColumn::make('main_image')
                    ->label('Image')
                    ->circular(), // Modern circular images

                Tables\Columns\TextColumn::make('name')
                    ->searchable()
                    ->weight('bold'),

                Tables\Columns\TextColumn::make('category.name')
                    ->badge()
                    ->color('info'),

                Tables\Columns\TextColumn::make('price')
                    ->money()
                    ->weight('bold')
                    ->color('success'),

                Tables\Columns\TextColumn::make('stock_quantity')
                    ->label('Stock')
                    ->badge()
                    ->color(fn ($state) => match (true) {
                        $state > 20 => 'success',
                        $state > 0  => 'warning',
                        default     => 'danger',
                    }),
            ])
            ->paginated(false); // Turn off pagination for a clean dashboard view
    }
}
