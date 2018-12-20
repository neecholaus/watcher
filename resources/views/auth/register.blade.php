@extends('layouts.watcher')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-lg-8 col-xl-6 mx-auto">
            <div class="card">
                <div class="card-body">
                    <h2 class="mb-4">Register</h2>
                    <form method="POST" action="{{ route('register') }}">
                        @csrf

                        <label for="name">Name</label>
                        <input id="name" type="text" class="form-control{{ $errors->has('name') ? ' is-invalid' : '' }} mb-4" name="name" value="{{ old('name') }}" required autofocus>
                        @if ($errors->has('name'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('name') }}</strong>
                            </span>
                        @endif

                        <label for="email">Email</label>
                        <input id="email" type="email" class="form-control{{ $errors->has('email') ? ' is-invalid' : '' }} mb-4" name="email" value="{{ old('email') }}" required>
                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif

                        <label for="password">Password</label>
                        <input id="password" type="password" class="form-control{{ $errors->has('password') ? ' is-invalid' : '' }} mb-4" name="password" required>
                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif

                        <label for="password-confirm">Confirm Password</label>
                        <input id="password-confirm" type="password" class="form-control mb-4" name="password_confirmation" required>
                        <button type="submit" class="btn btn-primary w-100">Register</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
