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
        $colors = ['4D7CFF', 'E11D48', '059669', 'D97706', '7C3AED', '0891B2', 'DC2626', '2563EB'];

        return [
            'name' => fake()->words(3, true),
            'description' => fake()->paragraph(),
            'price' => fake()->randomFloat(2, 100, 50000),
            'image_url' => sprintf(
                'https://placehold.co/400x400/%s/ffffff/png?text=%s',
                fake()->randomElement($colors),
                urlencode(fake()->word()),
            ),
        ];
    }
}
