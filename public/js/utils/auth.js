/* globals localStorage */

export default class {

	static login(email, pass, cb) {
		
		var pretendRequest = new Promise(
				(resolve, reject) => {

					if (localStorage.token) {
						resolve({
							authenticated: true,
							token: localStorage.token
						});
						return;
					}

					setTimeout(() => {
						if (email === 'joe@example.com' && pass === 'password1') {
							localStorage.token = Math.random().toString(36).substring(7);
							resolve({
								authenticated: true,
								token: localStorage.token
							});
							return;
						} else {
							resolve({ authenticated: false });
							return;
						}
					}, Math.random() * 2000 + 1000);
				});

		return pretendRequest;
	}

	static getToken() {
		return localStorage.token;
	}

	static logout(cb) {
		delete localStorage.token;
		if (cb) {
			cb();
		}
	}

	static loggedIn() {
		return Boolean(localStorage.token);
	}
}