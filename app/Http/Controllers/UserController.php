<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use App\Models\User;

class UserController extends Controller
{
  public function index()
  {
    $users = User::where('role', 'user')->get();
    return Inertia::render('Users/Index', [
      'users' => $users,
    ]);
  }
}
