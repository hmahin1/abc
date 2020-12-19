import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/userActions';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import logo from '../style/images/logo.png'; // with import
const useStyles = makeStyles({
	root: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 78,
		width: 180,
		padding: '0 30px',
    fontSize: 20,
    borderRadius: 30,
	},
	whiteColor: {
		color: 'white',
		fontSize: 80,
		padding: 50,
		justifyContent: 'center',
		textTransform: 'uppercase',
		fontFamily: 'sans-serif',
	},
	logo: {
		width: 180,
		height: 100,
	},
});
const Home = ({ actions, isLoggedIn }) => {
	const formData = {
		email: '',
		password: '',
	};

	const [state, setState] = useState(formData);
	const history = useHistory();

	useEffect(() => {
		if (isLoggedIn) {
			history.push('/');
		}
	});

	const handleChange = (event) => {
		const { name, value } = event.target;
		setState({ ...state, [name]: value });
	};

	const hanldeSubmit = () => {
		actions.loginUser(state, history);
	};
	const classes = useStyles();
	return (
		<div>
			<h5 className={classes.whiteColor}>
				Welcome to Npl 2021 drafting ceremony
			</h5>
			<Link to='/drafting'>
				<Button className={classes.root}>Start</Button>
			</Link>
			;
		</div>
	);
};

const mapStateToProps = (props) => ({
	isLoggedIn: props.userReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Home);
