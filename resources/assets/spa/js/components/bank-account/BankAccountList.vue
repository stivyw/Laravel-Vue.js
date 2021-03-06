<template>
	<div class="container">
		<div class="row">
			<page-title>
				<h5 class="center">Minhas contas bancárias</h5>
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
                    <table class="bordered striped highlight responsive-table">
                        <thead>
                            <tr>
                                <th v-for="(key, o ) in table.headers" >
                                    <a href="#" @click.prevent="sortBy(key)">
                                        {{ o.label }}
                                       <!--  <i class="material-icons" v-if="searchOptions.order.key == key">
                                            {{ searchOptions.order.sort == 'asc' ? 'arrow_drop_up' : 'arrow_drop_down' }}
                                        </i> -->
                                    </a>                 
                                </th>                            
                                <th>Ações</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(index,o) in bankAccounts">
                                <td>&nbsp;{{ o.id }}</td>
                                <td>{{ o.name }}</td>
                                <td>{{ o.agency }}</td>
                                <td>{{ o.account }}</td>
                                <td>
                                    <div class="row">
                                        <div class="col s2">
                                            <img class="bank-logo" :src="o.bank.data.logo" />
                                        </div>
                                        <!-- <div class="col s10 valign">
                                            <span class="left">{{o.bank.data.name}}</span>
                                        </div> -->
                                    </div>
                                </td>
                                <td>
                                    <i class="material-icons green-text" v-if="o.default">check</i>
                                    <i class="material-icons red-text" v-else="o.default">clear</i>
                                </td>
                                <td>
                                    <a v-link="{ name: 'bank-account.update', params: {id: o.id} }">Editar</a>
                                    |
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
               
                </div>                  
                
            </div>

			<div class="fixed-action-btn">
                <a class="btn-floating btn-large" v-link="{name: 'bank-account.created'}">
                    <i class="large material-icons">add</i>
                </a>
            </div>

		</div>
	</div>

	<modal :modal="modal">
        <div slot="content" v-if="bankAccountDelete">
            <h4>Mensagem de confirmação</h4>
            <p><strong>Deseja excluir esta conta bancária?</strong></p>
            <div class="divider"></div>
            <p>Nome: <strong>{{ bankAccountDelete.name }}</strong></p>
            <p>Agência: <strong>{{ bankAccountDelete.agency }}</strong></p>
            <p>C/C: <strong>{{ bankAccountDelete.account }}</strong></p>
            <div class="divider"></div>
        </div>
        <div slot="footer">
            <button class="btn btn-flat waves-effect green lighten-2 modal-close modal-action" @click="destroy()">OK</button>
            <button class="btn btn-flat waves-effect waves-red modal-close modal-action">Cancelar</button>
        </div>
    </modal>

</template>

<script>
    import ModalComponent from '../../../../_default/components/Modal.vue';
    import PaginationComponent from '../Pagination.vue';
    import PageTitleComponent from '../../../../_default/components/PageTitle.vue';
    import SearchComponent from '../../../../_default/components/Search.vue';
    import store from '../../store/store';
   

    export default{
    	components: {
    		'modal': ModalComponent,
            'pagination': PaginationComponent,
            'page-title': PageTitleComponent,
            'search': SearchComponent
    	},
    	data() {
    		return {               
                availableIncludes: 'bank',
                modal:{
                    id: 'modal-delete'
                }, 
                table: {
                    headers: {
                        id: {
                            label: '#',
                            width: '10%'
                        },
                        name: {
                            label: 'Nome',
                            width: '30%'
                        },
                        agency: {
                            label: 'Agência',
                            width: '15%'
                        },
                        account: {
                            label: 'C/C',
                            width: '15%'
                        },
                        'banks:bank_id|banks.name':{  // serve para poder fazer a ordenação por nome do banco
                            label: 'Banco',
                            width: '17%',
                        },
                        'default':{
                            label: 'Padrão',
                            width: '5%'
                        }
                    }
                },
                loadingPage: true,
    		};
    	},
        computed:{
            bankAccounts(){
                return store.state.bankAccount.bankAccounts;
            },
            searchOptions(){
                return store.state.bankAccount.searchOptions;
            },
            search: {
                get(){
                    return store.state.bankAccount.searchOptions.search;
                },
                set(value){
                    store.commit('bankAccount/setFilter', value);
                }
            },
            bankAccountDelete(){
                return store.state.bankAccount.bankAccountDelete;
            }
        },
    	created(){
    	    store.dispatch('bankAccount/query').then(()=>{
                this.loadingPage = false;                 
            });
        },
        methods: {
        	destroy(){
                store.dispatch('bankAccount/delete').then((response) => {
                    Materialize.toast('Conta bancária excluáda com sucesso!', 4000);
                });
            },
            openModalDelete(bankAccount){
                store.commit('bankAccount/setDelete',bankAccount);
                $('#modal-delete').modal('open'); //
            },
            sortBy(key){
                store.dispatch('bankAccount/queryWithSortBy', key);
            },
            filter(filter){
                store.dispatch('bankAccount/queryWithFilter', filter);
            }
        },
        events: {
            'pagination::changed'( page ){
                store.dispatch('bankAccount/queryWithPagination', page);
            }
        }
    };
</script>