<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class PostUpdateRequest extends FormRequest
{
    /**
     * Determine if the post is authorized to make this request.
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
            'id' => 'required|exists:posts',
            'title'=>'required|unique:posts',
            'comment'=>'required',
            'status'=>'required'
        ];
    }

    public function all($keys = null)
    {
    return array_merge(parent::all(), $this->route()->parameters());
    }
}
