export default class {

	static login(email, pass, cb) {
		
		var pretendRequest = new Promise(
				// The resolver function is called with the ability to resolve or
				// reject the promise
				(resolve, reject) => {

					if (localStorage.token) {
						resolve(true);
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
					}, Math.random() * 2000 + 1000)
				});

		return pretendRequest;
		
//		cb = arguments[arguments.length - 1];
//		if (localStorage.token) {
//			if (cb) {
//				cb(true);
//			}
//			this.onChange(true);
//			return;
//		}
//		
//		pretendRequest(email, pass, (res) => {
//			if (res.authenticated) {
//				localStorage.token = res.token;
//				if (cb) {
//					cb(true);
//				}
//				this.onChange(true);
//			} else {
//				if (cb) {
//					cb(false);
//				}
//				this.onChange(false);
//			}
//		})
	}

	static getToken() {
		return localStorage.token;
	}

	static logout(cb) {
		delete localStorage.token;
		if (cb) cb();
		//this.onChange(false);
	}

	static loggedIn() {
		return Boolean(localStorage.token);
	}

	//static onChange() {}
}

//function pretendRequest(email, pass, cb) {
//	setTimeout(() => {
//		if (email === 'joe@example.com' && pass === 'password1') {
//			cb({
//				authenticated: true,
//				token: Math.random().toString(36).substring(7)
//			})
//		} else {
//			cb({ authenticated: false })
//		}
//	}, 0)
//}