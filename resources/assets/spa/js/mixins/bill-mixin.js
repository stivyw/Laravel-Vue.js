/*
* Modularizar o codigo
*/
import BillPay from '../models/bill';
import PageTitleComponent from '../../../_default/components/PageTitle.vue';
import ModalComponent from '../../../_default/components/Modal.vue';
import SelectMaterialComponent from '../../../_default/components/SelectMaterial.vue';
import store from '../store/store';

export default {
        components: {
            'page-title': PageTitleComponent,
            'modal': ModalComponent,
            'select-material': SelectMaterialComponent,

        },
        props:{
            index: {
                type: Number,
                required: false,
                'default': -1,
            },
            modalOptions: {
                type: Object,
                required: true
            }
        },
        data() {
            return {
                bill: new BillPay(),              
                bankAccount: {
                    name: '',
                    text: ''
                }
            }
        },
        computed:{            
            bankAccounts(){
                return store.state.bankAccount.lists;
            },
            categoriesFormatted(){
                return store.getters[`${this.categoryNamespace()}/categoriesFormatted`];
            },
            cpOptions(){                 
                return { //opçoes para o campo select 2 de categoria pai
                    data: this.categoriesFormatted,
                    templateResult(category){
                        let margin = '&nbsp'.repeat(category.level * 6);
                        let text = category.hasChildren ? `<strong>${category.text}</strong>` : category.text;
                        return `${margin}${text}`;
                    },
                    escapeMarkup(m){
                        return m;
                    }
                }
            }
        },
        watch: {
            bankAccounts(bankAccounts){
                if(bankAccounts.length > 0){
                    this.initAutocomplete();
                }
            }
        },
        methods: {
            doneId(){
                return `done-${this._uid}`;
            },
            bankAccountTextId(){
                return `bank-account-text-${this._uid}`;
            },
            bankAccountDropdownId(){
                return `bank-account-dropdown-${this._uid}`;
            },
            bankAccountHiddenId(){
                 return `bank-account-hidden-${this._uid}`;
            },
            formId(){
                return `from-bill-${this._uid}`;
            },
            repeatId(){
                return `repeat-${this._uid}`;
            },
            blurBankAccount($event){
                let el = $($event.target);
                let text = this.bankAccount.text;
                if(el.val() != text){
                    el.val(text);
                }
                this.validateBankAccount();
            },
            blurRepeatNumber($event){
                let el = $($event.target);
                if(parseInt(el.val(),10) < 0){
                    el.val(0);
                }
            },
            validateBankAccount(){
                this.$validator.validate('bank_account_id', this.bill.bank_account_id);
            },
            validateCategory(){
                let valid = this.$validator.validate('category_id', this.bill.category_id);
                let parent = $(`#${this.formId()}`).find('[name="category_id"]').parent();
                let label = parent.find('label');
                let spanSelect2 = parent.find('.select2-selection.select2-selection--single');
                if(valid){
                   label.removeClass('label-error');
                   spanSelect2.removeClass('select2-invalid');
                }else{
                    label.removeClass('label-error').addClass('label-error');
                    spanSelect2.removeClass('select2-invalid').addClass('select2-invalid');
                }
            },
            initSelect2(){
                let select2 = $(`#${this.formId()}`).find('[name="category_id"]');
                let self = this;
                select2.on('select2:close',() => {
                    self.validateCategory();
                });
            },
            initAutocomplete(){  // autocomplete configurações
                let self = this; // para poder usar o this dentro do jquery
                $(document).ready(() =>{
                    $(`#${this.bankAccountTextId()}`).materialize_autocomplete({
                        //cacheable: true,
                        limit: 10,
                        multiple:{
                            enable:false
                        },
                        hidden: {
                             el: `#${this.bankAccountHiddenId()}`
                        },
                        dropdown: {
                            el: `#${this.bankAccountDropdownId()}`
                        },
                        getData(value, callback){
                            let mapBankAccoutns = store.getters['bankAccount/mapBankAccounts'];
                            let bankAccounts = mapBankAccoutns(value); // aqui fica a nossa subcoleção para o autoomplete
                            callback(value, bankAccounts);
                        },
                        onSelect(item){
                            self.bill.bank_account_id = item.id;
                            self.bankAccount.name =item.text;
                            self.validateBankAccount();
                        },
                    });
                });
                $(`#${this.bankAccountTextId()}`).parent().find('label').insertAfter(`#${this.bankAccountTextId()}`);
            },
            submit(){
                this.validateCategory();
                this.$validator.validateAll().then(success => {
                    if(success){
                        if (this.bill.id !== 0){
                            store.dispatch(`${this.namespace()}/edit`, {
                                bill: this.bill,
                                index: this.index
                            }).then(() => {
                                this.successSave('Conta atualizada com sucesso!');                               
                            });                           
                        } else {
                            store.dispatch(`${this.namespace()}/save`, this.bill).then(() => {
                                this.successSave('Conta criada com sucesso!');
                            });                            
                        }
                    }
                });
            },
            successSave(message){
                $(`#${this.modalOptions.id}`).modal('close');
                    Materialize.toast(message, 5000);
                    this.resetScope();
                },     
            resetScope(){
                this.bill.init();
            }
        }
	}