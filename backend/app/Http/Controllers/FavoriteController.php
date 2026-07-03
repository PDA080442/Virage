<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class FavoriteController extends Controller
{
    public function index(Request $request): JsonResponse
    {
        return response()->json($request->user()->favorites);
    }

    public function store(Request $request, Product $product): JsonResponse
    {
        $request->user()->favorites()->syncWithoutDetaching([$product->id]);

        return response()->json($product, Response::HTTP_CREATED);
    }

    public function destroy(Request $request, Product $product): Response
    {
        $request->user()->favorites()->detach($product->id);

        return response()->noContent();
    }
}
