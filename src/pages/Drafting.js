import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/userActions';
import { makeStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';
import CardView from './CardView';
import CaptainsView from './CaptainsView';
import TeamsView from './TeamsView';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles({
	root: {
		padding: 20
	},
  btn: {
		background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
		border: 0,
		borderRadius: 3,
		boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
		color: 'white',
		height: 78,
		width: 240,
		padding: '0 30px',
    fontSize: 20,
    borderRadius: 30,
	},
});
const Drafting = ({ actions, isLoggedIn }) => {
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
      <div className={classes.root}>

			<CaptainsView />
      </div>
      <div className={classes.root}>
			<TeamsView />
      </div>
      <div className={classes.root}>
      <Link to='/player-selections'>
				<Button className={classes.btn}>Start Drafting</Button>
			</Link>
      </div>
</div>
	);
};

const mapStateToProps = (props) => ({
	isLoggedIn: props.userReducer.isLoggedIn,
});

const mapDispatchToProps = (dispatch) => ({
	actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(Drafting);
