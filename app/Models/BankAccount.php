<?php

namespace SisFin\Models;

use HipsterJazzbo\Landlord\BelongsToTenants;
use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;

class BankAccount extends Model implements Transformable
{
    use TransformableTrait;
    use BelongsToTenants;

    protected $fillable = [
        'name',
        'agency',
        'account',
        'default',
        'bank_id',
    ];

    protected $casts = [
        'balance' => 'float'
    ];

    public function bank()
    {
        return $this->belongsTo(Bank::class);
    }

}
