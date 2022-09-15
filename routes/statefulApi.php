<?php
use Illuminate\Support\Facades\Route;

Route::post('/v1/login', 'Api\LoginController@authenticate');
Route::post('/v1/password/email', 'Api\ForgotPasswordController@sendResetLinkEmail');
Route::post('/v1/password/reset', 'Api\ResetPasswordController@reset');

Route::group(['prefix' => 'v1'], function () {
    Route::post('logout', 'Api\LoginController@logout');
    Route::get('list-post', 'Api\PostController@list');
    Route::post('create-post', 'Api\PostController@store');
    Route::post('update-post/{id}', 'Api\PostController@update');
    Route::get('view-post/{id}', 'Api\PostController@view');
    Route::post('delete-post/{id}', 'Api\PostController@destroy');
    Route::post('upload-csv', 'Api\PostController@upload');

    Route::post('create-user', 'Api\UserController@store');
    Route::get('list-user', 'Api\UserController@list');
    Route::post('update-user/{id}', 'Api\UserController@update');
    Route::get('view-user/{id}', 'Api\UserController@view');
    Route::post('delete-user/{id}', 'Api\UserController@destroy');
    Route::post('update-password/{id}', 'Api\UserController@passwordUpdate');
});
