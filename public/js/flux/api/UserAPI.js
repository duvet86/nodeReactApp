import superagent from 'superagent';

export default class {

	static login(email, password) {
		
		const request = new Promise((resolve, reject) => {
			
			if (localStorage.token) {
				resolve({
					authenticated: true,
					token: localStorage.token
				});
				return;
			}
			
			const credentials = {
				email: email,
				password: password
			};
		
			superagent.post('/api/login', credentials)
				.set('Accept', 'application/json')
				.then(function (res) {
					resolve({
						authenticated: true,
						token: res.data.token
					});
					return;
				});
			
		});

		return request;
	}

	static getToken() {
		return localStorage.token;
	}

	static logout() {
		delete localStorage.token;
	}

	static loggedIn() {
		return Boolean(localStorage.token);
	}
}