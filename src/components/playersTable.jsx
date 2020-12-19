// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import Modal from '@material-ui/core/Modal';
// import Button from '@material-ui/core/Button';
// import Backdrop from '@material-ui/core/Backdrop';
// import Fade from '@material-ui/core/Fade';
// import CardView from '../pages/CardView';
// import DataGrid from '@material-ui/data-grid';

// const useStyles = makeStyles((theme) => ({
// 	modal: {
// 		alignItems: 'center',
// 		justifyContent: 'center',
// 		textAlign: 'center',
// 	},
// 	paper: {
// 		backgroundColor: theme.palette.background.paper,
// 		border: '2px solid #000',
// 		boxShadow: theme.shadows[5],
// 		width: '80%',
// 		margin: 'auto',
// 		marginTop: '15em',
// 	},
// }));

// export default function PlayersTable({ image, rows }) {
// 	const classes = useStyles();
// 	const [open, setOpen] = React.useState(false);

// 	const columns = [
// 		{ field: 'name', headerName: 'Player Name', width: '70%' },
// 		{ field: 'firstName', headerName: 'First name', width: 130 },
// 	];

// 	const handleOpen = () => {
// 		setOpen(true);
// 	};

// 	const handleClose = () => {
// 		setOpen(false);
// 	};

// 	return (
// 		<React.Fragment>
// 			<CardView image={image} onclick={handleOpen} />
// 			<Modal
// 				aria-labelledby='transition-modal-title'
// 				aria-describedby='transition-modal-description'
// 				className={classes.modal}
// 				open={open}
// 				onClose={handleClose}
// 				closeAfterTransition
// 				BackdropComponent={Backdrop}
// 				BackdropProps={{
// 					timeout: 500,
// 				}}
// 			>
// 				<Fade in={open}>
// 					<div className={classes.paper}>
// 						<DataGrid
// 							rows={rows}
// 							columns={columns}
// 							pageSize={5}
// 							checkboxSelection
// 						/>
// 					</div>
// 				</Fade>
// 			</Modal>
// 		</React.Fragment>
// 	);
// }
