/* globals window, FB, document, APP_ID */

import { dispatch } from '../AppDispatcher';
import ActionTypes from '../constants/ActionTypes';

const FacebookActionsCreator = {

	initFacebook: () => {

		console.log('APP_ID', APP_ID);

		return new Promise((resolve, reject) => {

			window.fbAsyncInit = () => {
				FB.init({
					appId: APP_ID,
					cookie: true,  // enable cookies to allow the server to access the session
					xfbml: true,  // parse social plugins on this page
					version: 'v2.5' // use graph api version 2.5
				});

				// after initialization, get the login status
				dispatch(ActionTypes.FACEBOOK_INITIALIZED, {
					resolve: resolve
				});
			}

			(function (d, s, id) {
				var js, fjs = d.getElementsByTagName(s)[0];
				if (d.getElementById(id)) { return; }
				js = d.createElement(s); js.id = id;
				js.src = "//connect.facebook.net/en_US/sdk.js";
				fjs.parentNode.insertBefore(js, fjs);
			})(document, 'script', 'facebook-jssdk');

		});

	},

	login: () => {
		return new Promise((resolve, reject) => {
			window.FB.login((response) => {
				if (response.status === 'connected') {
					dispatch(ActionTypes.FACEBOOK_LOGIN, {
						data: response,
						resolve: resolve
					});
				} else if (response.status === 'not_authorized') {
					// The person is logged into Facebook, but not your app.
					dispatch(ActionTypes.FACEBOOK_NOT_AUTHORIZED, {
						data: response,
						resolve: resolve
					});
				} else {
					// The person is not logged into Facebook, so we're not sure if
					// they are logged into this app or not.
					dispatch(ActionTypes.FACEBOOK_LOGIN_ERROR, {
						data: response,
						resolve: resolve
					});
				}
			});
		});
	},

	logout: () => {
		return new Promise((resolve, reject) => {
			window.FB.logout((response) => {
				dispatch(ActionTypes.FACEBOOK_LOGOUT, {
					data: response,
					resolve: resolve
				});
			});
		});
	},

	getUserInfo: () => {
		return new Promise((resolve, reject) => {
			window.FB.api('/me', (response) => {
				console.log('UserInfo', response);
				dispatch(ActionTypes.FACEBOOK_USER_INFO, {
					data: response,
					resolve: resolve
				});
			});
		});
	},

	getFacebookProfilePicture: (userId) => {
		dispatch(ActionTypes.FACEBOOK_GETTING_PICTURE);

		window.FB.api(`/${userId}/picture?type=large`, (response) => {
			dispatch(ActionTypes.FACEBOOK_RECEIVED_PICTURE, { data: response });
		});
	}
};

export default FacebookActionsCreator;