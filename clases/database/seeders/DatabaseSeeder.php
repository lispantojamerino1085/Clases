<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Departamentos;
use App\Models\Trabajadores;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        Departamentos::factory(6)->create();
        Trabajadores::factory(25)->create();
        // User::factory(10)->create();

       // User::factory()->create([
         //   'name' => 'Test User',
           // 'email' => 'test@example.com',
        //]);
    }
}
