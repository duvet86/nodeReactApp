var request = require('superagent');

export function getUserInfo() {
	return request.get('http://jsonplaceholder.typicode.com/users')
		.set('Accept', 'application/json');
}