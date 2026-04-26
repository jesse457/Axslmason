<?php

namespace App\Filament\Resources\Products\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Repeater;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Core Information')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),
                        TextInput::make('slug')->required()->readOnly()->unique(ignoreRecord: true),
                        Select::make('category_id')->relationship('category', 'name')->required(),
                        Select::make('brand_id')->relationship('brand', 'name')->required(),
                        RichEditor::make('description')->required()->columnSpanFull(),
                    ])->columns(2),

                Section::make('Pricing & Inventory')
                    ->schema([
                        TextInput::make('price')->numeric()->prefix('$')->required(),
                        TextInput::make('original_price')->numeric()->prefix('$'),
                        TextInput::make('stock_quantity')->numeric()->default(0)->required(),
                        Toggle::make('is_featured')->label('Feature on Homepage'),
                    ])->columns(2),

                Section::make('Media & Features')
                    ->schema([
                        FileUpload::make('main_image')
                            ->image()
                            ->directory('products/main')
                            ->disk('public') // Add this to ensure it saves to public storage
                            ->required(),

                        // JSON Images Field
                        FileUpload::make('images')
                            ->multiple() // This automatically saves as a JSON array because of our Model Cast
                            ->image()
                            ->directory('products/gallery')
                            ->disk('public')
                            ->reorderable(),

                        Repeater::make('features')
                            ->simple(
                                TextInput::make('feature')->required(),
                            )
                            ->reorderable(),
                    ]),
            ]);
    }
}
