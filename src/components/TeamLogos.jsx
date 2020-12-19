import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import CardView from "../pages/CardView";
import PlayersTable from "./playersTable";
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/teamActions";
import { getSelectedTeam, clearSelectedTeam } from "../actions/teamActions";
import Grid from "@material-ui/core/Grid";
import CardMedia from "@material-ui/core/CardMedia";

const TeamLogos = ({ image, teamName, teams, teamId }) => {
  const getFontColor = () => {
    switch (teamName) {/* 
      case "Nawait Royals":
        return "red";
      case "Shan-e-Nawait":
        return "#6E122E";
      case "Nawait Sultan":
        return "white";
      case "Nawait Janbaz":
        return "white"; */
      case "Nawait United":
        return "black";
      default:
        return "white";
    } 
  };
  const getBackgroundColor = () => {
    switch (teamName) {
      case "Nawait Royals":
        return "#03032b";
      case "Shan-e-Nawait":
        return "#9a8938";
      case "Nawait Sultan":
        return "#fa7d00";
      case "Nawait Janbaz":
        return "#90680a";
      case "Nawait United":
        return "#8c8191";
      default:
        return "#7b1420";
    }
  };
  const useStyles = makeStyles((theme) => ({
    modal: {
      alignItems: "center",
      justifyContent: "center",
      textAlign: "center",
    },
    paper: {
      //   backgroundColor:
      //     teamName === "Nawait Royals"
      //       ? "yellow"
      //       : theme.palette.background.paper,
      backgroundColor: getBackgroundColor(),
      //   backgroundImage:
      //     teamName === "Nawait Royals"
      //       ? `url(${require("../style/images/royals.jpg")})`
      //       : null,
      color: getFontColor(),
      border: "2px solid #000",
      boxShadow: theme.shadows[5],
      width: "80%",
      height: "35em",
      margin: "auto",
      marginTop: 100,
    },
    img: {
      objectFit: "contain",
    },
    bold: {
      fontSize: 25,
    },
  }));
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    dispatch(getSelectedTeam(teamId));
    setOpen(true);
  };
  let teamsData = useSelector((state) => state.teamReducer);

  const handleClose = () => {
    setOpen(false);
    dispatch(clearSelectedTeam());
  };
  console.log(teamsData, "teamId", teams);

  return (
    <React.Fragment>
      <CardView image={image} onclick={handleOpen} />
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paper}>
            <Grid container item xs={12} spacing={6}>
              <Grid item xs={6}>
                <CardMedia
                  component="img"
                  alt={teamName}
                  height="140"
                  className={classes.img}
                  image={image}
                  title={teamName}
                />
              </Grid>
              <Grid item xs={6}>
                <h2 id="transition-modal-title">{teamName}</h2>
              </Grid>
            </Grid>
            {/* <PlayersTable rows /> */}
            <Grid container item xs={12} spacing={3}>
              {teamsData?.selectedTeam?.map((team) => (
                <Grid className={classes.bold} item xs={3}>
                  <p><b>{team.player.name} {team.player.captain ? '(C)' : ''} </b></p>
                </Grid>
              ))}
            </Grid>
          </div>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

const mapStateToProps = (props) => ({
  teams: props.teamReducer.selectedTeam,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamLogos);
