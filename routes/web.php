<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('index');
});


Route::get('/watcher', 'WatcherController@index');
Route::get('/watcher/login', 'WatcherController@login');

Route::get('/users/{id}', 'WatcherController@user');

Auth::routes();

Route::get('/home', 'HomeController@index')->name('home');
