<?php

namespace App\Filament\Resources\Orders\Schemas;

use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class OrderForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Order Status')
                ->schema([
                    Select::make('status')
                        ->options([
                            'pending' => 'Pending',
                            'processing' => 'Processing',
                            'shipped' => 'Shipped',
                            'delivered' => 'Delivered',
                            'cancelled' => 'Cancelled',
                        ])->required()->native(false),
                    TextInput::make('order_number')->disabled(),
                ])->columns(2),

            Section::make('Customer & Shipping')
                ->schema([
                    TextInput::make('first_name')->disabled(),
                    TextInput::make('last_name')->disabled(),
                    TextInput::make('email')->disabled(),
                    TextInput::make('address')->disabled(),
                    TextInput::make('city')->disabled(),
                    TextInput::make('postal_code')->disabled(),
                ])->columns(2),

            // Display Items as a Read-only List
            Section::make('Order Items')
                ->schema([
                    Repeater::make('items')
                        ->relationship()
                        ->schema([
                            Select::make('product_id')
                                ->relationship('product', 'name')
                                ->disabled(),
                            TextInput::make('quantity')->disabled(),
                            TextInput::make('price_at_purchase')->prefix('$')->disabled(),
                        ])->columns(3)->addable(false)->deletable(false),
                ]),
        ]);
    }
}
