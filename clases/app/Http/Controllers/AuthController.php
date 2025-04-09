<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

class AuthController extends Controller
{
    public function create(Request $request){

        //validar lo datos enviado
        //validar los campos que se envian al servidor
        $campos=[
            'name'=>'required|string|min:1|max:100',
            'email'=>'required|email|max:80|unique:users',
            'password'=>'required|max:15'
        ];
        $validador=Validator::make($request->input(),$campos);
        if($validador->fails()){
            return response()->json([
                'status'=>false,
                'errors'=>$validador->errors()->all()
            ],400);   
        }
        //en caso de pasar la validacion
        $user=User::create([
            'name'=>$request->name,
            'email'=>$request->email,
            'password'=>Hash::make($request->password)
        ]);

        return response()->json([
            'status'=>true,
            'message'=>'Usuario creado satisfactoriamente',
            'token'=>$user->createToken('API TOKEN')->plainTextToken
        ],200);
    }

    public function login(Request $request){
        //validar lo datos enviado
        //validar los campos que se envian al servidor
        $campos=[
            'email'=>'required|email|max:100',
            'password'=>'required'
        ];
        $mensajes = [
            'required' => 'El campo :attribute es requerido.',
            'email' => 'El campo :attribute debe ser un correo válido.',
            'max' => 'El campo :attribute no puede superar los :max caracteres.'
        ];
        $validador=Validator::make($request->input(),$campos,$mensajes);
        if($validador->fails()){
            return response()->json([
                'status'=>false,
                'errors'=>$validador->errors()->all()
            ],400);   
        }
        //en caso de pasar la validacion
        if(!Auth::attempt($request->only('email','password'))){
            return response()->json([
                'status'=>false,
                'errors'=>['No autorizado']
            ],401);
        }
        $user=User::where('email',$request->email)->first() ;
        return response()->json([
            'status'=>true,
            'message'=>'Usuario logeado correctamente',
            'user'=>$user,
            'token'=>$user->createToken('API TOKEN')->plainTextToken
        ],200);
    }

    public function logout(Request $request){
        $request->user()->currentAccessToken()->delete();

        return response()->json([
            'message' => 'Sesión cerrada con éxito',
    ],200);
    }
} 