<?php

namespace SisFin\Criteria;

use Prettus\Repository\Contracts\CriteriaInterface;
use Prettus\Repository\Contracts\RepositoryInterface;

/**
 * Class WithDepthCategoriesCriteria
 * @package namespace SisFin\Criteria;
 */
class WithDepthCategoriesCriteria implements CriteriaInterface
{
    /**
     * Apply criteria in query repository
     *
     * @param                     $model
     * @param RepositoryInterface $repository
     *
     * @return mixed
     */
    public function apply($model, RepositoryInterface $repository)
    {
        return $model->withDepth();// where parent_id = null procurar profundidade
    }
}
