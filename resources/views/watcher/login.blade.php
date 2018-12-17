@extends('layouts.app')

@section('content')
    <div class="container">
        <div class="row">
            <div class="col-md-10 col-lg-8 col-xl-6 mx-auto p-3">
                <h4>Login</h4>
                <label class="mt-3">Username:</label>
                <input type="text" class="form-control" />
                <label class="mt-3">Password:</label>
                <input type="password" class="form-control" />
                <button type="submit" class="btn btn-primary w-100 mt-3">Login</button>
            </div>
        </div>
    </div>
@endsection