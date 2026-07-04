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

        $colors = ['4D7CFF', 'E11D48', '059669', 'D97706', '7C3AED', '0891B2', 'DC2626', '2563EB'];

        for ($i = 1; $i <= 20; $i++) {
            Product::create([
                'name' => "Товар {$i}",
                'description' => "Описание товара {$i}.",
                'price' => random_int(10000, 4999999) / 100,
                'image_url' => sprintf(
                    'https://placehold.co/400x400/%s/ffffff/png?text=%d',
                    $colors[($i - 1) % count($colors)],
                    $i,
                ),
            ]);
        }
    }
}
