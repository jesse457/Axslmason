<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Hidden;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make('Core Information')
                ->description('Organize your products by defining category names and images.')
                ->schema([
                    TextInput::make('name')
                        ->required()
                            ->maxLength(255)
                             ->required()
                            ->live(onBlur: true)
                            ->afterStateUpdated(fn (Set $set, ?string $state) => $set('slug', Str::slug($state))),

                    TextInput::make('slug')
                        ->required()
                        ->readOnly()
                        ->unique(ignoreRecord: true),

                    FileUpload::make('image_url')
                        ->label('Category Image')
                        ->image()
                        ->imageEditor()
                        ->directory('categories')
                        ->disk('public')
                        ->columnSpanFull(),
                ])->columnSpanFull()
        ]);
    }
}
