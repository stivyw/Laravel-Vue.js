<?php

namespace SisFin\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as BaseVerifier;

class VerifyCsrfToken extends BaseVerifier
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     * Escapar do TOKEN
     */
    protected $except = [
        //
    	'api/hooks/*'
    ];
}
