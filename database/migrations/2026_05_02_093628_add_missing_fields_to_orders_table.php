<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            // Shipping & Payment method selection
            $table->string('shipping_method')->default('standard')->after('postal_code');
            $table->string('payment_method')->default('bitcoin')->after('status');

            // State/Province (nullable for international orders)
            $table->string('state')->nullable()->after('city');

            // Bitcoin payment tracking
            $table->string('btc_address')->nullable()->after('payment_method');
            $table->decimal('btc_amount', 16, 8)->nullable()->after('btc_address');
            $table->string('btc_txid')->nullable()->after('btc_amount');
        });
    }

    public function down(): void
    {
        Schema::table('orders', function (Blueprint $table) {
            $table->dropColumn([
                'shipping_method',
                'payment_method',
                'state',
                'btc_address',
                'btc_amount',
                'btc_txid'
            ]);
        });
    }
};
