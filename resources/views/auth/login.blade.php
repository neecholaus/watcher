@extends('layouts.watcher')

@section('content')
<div class="container">
    <div class="row">
        <div class="col-md-10 col-lg-8 col-xl-6 mx-auto">
            <div class="card">
                <div class="card-body">
                    <form method="POST" action="{{ route('login') }}">
                        @csrf
                        <h2 class="mb-4">Login</h2>
                        <label for="email">Email</label>
                        <input id="email" type="email" class="form-control mb-4{{ $errors->has('email') ? ' is-invalid' : '' }}" name="email" value="{{ old('email') }}" required autofocus>
                        @if ($errors->has('email'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('email') }}</strong>
                            </span>
                        @endif
                        <label for="password">Password</label>
                        <input id="password" type="password" class="form-control mb-4{{ $errors->has('password') ? ' is-invalid' : '' }}" name="password" required>
                        @if ($errors->has('password'))
                            <span class="invalid-feedback" role="alert">
                                <strong>{{ $errors->first('password') }}</strong>
                            </span>
                        @endif

                        <button type="submit" class="btn btn-primary w-100">
                            Login
                        </button>

                        @if (Route::has('password.request'))
                            <a class="btn btn-link mt-3 p-0" href="{{ route('password.request') }}">
                                Forgot Your Password?
                            </a>
                        @endif
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
