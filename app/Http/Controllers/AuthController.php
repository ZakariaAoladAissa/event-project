<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    function register(Request $request){
        $user = $request->validate([
            'name'=>'required',
            'email'=>'required|email|unique:users,email',
            'password'=>'required'
        ]);
        $user['password'] = Hash::make($user['password']);
        User::create($user);
    }
    
    function login(Request $request){
        $credentials = $request->validate([
            'email'=>'required|email',
            'password'=>'required'
        ]);

        if(Auth::attempt($credentials)){
            $user = Auth::user();
            $token = $user->createToken('authToken')->plainTextToken;

            return response()->json(['token' => $token], 200);
        }

        return response()->json(['message' => 'Unauthorized'], 401);

    }
    public function logout(Request $request)
    {
        $request->user()->currentAccessToken()->delete(); // Revoke the current user's token

        return response()->json(['message' => 'Logged out successfully'], 200);
    }
}
