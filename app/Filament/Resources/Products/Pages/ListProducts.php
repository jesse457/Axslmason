<?php

namespace App\Filament\Resources\Products\Pages;

use App\Filament\Imports\ProductImporter;
use App\Filament\Resources\Products\ProductResource;
use Filament\Actions;
use Filament\Actions\ImportAction;
use Filament\Resources\Pages\ListRecords;
use Filament\Support\Enums\Alignment;
use Illuminate\Support\HtmlString;

class ListProducts extends ListRecords
{
    protected static string $resource = ProductResource::class;

    protected function getHeaderActions(): array
    {
        return[
            ImportAction::make()
                ->importer(ProductImporter::class)
                ->label('Import Catalog')
                ->icon('heroicon-o-arrow-up-tray')
                ->color('warning')
                ->modalHeading('Import Product Catalog')
                ->modalIcon('heroicon-o-document-plus')
                ->modalIconColor('warning')
                ->modalAlignment(Alignment::Center)
                ->modalSubmitActionLabel('Start Processing')
                
                // INJECT HTML DIRECTLY INTO THE DESCRIPTION
                // This completely replaces the need for ->form()
                ->modalDescription(new HtmlString('
                    <p class="mb-4">Upload a CSV file to bulk-sync your Oil, Gas, Construction, and Medical equipment.</p>
                    
                    <div class="text-sm text-left text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-900 p-4 rounded-lg border border-gray-200 dark:border-gray-800">
                        <p class="font-bold mb-2 text-gray-800 dark:text-gray-200">Quick Instructions:</p>
                        <ul class="list-disc ml-5 space-y-1">
                            <li><strong>Categories & Brands:</strong> Will be auto-created if they do not exist.</li>
                            <li><strong>Features & Images:</strong> Separate multiple items with commas (e.g. <code>Heavy Duty, Fast</code>).</li>
                            <li><strong>Slug:</strong> Leave blank to auto-generate from the product name.</li>
                        </ul>
                    </div>
                ')),

            Actions\CreateAction::make()
                ->icon('heroicon-o-plus'),
        ];
    }
}