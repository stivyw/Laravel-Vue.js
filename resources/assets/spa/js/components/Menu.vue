<template>
    <ul :id="o.id" class="dropdown-content" v-for="o in menusDropdown">
        <li v-for="item in o.items">
            <a v-link="{name: item.routeName}">{{ item.name }}</a>
        </li>
    </ul>
    <ul id="dropdown-logout" class="dropdown-content">
        <li>
            <a href='#' @click.prevent="goToMyFinancial()">Meu Financeiro</a>
        </li>
        <li>
            <a v-link="{name: 'auth.logout'}">Sair</a>
        </li>
    </ul>
    <div class="navbar-fixed">
        <nav>
            <div class="nav-wrapper">
                <div class="col s12">
                    <a href="#!/dashboard" class="left brand-logo">SisFin</a>
                    
                    <a href="#" data-activates="slide-out" class="button-collapse right">
                        <i class="material-icons">menu</i>
                    </a>
                    <ul class="right hide-on-med-and-down">
                        <li v-for="o in menus">
                            <a v-if="o.dropdownId" class="dropdown-button" href="!#" :data-activates="o.dropdownId">
                                {{ o.name }} <i class="material-icons right">arrow_drop_down</i>
                            </a>
                            <a v-else v-link="{name: o.url}">{{ o.name }}</a>
                        </li>
                        <li>
                            <a class="dropdown-button" href="!#" data-activates="dropdown-logout">
                                {{ name }} <i class="material-icons right">arrow_drop_down</i>
                            </a>
                        </li>
                    </ul>
                </div>
                <ul id="nav-mobile" class="side-nav">
                    <li v-for="o in menus">
                        <a v-link="{name: o.url}"> {{ o.name }} </a>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
    <ul id="slide-out" class="side-nav">
        <ul :id="o.id" class="dropdown-content" v-for="o in menusDropdown">
            <li v-for="item in o.items">
                <a v-link="{name: item.routeName}">{{ item.name }}</a>
            </li>
        </ul>
        <li v-for="o in menus">
            <a v-link="{name: o.url}"> {{ o.name }} </a>
        </li>
        <li>
            <a v-link="{name: 'auth.logout'}">Sair</a>
        </li>
    </ul>
  
        
</template>

<script type="text/javascript">
    import store from '../store/store';
    import appConfig from '../services/appConfig';
    import JwtToken from '../services/jwt-token';

    export default {
        data(){
            return {
                menus:[
                    {
                        name: 'Conta bancária', 
                        routeName: 'bank-account.list',
                        url: 'bank-account.list'
                    },
                    {
                        name: 'Plano de Contas', 
                        routeName: 'plan-account.list',
                        url: 'plan-account.list'
                    },
                    {
                        name: 'Contas', 
                        dropdownId: 'bills-dropdown'
                    },
                    {
                        name: 'Fluxo de Caixa', 
                        routeName: 'cash-flow.list',
                        url: 'cash-flow.list'
                    },
                    {
                        name: 'Extrato', 
                        routeName: 'statement.list',
                        url: 'statement.list'
                    },
                ],
                menusDropdown:[
                    {
                        id: 'bills-dropdown',
                        items: [
                            {name: "Contas a pagar", routeName: 'bill-pay.list'},
                            {name: "Contas a receber", routeName: 'bill-receive.list'},
                        ]
                    },
                ]              
            }
        },
        computed:{
            name(){                
               let user = store.state.auth.user;
               return user ? user.name : '';
            }
        },
        ready() {
            $('.button-collapse').sideNav();
            $('.dropdown-button').dropdown();
        },
        methods: {
            goToMyFinancial(){
                window.open(//abri em uma nova aba 
                    `${appConfig.my_financial_path}?token=${JwtToken.token}`,
                    '_blank'
                );
            }
        }
    };
    $('.button-collapse').sideNav({
      menuWidth: 300, // Default is 300
      edge: 'left', // Choose the horizontal origin
      closeOnClick: true, // Closes side-nav on <a> clicks, useful for Angular/Meteor
      draggable: true, // Choose whether you can drag to open on touch screens,
      onOpen: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is opened
      onClose: function(el) { /* Do Stuff*/ }, // A function to be called when sideNav is closed
    }
  );
</script>