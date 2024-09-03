<?php

namespace App\Http\Controllers;

use App\Http\Requests\CreateTodoRequest;
use App\Http\Requests\UpdateTodoRequest;
use App\Models\Todo;
use Illuminate\Support\Facades\Log;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class TodoController extends Controller
{
  public function index(): Response
  {
    $todos = Todo::where('user_id', Auth::user()->id)->get();
    return Inertia::render('Todo/Index', [
      'todos' => $todos
    ]);
  }

  public function store(CreateTodoRequest $request): RedirectResponse
  {
    $data = $request->validated();
    $data['user_id'] = Auth::user()->id;
    Todo::create($data);

    return Redirect::route('todo.index')->with('success', 'Todo created.');
  }

  public function create(): Response
  {
    return Inertia::render('Todo/Create');
  }

  public function edit($id): Response
  {
    $todo = Todo::find($id);

    if (!$todo) {
      return Redirect::route('todo.index')->with('error', 'Todo not found.');
    }

    return Inertia::render('Todo/Edit', [
      'todo' => $todo
    ]);
  }

  public function update(UpdateTodoRequest $request, $id)
  {
    $todo = Todo::find($id);

    if (!$todo) {
      return Redirect::route('todo.index')->with('error', 'Todo not found.');
    }

    $data = $request->validated();
    $todo->update($data);

    return Redirect::route('todo.index')->with('success', 'Todo updated.');
  }

  public function delete($id)
  {
    $todo = Todo::find($id);
    $todo->delete();

    return Redirect::route('todo.index')->with('success', 'Todo deleted.');
  }
}
