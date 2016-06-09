import superagent from 'superagent';

export default class {

	static login(email, password) {
		
		const request = new Promise((resolve, reject) => {

			const credentials = {
				email: email,
				password: password
			};
		
			superagent.post('/api/login', credentials)
				.set('Accept', 'application/json')
				.then(function (res) {
					localStorage.setItem('token', res.body.token);
					resolve({
						authenticated: true,
						token: res.body.token
					});
				}, function (res) {
					reject(res);
				});
			
		});

		return request;
	}
	
	static getUserInfo(token) {
		
		const request = new Promise((resolve, reject) => {
		
			superagent.get('/api/user')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.then(function (res) {
					localStorage.setItem('userInfo', JSON.stringify(res.body.user));
					resolve(res.body.user);
				}, function (res) {
					reject(res);
				});
			
		});

		return request;
	}

	static validateToken(token) {
		
		const request = new Promise((resolve, reject) => {

			superagent.get('/api/validateToken')
				.set('Accept', 'application/json')
				.set('Authorization', 'Bearer ' + token)
				.then(function (res) {
					localStorage.setItem('token', res.body.token);
					resolve({
						token: res.body.token,
						userInfo: JSON.parse(localStorage.getItem('userInfo'))
					});
				}, function (res) {
					reject(res);
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
	}

	static isLoggedIn() {
		return Boolean(localStorage.token);
	}
}