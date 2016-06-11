import keyMirror from 'keymirror';

export default keyMirror({
	
	LOADED: null,

	REQUEST_LOGIN: null,
	REQUEST_LOGIN_SUCCESS: null,
	REQUEST_LOGIN_ERROR: null,
    
    REQUEST_USER: null,
	REQUEST_USER_SUCCESS: null,
	REQUEST_USER_ERROR: null,

    REQUEST_VALIDATE_TOKEN: null,
	REQUEST_VALIDATE_TOKEN_SUCCESS: null,
	REQUEST_VALIDATE_TOKEN_ERROR: null,
	
	LOGOUT: null,
	
	CHANGE_TAB: null,
	
	FACEBOOK_INITIALIZED: null,
    FACEBOOK_GETTING_PICTURE: null,
    FACEBOOK_RECEIVED_PICTURE: null,
    FACEBOOK_LOGIN: null,
    FACEBOOK_LOGOUT: null,
    FACEBOOK_NOT_AUTHORIZED: null,
    FACEBOOK_LOGIN_ERROR: null,
    FACEBOOK_USER_INFO: null
});