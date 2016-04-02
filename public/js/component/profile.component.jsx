import React, { PropTypes } from 'react';

const Profile = (props) => <h1>Profile {props.params.id}</h1>;

Profile.propTypes = { 
	params: PropTypes.shape({
		id: PropTypes.string
	})
};

export default Profile;