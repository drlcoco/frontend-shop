<?php

namespace App\Helpers;

use Firebase\JWT\JWT;
use Illuminate\Support\Facades\DB;
use App\Models\User;
use Hamcrest\Core\HasToString;

class JwtAuth{

    public $key;

    public function __construct()
    {
        $this->key = 'esta_es_mi_clave_secreta_del_proyecto_final_daw';
    }

    public function signUp($email, $password, $getToken = null){
        //Buscar si existe el usuario con sus credenciales.
        $user = User::where([
            'email'    => $email,
            'password' => $password
        ])->first();

        //Comprobar si son correctas.
        $signup = false;
        if(is_object($user)){
            $signup = true;
        }

        //Generar el token con los datos del usuario identificado.
        if($signup){
            $token = array(
                'sub'         => $user->id,
                'email'       => $user->email,
                'name'        => $user->name,
                'surname'     => $user->surname,
                'iat'         => time(),
                'exp'         => time() + 60 * 60
            );

            $jwt = JWT::encode($token, $this->key, 'HS256');
            /*  */

            $publicKeyURL = 'https://www.googleapis.com/robot/v1/metadata/x509/securetoken@system.gserviceaccount.com';
            $key = json_decode(file_get_contents($publicKeyURL), true);
            $decoded = JWT::decode($jwt, $key, array('RS256'));

            if(is_null($getToken)){
                $data = $jwt;
            }else{
                $data = $decoded;
            }
        }else {
            $data = array(
                'status'   => 'error',
                'message'  => 'Login incorrecto'
            );
        }
        //Devolver los datos decodificados o el token en función de un parámetro.
        return $data;
    }
}
