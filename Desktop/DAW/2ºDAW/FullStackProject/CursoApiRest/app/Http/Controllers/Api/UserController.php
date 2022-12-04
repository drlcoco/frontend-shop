<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\LoginRequest;
use App\Models\User;
use Tymon\JWTAuth\Facades\JwtAuth;
use Illuminate\Http\Request;
use Tymon\JWTAuth\Exceptions\JWTException;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::get();
        return response()->json($users, 200);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $pwd = password_hash($request->password, PASSWORD_BCRYPT, ['cost', 4]);
        $user = new User();
        $user->email = $request->email;
        $user->password = $pwd;
        $user->role = $request->role;
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->image = $request->image;

        $user->save();

        $token = JWTAuth::fromUser($user);

        return response()->json([
            'user'  => $user,
            'token' => $token
        ], 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show(User $user)
    {
        return response()->json([
            'email' => $user->email,
            'role' => $user->role,
            'name' => $user->name,
            'surname' => $user->surname,
            'address' => $user->address,
            'phone' => $user->phone,
            'image' => $user->image
        ], 200);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->email = $request->email;
        $user->password = $request->password;
        $user->role = $request->role;
        $user->name = $request->name;
        $user->surname = $request->surname;
        $user->address = $request->address;
        $user->phone = $request->phone;
        $user->image = $request->image;

        $user->save();
        return response()->json($user, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy(Request $request)
    {
        $user = User::findOrFail($request->id);
        $user->delete();
        return response()->json('null', 204);
    }

    function register(Request $request){
        $json = $request->input('json', null);
        $params = json_decode($json); //Object
        $params_array = json_decode($json, true); //Array

        if(!empty($params) && !empty($params_array)){
            $params_array = array_map('trim', $params_array);

            $validate = Validator($params_array, [
                'name'     => 'required|alpha',
                'surname'  => 'required|alpha',
                'email'    => 'required|email|unique:users',
                'password' => 'required'
            ]);

            if($validate->fails()){
                $data = array(
                    'status' => 'error',
                    'code'   => 404,
                    'message' => 'Error al crear el usuario',
                    'errors' => $validate->errors()
                );}else{
                $pwd = password_hash($params->password, PASSWORD_BCRYPT, ['cost', 4]);
                $user = new User();
                $user->name = $params_array['name'];
                $user->surname = $params_array['surname'];
                $user->email = $params_array['email'];
                $user->password = $pwd;

                $user->save();

                $data = array(
                    'status' => 'success',
                    'code'   => 200,
                    'message' => 'Usuario creado correctamente',
                );
            }
        }
        return response()->json($data, $data['code']);
    }

    public function login(LoginRequest $request){
        $jwtAuth = new JwtAuth();
        $credentials = $request->only('email', 'password');

        try{
            if(!$token=JWTAuth::attempt($credentials)){
                return response()->json([
                    'error' => 'invalid credentials'
                ], 400);
            }
        }catch(JWTException $exception){
            return response()->json([
                'error' => 'not token available'
            ], 500);
        }
        $user=User::findOrFail($request->email);
        return response()->json(compact('token'), 200);
    }

}
