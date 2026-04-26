<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();
        $password = config('secrets.admin_password');
        User::factory()->create([
            'name' => 'Ponituspint',
            'email' => 'Ponituspint@gmail.com',
            'role' => 'admin',
            'password' => Hash::make($password),
        ]);
    }
}
