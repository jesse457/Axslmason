<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model
{
    protected $fillable = [
        'user_id',
        'order_number',
        'email',
        'first_name',
        'last_name',
        'address',
        'city',
        'state',              // ✅ Added
        'postal_code',
        'shipping_method',    // ✅ Added
        'payment_method',     // ✅ Added
        'subtotal',
        'shipping_cost',
        'tax',
        'total',
        'status',
        'btc_address',        // ✅ Optional: for Bitcoin payments
        'btc_amount',         // ✅ Optional: for Bitcoin payments
    ];

    protected $casts = [
        'subtotal' => 'decimal:2',
        'shipping_cost' => 'decimal:2',
        'tax' => 'decimal:2',
        'total' => 'decimal:2',
        'btc_amount' => 'decimal:8',
    ];

    public function items(): HasMany
    {
        return $this->hasMany(OrderItem::class);
    }

    public static function generateOrderNumber(): string
    {
        return 'AMX-' . strtoupper(substr(md5(uniqid(rand(), true)), 0, 8));
    }
}
