<?php

namespace SisFin\Transformers;

use League\Fractal\TransformerAbstract;
use SisFin\Models\Bank;

/**
 * Class BankTransformer
 * @package namespace SisFin\Transformers;
 */
class BankTransformer extends TransformerAbstract
{

    /**
     * Transform the \Bank entity
     * @param \Bank $model
     *
     * @return array
     */
    public function transform(Bank $model)
    {
        return [
            'id'         => (int) $model->id,
            'name'       => $model->name,
            'logo'       => $this->makeLogoPath($model),

            /* place your other model properties here */

            'created_at' => $model->created_at,
            'updated_at' => $model->updated_at
        ];
    }


    public function makeLogoPath(Bank $model)
    {
        $url    = url('/'); // locahost::8080
        $folder = Bank::logosDir();
        return "$url/storage/$folder/{$model->logo}";
    }
}
