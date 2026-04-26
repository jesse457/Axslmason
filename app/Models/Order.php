<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Order extends Model {
    protected $fillable = [
        'user_id', 'order_number', 'subtotal', 'shipping_cost', 'tax',
        'total', 'status', 'email', 'first_name', 'last_name',
        'address', 'city', 'postal_code'
    ];

    public function items(): HasMany {
        return $this->hasMany(OrderItem::class);
    }

    // Helper to generate unique order numbers
    public static function generateOrderNumber() {
        return 'AUG-' . strtoupper(uniqid());
    }
}
