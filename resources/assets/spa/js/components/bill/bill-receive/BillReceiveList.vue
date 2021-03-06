<template>
    <div class="container">
        <div class="row">
            <page-title>
                <h5 class="center">Minhas contas a receber</h5>
            </page-title>

            <div class="card-panel z-depth-5">
                <div class="center" v-show="loadingPage">
                    <div class="preloader-wrapper big active">
                        <div class="spinner-layer spinner-blue">
                            <div class="circle-clipper left">
                                <div class="circle"></div>
                            </div>
                            <div class="gap-patch">
                                <div class="circle"></div>
                            </div>
                            <div class="circle-clipper right">
                                <div class="circle"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div v-show="!loadingPage">
                    <search @on-submit="filter" :model.sync="search"></search>
                    <table class="bordered striped hightlight responsive-table">
                        <thead>
                        <tr>
                            <th v-for="(key,o) in table.headers">
                                <a href="#" @click.prevent="sortBy(key)">
                                    {{o.label}}
                                    <!-- <i class="material-icons left" v-if="searchOptions.order.key == key">
                                        {{searchOptions.order.sort == 'asc' ? 'arrow_drop_up' : 'arrow_drop_down'}}
                                    </i> -->
                                </a>
                            </th>
                            <th>Ações</th>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="(index,o) in bills">
                            <td>{{o.id}}</td>
                            <td>{{o.date_due | dateFormat}}</td>
                            <td>{{o.name}}</td>
                            <td>{{o.value | numberFormat true}}</td>
                            <td>
                                <a href="#" @click.prevent="openModalEdit(index)">Editar</a>
                                <a href="#" @click.prevent="openModalDelete(o)">Excluir</a>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <div class="row center">
                         <pagination :current-page.sync="searchOptions.pagination.current_page"
                                     :per-page="searchOptions.pagination.per_page" 
                                     :total-records="searchOptions.pagination.total"></pagination>
                    </div>
                    <bill-data namespace="billReceive"></bill-data>
                </div>
            </div>
        </div>
    </div>

    <div class="fixed-action-btn">
        <a class="btn-floating btn-large" @click.prevent="openModalCreate()">
            <i class="large material-icons">add</i>
        </a>
    </div>

    <bill-receive-create :modal-options="modalCreate"></bill-receive-create>
    <bill-receive-update :index="indexUpdate" :modal-options="modalEdit"></bill-receive-update>

    <modal :modal="modalDelete">
        <div slot="content" v-if="billDelete">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta?</strong></p>
            <div class="divider"></div>
            <p>Vencimento: <strong>{{billDelete.date_due}}</strong></p>
            <p>Nome: <strong>{{billDelete.name}}</strong></p>
            <p>Valor: <strong>{{billDelete.value}}</strong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="destroy()">Ok
            </button>
            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
        </div>
    </modal>
</template>
<script>  
    import ModalComponent from '../../../../../_default/components/Modal.vue';
    import PaginationComponent from '../../Pagination.vue';
    import PageTitleComponent from '../../../../../_default/components/PageTitle.vue';
    import SearchComponent from '../../../../../_default/components/Search.vue';
    import BillReceiveCreateComponent from './BillReceiveCreate.vue';
    import BillReceiveUpdateComponent from './BillReceiveUpdate.vue';
    import store from '../../../store/store';
    import BillDataComponent from '../BillData.vue';

    export default{
        components: {
            'modal': ModalComponent,
            'pagination': PaginationComponent,
            'page-title': PageTitleComponent,
            'search': SearchComponent,
            'bill-receive-create': BillReceiveCreateComponent,
            'bill-receive-update': BillReceiveUpdateComponent,
            'bill-data': BillDataComponent,
        },
        data(){
            return{
                modalDelete: {
                    id: "modal-delete"
                }, modalCreate: {
                    id: "modal-create"
                }, modalEdit: {
                    id: "modal-edit"
                },
                indexUpdate: 0,
                table: {
                    headers: {
                        id: {
                            label: '#', width: '7%'
                        },
                        date_due: {
                            label: 'Vencimento', width: '30%'
                        },
                        name: {
                            label: 'Nome', width: '30%'
                        },
                        value: {
                            label: 'Valor',  width: '13%'
                        }
                    }
                },
                loadingPage: true
            }
        },
        computed: {
            bills(){
                return store.state.billReceive.bills;
            },
            searchOptions(){
                return store.state.billReceive.searchOptions;
            },
            search: {
                get(){
                    return store.state.billReceive.searchOptions.search;
                },
                set(value){
                    store.commit('billReceive/setFilter',value);
                }
            },
            billDelete(){
                return store.state.billReceive.billDelete;
            }
        },
        created(){
            store.dispatch('billReceive/query').then((response) => {
                this.loadingPage = false;
            });
            store.dispatch('bankAccount/lists');
            store.dispatch('categoryRevenue/query');
        },
        methods: {
            destroy(){
                store.dispatch('billReceive/delete').then((response) => {
                    Materialize.toast('Conta excluída com sucesso',5000);
                });
            },
            openModalCreate(){
                $(`#${this.modalCreate.id}`).modal('open');
            },
            openModalEdit(index){
                this.indexUpdate = index;
                $(`#${this.modalEdit.id}`).modal('open');
            },
            openModalDelete(bill){
                store.commit('billReceive/setDelete',bill);
                $('#modal-delete').modal('open');
            },
            sortBy(key){
                store.dispatch('billReceive/queryWithSortBy',key);
            },
            filter(){
                store.dispatch('billReceive/queryWithFilter');
            }
        },
        events: {
            'pagination::changed'(page){
                store.dispatch('billReceive/queryWithPagination',page);
            }
        }
    }


</script>
