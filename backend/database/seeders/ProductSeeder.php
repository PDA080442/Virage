<?php

namespace Database\Seeders;

use App\Models\Product;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        if (Product::count() > 0) {
            return;
        }

        for ($i = 1; $i <= 20; $i++) {
            Product::create([
                'name' => "Товар {$i}",
                'description' => "Описание товара {$i}.",
                'price' => random_int(10000, 4999999) / 100,
                'image_url' => "/api/placeholder/{$i}",
            ]);
        }
    }
}
