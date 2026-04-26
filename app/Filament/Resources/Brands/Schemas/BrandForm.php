<?php

namespace App\Filament\Resources\Brands\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Hidden;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;
use Filament\Schemas\Components\Utilities\Set;

class BrandForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Section::make('Core Information')
                    ->description('Manage brand details and branding assets.')
                    ->schema([
                        TextInput::make('name')
                            ->required()
                            ->maxLength(255)
                             ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),

                         TextInput::make('slug')->required()->readOnly()->unique(ignoreRecord: true),

                        FileUpload::make('logo_url')
                            ->label('Brand Logo')
                            ->image()
                            ->disk('public')
                            ->imageEditor()
                            ->directory('brands')
                            ->columnSpanFull(),
                    ])->columnSpanFull()
            ]);
    }
}
