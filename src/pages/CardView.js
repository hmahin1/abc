import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as Actions from '../actions/userActions';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
	root: {
		maxWidth: 250,
		background: 'transparent',
		border: 'none',
	},
	img: {
		objectFit: 'contain',
	},
	CardActionArea: {
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
			backgroundColor: 'transparent',
		},
	},
});

const Logo = withStyles({
	root: {
		maxWidth: 250,
		background: 'transparent',
		border: 'none',
		'&:hover': {
			boxShadow: 'none',
		},
		'&:active': {
			boxShadow: 'none',
			},
		'&:focus': {
			boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
		},
	},
})(Card);
const CardView = ({ image, name, onclick }) => {
	const classes = useStyles();
	return (
		<Grid item xs={2}>
			<Logo onClick={onclick}>
				<CardActionArea className={classes.CardActionArea}>
					<CardMedia
						component='img'
						alt={name}
						height='140'
						className={classes.img}
						image={image}
						title={name}
					/>
				</CardActionArea>
			</Logo>
		</Grid>
	);
};

export default CardView;