<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Placeholder;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
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
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn(Set $set, ?string $state) =>
                            $set('slug', Str::slug($state))
                        ),

                    TextInput::make('slug')
                        ->required()
                        ->unique(ignoreRecord: true)
                        ->disabled()
                        ->dehydrated()
                        ->helperText('The slug is auto-generated from the name.'),

                    // ✅ PARENT CATEGORY SELECT (for subcategories)
                    Select::make('parent_id')
                        ->label('Parent Category')
                        ->helperText('Leave empty for a top-level category.')
                        ->relationship('parent', 'name') // Uses Category::parent() relation
                        ->searchable()
                        ->preload()
                        ->createOptionForm([
                            TextInput::make('name')->required(),
                        ])
                        ->columnSpanFull(),

                    FileUpload::make('image_url')
                        ->label('Category Image')
                        ->image()
                        ->imageEditor()
                        ->directory('categories')
                        ->disk('public')
                        ->columnSpanFull(),
                ])->columnSpanFull(),

            // ✅ OPTIONAL: Subcategories Preview Section
            Section::make('Subcategories')
                ->description('Categories nested under this one.')
                ->hidden(fn($record) => !$record?->exists) // Only show when editing
                ->schema([
                Placeholder::make('subcategories_list')
                        ->label('')
                        ->content(fn($record) => $record->subcategories->isNotEmpty()
                            ? $record->subcategories->pluck('name')->join(', ')
                            : 'No subcategories yet.'
                        ),
                ])->columnSpanFull(),
        ]);
    }
}
