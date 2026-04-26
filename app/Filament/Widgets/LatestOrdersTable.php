<?php

namespace App\Filament\Widgets;

use App\Models\Order;
use Filament\Tables;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestOrdersTable extends BaseWidget
{
    // Order on dashboard (2 = right under stats)
    protected static ?int $sort = 2;

    // Forces the table to take up the full width of the screen
    protected int | string | array $columnSpan = 'full';

    public function table(Table $table): Table
    {
        return $table
            ->query(
                // Fetch the latest 5 orders
                Order::query()->latest()->limit(5)
            )
            ->heading('Recent Orders')
            ->columns([
                Tables\Columns\TextColumn::make('order_number')
                    ->label('Order ID')
                    ->searchable()
                    ->weight('bold')
                    ->icon('heroicon-m-hashtag')
                    ->color('primary'),

                // Combines first and last name dynamically
                Tables\Columns\TextColumn::make('customer')
                    ->label('Customer')
                    ->state(fn (Order $record): string => "{$record->first_name} {$record->last_name}")
                    ->searchable(['first_name', 'last_name']),

                Tables\Columns\TextColumn::make('status')
                    ->badge()
                    ->color(fn (string $state): string => match ($state) {
                        'pending'    => 'warning',
                        'processing' => 'info',
                        'shipped'    => 'primary',
                        'completed'  => 'success',
                        'cancelled'  => 'danger',
                        default      => 'gray',
                    }),

                Tables\Columns\TextColumn::make('total')
                    ->money()
                    ->weight('bold')
                    ->color('success'),

                Tables\Columns\TextColumn::make('created_at')
                    ->label('Date')
                    ->dateTime()
                    ->since(), // Displays "2 hours ago", "1 day ago" etc.
            ])
            ->paginated(false); // Clean dashboard look without pagination
    }
}
