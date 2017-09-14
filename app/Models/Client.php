<?php

namespace CodeFin\Models;

use Illuminate\Database\Eloquent\Model;
use Prettus\Repository\Contracts\Transformable;
use Prettus\Repository\Traits\TransformableTrait;
use CodeFin\Models\User;
use CodeFin\Models\BankAccount;
use CodeFin\Models\CategoryExpense;

class Client extends Model implements Transformable
{
    use TransformableTrait;

    protected $fillable = [
    	'name'
    ];

    public function users()
    {
    	return $this->hasMany(User::class);
    }

    public function bankAccounts()
    {
    	return $this->hasMany(BankAccount::class);
    }

    public function categoryExpenses()
    {
    	return $this->hasMany(CategoryExpense::class);
    }

}
