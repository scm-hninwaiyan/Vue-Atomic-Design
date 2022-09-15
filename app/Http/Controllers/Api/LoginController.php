<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\LoginRequest;
use Illuminate\Auth\AuthenticationException;
use App\Repositories\User\UserRepository;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class LoginController extends Controller
{
    private $userRepository;

    function __construct(UserRepository $userRepository)
    {
        $this->userRepository = $userRepository;
    }

    function authenticate(LoginRequest $request)
    {
        $user = $this->userRepository->getAuthenticate($request->email, $request->password);

        if (!$user) {
            throw new AuthenticationException(__('auth.authentication_failed'));
        }

        Auth::login($user);

        $currentUser = Auth::user();

        return [
            'userId' => $user->id,
            'password' => $user->password,
            'currentUser' => $currentUser
        ];
    }

    public function me()
    {
        $user = Auth::user();
        return [
            'userId' => $user->id,
            'email' => $user->email
        ];
    }

    public function logout()
    {
        if (Auth::check()) {
            Auth::logout();
        }
    }
}
