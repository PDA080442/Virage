<?php

namespace Database\Factories;

use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 100, 50000),
            'image_url' => sprintf(
                'https://placehold.co/400x400/%s/ffffff/png?text=%s',
                substr(md5(fake()->unique()->uuid()), 0, 6),
                urlencode(fake()->word()),
            ),
        ];
    }
}
