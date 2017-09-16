export class Jwt{
	static accessToken(email, password){
		return Vue.http.post('access_token', {
			email: email,
			password: password
		});
	}

	static logout(){
		return Vue.http.post('logout');
	}

	static refreshToken(){
		return Vue.http.post('refresh_token');
	}
}


let User = Vue.resource('user');
let Bank = Vue.resource('banks'); 
let BankAccount = Vue.resource('bank_accounts{/id}', {}, {
	lists: {method: 'GET', utl: 'bank_accounts/lists'}
}); // com o vue resource temos todas as operações put. delete update etc
let CategoryRevenue = Vue.resource('category_revenues{/id}');
let CategoryExpense = Vue.resource('category_expenses{/id}');
//contas a pagar
let BillPay = Vue.resource('bill_pays{/id}');
//contas a receber
let BillReceive = Vue.resource('bill-receives{/id}');

export {User, BankAccount, Bank, CategoryRevenue, CategoryExpense, BillPay, BillReceive};

