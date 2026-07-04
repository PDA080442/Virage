<?php

namespace App\Http\Controllers;

use Illuminate\Http\Response;

class PlaceholderController extends Controller
{
    /** @var list<string> */
    private const COLORS = ['4D7CFF', 'E11D48', '059669', 'D97706', '7C3AED', '0891B2', 'DC2626', '2563EB'];

    public function show(int $id): Response
    {
        $color = self::COLORS[($id - 1) % count(self::COLORS)];

        $svg = <<<SVG
            <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
              <rect width="400" height="400" fill="#{$color}"/>
              <text x="200" y="200" fill="#ffffff" font-size="48" font-family="system-ui,sans-serif" text-anchor="middle" dominant-baseline="middle">{$id}</text>
            </svg>
            SVG;

        return response($svg, 200, [
            'Content-Type' => 'image/svg+xml',
            'Cache-Control' => 'public, max-age=31536000, immutable',
        ]);
    }
}
