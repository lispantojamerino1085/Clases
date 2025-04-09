<?php

namespace App\Http\Controllers;

use App\Models\Departamentos;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class DepartamentosController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $departamentos=Departamentos::all();
        return response()->json($departamentos);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validar los campos que se envian al servidor
        $campos=['nombre'=>'required|string|min:1|max:100'];
        $validador=Validator::make($request->input(),$campos);
        if($validador->fails()){
            //en caso de que falle la validacion de datos
            return response()->json([
                'status'=>false,
                'errors'=>$validador->errors()->all()
            ],400);
        }
        $departamentos=new Departamentos($request->input());
        $departamentos->save();
        return response()->json([
            'status'=>true,
            'message'=>'Departamento creado satisfactoriamente'
        ],200);

    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        //
        $departamento = Departamentos::find($id);
        return response()->json(['status'=>true,'data'=>$departamento]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Departamentos $departamento)
    {
        //validar los campos que se envian al servidor
        $campos=['nombre'=>'required|string|min:1|max:100'];
        $validador=Validator::make($request->input(),$campos);
        if($validador->fails()){
            //en caso de que falle la validacion de datos
            return response()->json([
                'status'=>false,
                'errors'=>$validador->errors()->all()
            ],400);
        }
        $departamento->update($request->input());
        return response()->json([
            'status'=>true,
            'message'=>'Departamento actualizado satisfactoriamente'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Departamentos $departamento)
    {
        //
        $departamento->delete();
        return response()->json([
            'status'=>true,
            'message'=>'Departamento eliminado satisfactoriamente'
        ],200);
    }
}
