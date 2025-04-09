<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Trabajadores extends Model
{
    /** @use HasFactory<\Database\Factories\TrabajadoresFactory> */
    use HasFactory;
    protected $fillable=['nombre','apellido','correo','telefono','direccion','id_departamento'];
}
