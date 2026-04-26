<?php

namespace App\Filament\Widgets;

use App\Models\Product;
use App\Models\Order;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class DashboardStatsOverview extends BaseWidget
{
    // Determines the order on the dashboard (1 = top)
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        // Calculate total revenue (you can filter this by 'completed' status later if needed)
        $totalRevenue = Order::sum('total');

        return[
            Stat::make('Total Revenue', '$' . number_format($totalRevenue, 2))
                ->description('All time sales')
                ->descriptionIcon('heroicon-m-banknotes')
                ->color('success')
                ->chart([10, 20, 15, 30, 45, 35, 60]), // Upward trend sparkline

            Stat::make('Total Orders', Order::count())
                ->description('All registered orders')
                ->descriptionIcon('heroicon-m-shopping-cart')
                ->color('primary'),

            Stat::make('Total Products', Product::count())
                ->description('Active catalog')
                ->descriptionIcon('heroicon-m-cube')
                ->color('info'),

            Stat::make('Out of Stock', Product::where('stock_quantity', '<=', 0)->count())
                ->description('Needs restock')
                ->descriptionIcon('heroicon-m-exclamation-triangle')
                ->color('danger'),
        ];
    }
}
