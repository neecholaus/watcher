<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class WatcherController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('watcher.index');
    }

    /**
     * Displays login form
     *
     * @return \Illuminate\Contracts\View\Factory|\Illuminate\View\View
     */
    public function login()
    {
        return view('watcher.login');
    }

}
