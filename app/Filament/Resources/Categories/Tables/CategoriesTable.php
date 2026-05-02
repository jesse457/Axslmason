<?php

namespace App\Filament\Resources\Categories\Tables;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class CategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('image_url')->label('Icon'),

                TextColumn::make('name')
                    ->searchable()
                    ->sortable()
                    ->formatStateUsing(fn($record) => $record->parent ? '↳ ' . $record->name : $record->name),

                // ✅ Show parent category
                TextColumn::make('parent.name')
                    ->label('Parent')
                    ->badge()
                    ->color('gray')
                    ->toggleable(isToggledHiddenByDefault: true),

                // ✅ Visual indicator for root vs child
                IconColumn::make('is_root')
                    ->label('Type')
                    ->boolean()
                    ->trueIcon('heroicon-o-folder')
                    ->falseIcon('heroicon-o-folder-open')
                    ->trueColor('success')
                    ->falseColor('warning')
                    ->getStateUsing(fn($record) => $record->parent_id === null)
                    ->tooltip(fn($record) => $record->parent_id === null ? 'Root Category' : 'Subcategory'),

                TextColumn::make('slug')
                    ->searchable()
                    ->toggleable(isToggledHiddenByDefault: true),

                TextColumn::make('products_count')
                    ->counts('products')
                    ->label('Products')
                    ->numeric()
                    ->sortable(),

                TextColumn::make('subcategories_count')
                    ->counts('subcategories')
                    ->label('Subcats')
                    ->numeric()
                    ->toggleable()
                    ->sortable(),
            ])
            ->filters([
                // ✅ Filter by parent category (show only subcategories or only root)
                SelectFilter::make('parent_id')
                    ->label('Category Type')
                    ->relationship('parent', 'name')
                    ->placeholder('All Categories')
                    ->options([
                        'null' => 'Root Categories Only',
                    ]),
            ])
            ->actions([
                ViewAction::make(),
                EditAction::make(),
            ])
            ->bulkActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
