var request = require('superagent');

export function getRandomApi() {
	return request.get('http://api.randomuser.me/')
				  .set('Accept', 'application/json')
				  .end(function (err, response){
					  if (err) return console.error(err);
				
					  return response;
				   });
}