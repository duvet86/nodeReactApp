//import Promise from 'es6-promise';
import axios from 'axios';

function _setHeader(token) {
	return {
		headers: {'Authorization': 'Bearer ' + token }
	};
}

export default class {

	static login(email, password) {

		const request = new Promise((resolve, reject) => {

			const credentials = {
				email: email,
				password: password
			};

			axios.post('/api/login', credentials)
				.then(function (res) {
					localStorage.setItem('token', res.data.token);
					resolve({
						authenticated: true,
						token: res.data.token
					});
				})
				.catch(function (err) {
					reject(err.data);
				});
			
		});

		return request;
	}
	
	static getUserInfo(token) {
		
		const request = new Promise((resolve, reject) => {
		
			axios.get('/api/user', _setHeader(token))
				.then(function (res) {
					localStorage.setItem('userInfo', JSON.stringify(res.data.user));
					resolve(res.data.user);
				})	
				.catch(function (err) {
					reject(err.data);
				});
			
		});

		return request;
	}

	static validateToken(token) {
		
		const request = new Promise((resolve, reject) => {

			axios.get('/api/validateToken', _setHeader(token))
				.then(function (res) {
					localStorage.setItem('token', res.data.token);
					resolve({
						token: res.data.token,
						userInfo: JSON.parse(localStorage.getItem('userInfo'))
					});
				})
				.catch(function (err) {
					reject(err.data);
				});
			
		});

		return request;
	}

	static getToken() {
		return localStorage.token;
	}

	static logout() {
		delete localStorage.token;
		delete localStorage.userInfo;
		return "Logout";
	}

	static isLoggedIn() {
		return Boolean(localStorage.token);
	}
}