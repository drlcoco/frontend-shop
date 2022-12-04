<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */

    public function index()
    {
        $products = Product::get();
        return response()->json($products, 200);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $product = new Product();
        $product->title = $request->title;
        $product->description = $request->description;
        $product->stock = $request->stock;
        $product->price = $request->price;
        $product->image = $request->image;
        $product->userId = $request->userId;
        $product->categoryId = $request->categoryId;

        $product->save();
        return response()->json($product, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function show(Product $product)
    {
        return response()->json([
            'title' => $product->title,
            'description' => $product->description,
            'stock' => $product->stock,
            'price' => $product->price,
            'image' => $product->image,
            'userId' => $product->userId,
            'categoryId' => $product->categoryId
        ], 200);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $product = Product::findOrFail($request->id);
        $product->title = $request->title;
        $product->description = $request->description;
        $product->stock = $request->stock;
        $product->price = $request->price;
        $product->image = $request->image;
        $product->userId = $request->userId;
        $product->categoryId = $request->categoryId;

        $product->save();
        return response()->json($product, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\Product  $product
     * @return \Illuminate\Http\Response
     */
    public function destroy(Product $product)
    {
        /* $product = Product::destroy($request->id); */
        /* $product = Product::findOrFail($request->id); */
        $product->delete();
        return response()->json('null', 204);
    }
}
