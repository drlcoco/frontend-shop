<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Requests\Auth\LoginRequest;
use Laravel\SerializableClosure\Serializers\Signed;
use Tymon\JWTAuth\Facades\JwtAuth;
use Tymon\JWTAuth\Exceptions\JWTException;

class LoginUserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */


    public function login(LoginRequest $request){
        $credentials = $request->only('email', 'password');
        $user = User::where('email', $credentials['email'])->firstOrFail();
        try{
            if(!$token=JWTAuth::attempt($credentials)){
                return response()->json([
                    'error' => 'invalid credentials'
                ], 400);
            }
        }catch(JWTException $exception){
            return response()->json([
                'error' => 'not token available' . $exception
            ], 500);
        }
        /* return response()->json(compact('token'), 200); */
        auth()->login($user, true);
        $data = [
            'id'    => $user->id,
            'name'  => $user->name,
            'email' => $user->email,
            'token' => $token,
            'image' => $user->image,
            'role'  => $user->role
        ];
        return response()->json($data, 200);
    }

}
