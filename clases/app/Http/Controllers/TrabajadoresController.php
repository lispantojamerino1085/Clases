<?php



namespace App\Http\Controllers;

use App\Models\Trabajadores;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;

class TrabajadoresController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //realizar la consulta a la base de datos  y realizar el cruce de tablas entre trabajadore y departamentos
        $trabajadores=Trabajadores::select('trabajadores.*','departamentos.nombre as departamento')
        ->join('departamentos','departamentos.id','trabajadores.id_departamento')
        ->paginate(10);
        return response()->json($trabajadores);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //validar los campos que se envian al servidor
        $campos=[
            'nombre'=>'required|string|min:1|max:100',
            'apellido' => 'required|string|min:1|max:100',
            'direccion' => 'required|string|min:1|max:150',
            'correo'=>'required|email|max:80',
            'telefono'=>'required|max:15',
            'id_departamento'=>'required|numeric'
        ];
        $validador=Validator::make($request->input(),$campos);
        if($validador->fails()){
            //en caso de que falle la validación de datos
            return response()->json([
                'status'=>false,
                'errors'=>$validador->errors()->all()
            ],400);            
        }
        //en caso de salir todo correctamente
        $trabajadores=new Trabajadores($request->input());
        $trabajadores->save();

        return response()->json([
            'status'=>true,
            'message'=>'Trabajador  creado satisfactoriamente'
        ],200);
    }

    /**
     * Display the specified resource.
     */
    public function show($id)
    {
        $trabajador = Trabajadores::find($id);
        return response()->json(['status'=>true,'data'=>$trabajador]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Trabajadores $trabajador)
    {
        
        //validar los campos que se envian al servidor
        $campos=[
            'nombre'=>'required|string|min:1|max:100',
            'apellido' => 'required|string|min:1|max:100',
            'direccion' => 'required|string|min:1|max:150',
            'correo'=>'required|email|max:80',
            'telefono'=>'required|max:15',
            'id_departamento'=>'required|numeric'
        ];
        $validador=Validator::make($request->input(),$campos);
        if($validador->fails()){
            //en caso de que falle la validación de datos
            return response()->json([
                'status'=>false,
                'errors'=>$validador->errors()->all()
            ],400);            
        }
        //en caso de salir todo correctamente
        $trabajador->update($request->input());

        return response()->json([
            'status'=>true,
            'message'=>'Trabajador  editado satisfactoriamente'
        ],200);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Trabajadores $trabajador)
    {
        $trabajador->delete();
        return response()->json([
            'status'=>true,
            'message'=>'Trabajador eliminado satisfactoriamente'
        ],200);
    }

    //crear la funcion empleado por departamento

    public function TrabajadoresDepartamento(){
        $trabajadores=Trabajadores::select(DB::raw('count(id_departamento) as conteo'),'departamentos.nombre as departamento')
        ->join('departamentos','departamentos.id','trabajadores.id_departamento')
        ->groupBy('departamentos.nombre')->get();

        return response()->json($trabajadores);
    }
//funcion para lostar todos losempleados con sus respectivos departamentos
// la misma consulta en el funcion index
    public function all(){
        //realizar la consulta a la base de datos  y realizar el cruce de tablas entre trabajadore y departamentos
        $trabajadores=Trabajadores::select('trabajadores.*','departamentos.nombre as departamento')
        ->join('departamentos','departamentos.id','trabajadores.id_departamento')
        ->get();
        return response()->json($trabajadores);
    }
}