/*
	TO::DO 
	verificar se caso não tenha internet puchar as informações do localStorage;
*/

import store from '../store/store';
import appConfig from './appConfig';
import JwtToken from './jwt-token';


Vue.http.interceptors.push((request, next) =>{
	request.headers.set('Authorization', JwtToken.getAuthorizationHeader())
	next();
});


Vue.http.interceptors.push((request, next) => {
	next((request) => {
		if(request.status === 401){ // token expirado
			return JwtToken.refreshToken()
			.then(() => {
				return Vue.http(request);
			})
			.catch(() => {
				store.dispatch('auth/clearAuth');
				window.location.href = appConfig.login_url
			});
		}
	});
})
