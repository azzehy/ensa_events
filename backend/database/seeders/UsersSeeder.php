<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UsersSeeder extends Seeder
{
    public function run()
    {
        // Create admin
        User::create([
            'name' => 'Admin User',
            'email' => 'admin@ensa.ma',
            'password' => Hash::make('password123'),
            'role' => 'admin',
        ]);
        
        // Create students
        User::create([
            'name' => 'Student User',
            'email' => 'student@ensa.ma',
            'password' => Hash::make('password123'),
            'role' => 'student',
        ]);
    }
}