<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PasswordUpdateRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'id' => 'required|exists:users',
            'current_password' => 'required|min:8',
            'password' => 'required|min:8',
            'password_confirmation' => 'required_with:password|same:password|min:8',
        ];
    }

    public function all($keys = null)
    {
    return array_merge(parent::all(), $this->route()->parameters());
    }
}
