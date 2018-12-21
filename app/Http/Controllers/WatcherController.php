<?php

namespace App\Http\Controllers;

use App\User;
use Illuminate\Http\Request;

class WatcherController extends Controller
{
    /**
     * WatcherController constructor.
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('watcher.index');
    }
}
