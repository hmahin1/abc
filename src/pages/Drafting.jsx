import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { connect, useSelector, useDispatch } from "react-redux";
import { bindActionCreators } from "redux";
import * as Actions from "../actions/userActions";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CardActionArea from "@material-ui/core/CardActionArea";
import Paper from "@material-ui/core/Paper";
import Drawer from "@material-ui/core/Drawer";
import CardMedia from "@material-ui/core/CardMedia";
import Card from "@material-ui/core/Card";
import Grid from "@material-ui/core/Grid";
import TeamLogos from "../components/TeamLogos.jsx";
import Slide from "@material-ui/core/Slide";
import CardContent from "@material-ui/core/CardContent";

import {
  getDraftingData,
  refreshPickupOrder,
  nextPickup,
} from "../actions/draftingActions";
import {
  getPlayers,
  ChangePlayerCategory,
  SelectPlayer,
} from "../actions/teamActions";
import ReactStopwatch from "react-stopwatch";
import { Typography } from "@material-ui/core";
import AlertDialogSlide from "../components/PlayerSelectNotify";
// import { Button, Drawer } from 'antd';

const img = {
  keeper:
    "https://res.cloudinary.com/npl-2021/image/upload/v1606753896/wk_xrtwfy.jpg",
  batsman:
    "https://res.cloudinary.com/npl-2021/image/upload/v1606754791/cricket-batsman-vector-png11_xxvy41.png",
  allrounder:
    "https://res.cloudinary.com/npl-2021/image/upload/v1606754710/Untitled-1_zzjjhs.jpg",
  bowler:
    "https://res.cloudinary.com/npl-2021/image/upload/v1606754828/55407902-cricket-player-vector-silhouette_kjiwdh.jpg",
};
const useStyles = makeStyles((theme) => ({
  rootContent: {
    textAlign: "center",
  },
  btn: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 60,
    width: 150,
    padding: "0 30px",
    fontSize: 15,
    borderRadius: 30,
    marginTop: 30,
  },
  mainDiv: {
    //     backgroundColor: "blue",
    backgroundImage: `url(${require("../style/images/bg-org.jpg")})`,
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPositionY: "-7em",
    padding: 10,
  },
  img: {
    objectFit: "contain",
  },
  float: {
    float: "right",
    padding: 10,
  },
  catgeoryName: {
    padding: 1,
    width: 300,
    backgroundColor: "#fafafab8",
    textAlign: "center",
  },
  bold: {
    fontSize: 18,
  },
  font: {
    fontSize: 25,
  },
  bg: {
    background: "white",
    padding: 10,
  },
  paper: {
    textAlign: "center",
    backgroundColor: "black",
    border: "3px solid #fff",
    display: "flex",
    // flexWrap: 'wrap',
    "& > *": {
      margin: "0.5em",
      width: theme.spacing(16),
      // height: '4em',
    },
  },

  timer: {
    fontFamily: "DIGITALDREAM",
    fontSize: "xx-large",
    // color:'#32CD32', GREEN
    color: "white",
  },
  timeOver: {
    fontFamily: "DIGITALDREAM",
    fontSize: "large",
    // color:'#32CD32', GREEN
    color: "white",
  },
  timerGrid: {
    paddingBottom: "1.5em",
  },
}));

const PlayerSelection = ({ actions, isLoggedIn, draftingReducer }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(refreshPickupOrder());
    dispatch(getPlayers());
  }, []);

  const initialData = {
    drawerVisibility: false,
    timerVisibility: true,
    currentSelectedPlayer: "",
    currentTeam: "",
  };

  const BootstrapButton = withStyles({
    root: {
      boxShadow: "none",
      textTransform: "none",
      fontSize: 16,
      padding: "6px 12px",
      border: "1px solid",
      lineHeight: 1.5,
      backgroundColor: "#0063cc",
      borderColor: "#0063cc",
      fontFamily: [
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
      "&:hover": {
        backgroundColor: "#0069d9",
        borderColor: "#0062cc",
        boxShadow: "none",
      },
      "&:active": {
        boxShadow: "none",
        backgroundColor: "#0062cc",
        borderColor: "#005cbf",
      },
      "&:focus": {
        boxShadow: "0 0 0 0.2rem rgba(0,123,255,.5)",
      },
    },
  })(Button);

  const [state, setState] = useState(initialData);
  const history = useHistory();

  const showDrawer = () => {
    setState({
      ...state,
      drawerVisibility: true,
    });
  };

  const onDrawerClose = () => {
    setState({
      ...state,
      drawerVisibility: false,
      timerVisibility: true,
    });
  };

  const onClose = async () => {
    if (teamsData.currentCategoryRemainingPlayers.length === 1) {
      await dispatch(ChangePlayerCategory());
      await dispatch(getPlayers());
    }
    if (draftingData.currentPickup === 6) {
      await dispatch(refreshPickupOrder());
    }
    if (
      draftingData.round == 12 &&
      teamsData.currentCategoryRemainingPlayers.length === 0
    ) {
      history.push("/drafting");
    }
  };

  const selectPlayer = async (player) => {
    let team = await draftingData.pickupOrder[
      parseInt(draftingData.currentPickup) - 1
    ];
    dispatch(
      SelectPlayer(
        // draftingData.pickupOrder[parseInt(draftingData.currentPickup) - 1],
        team,
        player
      )
    );
  };

  const classes = useStyles();

  let draftingData = useSelector((state) => state.draftingReducer);
  let teamsData = useSelector((state) => state.teamReducer);

  const [playerName, changePlayerName] = useState("");

  const [notification, handleNotification] = useState(false);

  const notifySelectionOpen = (player) => {
    changePlayerName(player);
    handleNotification(true);
  };

  const NotifySelectionClose = () => {
    handleNotification(false);
  };

  const handleSelect = () => {
    dispatch(nextPickup());
    onClose();
  };

  return (
    <>
      <div>
        <div className={classes.root2}>
          <Grid container spacing={1}>
            <Grid container item xs={12} spacing={3}>
              {draftingData.pickupOrder.map((team) => (
                <TeamLogos
                  image={team.image}
                  teamName={team.name}
                  teamPlayers={teamsData.teams[team.name]}
                  teamId={team.id}
                />
              ))}
            </Grid>
          </Grid>
        </div>
        <div>
          <Button onClick={showDrawer} className={classes.btn}>
            {" "}
            Next Pick
          </Button>

          {/*  <BootstrapButton
            variant="contained"
            color="secondary"
            style={{ marginTop: "2em" }}
            onClick={showDrawer}
            size="large"
          >
            Next Pick
          </BootstrapButton> */}
        </div>

        <Drawer
          anchor="bottom"
          open={state.drawerVisibility}
          onClose={onDrawerClose}
          transition={Slide}
        >
          <div className={classes.mainDiv}>
            <Grid container spacing={1}>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={4}>
                  <Grid
                    container
                    direction="row"
                    justify="space-around"
                    alignItems="flex-start"
                    className={classes.timerGrid}
                  >
                    {state.timerVisibility ? (
                      <ReactStopwatch
                        seconds={0}
                        minutes={0}
                        hours={0}
                        limit="00:00:20"
                        onCallback={() =>
                          setState({ ...state, timerVisibility: false })
                        }
                        render={({ formatted, hours, minutes, seconds }) => {
                          return (
                            <div>
                              <Paper elevation={3} className={classes.paper}>
                                <Typography
                                  type="secondary"
                                  variant="h5"
                                  className={classes.timer}
                                >
                                  {20 - parseInt(seconds) >= 10
                                    ? `00:${20 - parseInt(seconds)}`
                                    : `00:0${20 - parseInt(seconds)}`}
                                </Typography>
                              </Paper>
                            </div>
                          );
                        }}
                      />
                    ) : (
                      <div>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography
                            type="secondary"
                            variant="h6"
                            className={classes.timeOver}
                          >
                            TIME OVER
                          </Typography>
                        </Paper>
                      </div>
                    )}
                  </Grid>
                  {/* <CardMedia
                    component="img"
                    alt={
                      draftingData.pickupOrder[
                        parseInt(draftingData.currentPickup) - 1
                      ]?.name
                    }
                    height="140"
                    className={classes.img}
                    image={
                      img[
                        teamsData.categories[teamsData.currentCategoryOfPlayers]
                      ]
                    }
                    title={
                      draftingData.pickupOrder[
                        parseInt(draftingData.currentPickup) - 1
                      ]?.name
                    }
                  />
                  <CardContent className={classes.rootContent}>
                    <Typography gutterBottom variant="h5" component="h2">
                      {teamsData.categories[teamsData.currentCategoryOfPlayers]}
                    </Typography>
                  </CardContent> */}
                </Grid>
                <Grid item xs={4}>
                  <CardMedia
                    component="img"
                    alt={
                      draftingData.pickupOrder[
                        parseInt(draftingData.currentPickup) - 1
                      ]?.name
                    }
                    height="180"
                    className={classes.img}
                    image={
                      draftingData.pickupOrder[
                        parseInt(draftingData.currentPickup) - 1
                      ]?.image
                    }
                    title={
                      draftingData.pickupOrder[
                        parseInt(draftingData.currentPickup) - 1
                      ]?.name
                    }
                  />
                </Grid>
                <Grid item xs={4}>
                  {/* 		<h5>  Round Number : {draftingData.round}</h5> */}
                  <Paper className={classes.float} elevation={2}>
                    <Typography type="secondary" variant="h6" gutterBottom>
                      Turn Number : {draftingData.currentPickup}
                    </Typography>
                    <Typography type="secondary" variant="h6" gutterBottom>
                      Round Number : {draftingData.round}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>
            </Grid>
            <Grid
              container
              direction="row"
              justify="space-around"
              alignItems="flex-start"
              className={classes.timerGrid}
            >
              {/*  {state.timerVisibility ? (
                <ReactStopwatch
                  seconds={0}
                  minutes={0}
                  hours={0}
                  limit="00:00:20"
                  onCallback={() =>
                    setState({ ...state, timerVisibility: false })
                  }
                  render={({ formatted, hours, minutes, seconds }) => {
                    return (
                      <div>
                        <Paper elevation={3} className={classes.paper}>
                          <Typography
                            type="secondary"
                            variant="h5"
                            className={classes.timer}
                          >
                            {20 - parseInt(seconds) >= 10
                              ? `00:${20 - parseInt(seconds)}`
                              : `00:0${20 - parseInt(seconds)}`}
                          </Typography>
                        </Paper>
                      </div>
                    );
                  }}
                />
              ) : (
                <div>
                  <Paper elevation={3} className={classes.paper}>
                    <Typography
                      type="secondary"
                      variant="h6"
                      className={classes.timeOver}
                    >
                       {teamsData.categories[teamsData.currentCategoryOfPlayers]}
                    </Typography>
                  </Paper>
                </div>
              )} */}
              <div>
                <Paper className={classes.catgeoryName} elevation={4}>
                  <p>
                    <b className={classes.font}>
                      {teamsData.categories[
                        teamsData.currentCategoryOfPlayers
                      ].toUpperCase()}
                    </b>
                  </p>
                </Paper>
              </div>
            </Grid>
            <Grid
              container
              className={classes.bg}
              container
              direction="row"
              justify="space-around"
              alignItems="flex-start"
            >
              {teamsData?.currentCategoryRemainingPlayers?.map((item) => (
                <Grid item xs={2}>
                  <Button
                    onClick={() => {
                      notifySelectionOpen(item);
                      onDrawerClose();
                    }}
                  >
                    <b className={classes.bold}>{item.name}</b>
                  </Button>
                </Grid>
              ))}
            </Grid>
          </div>
        </Drawer>
        <AlertDialogSlide
          notification={notification}
          NotifySelectionClose={() => {
            NotifySelectionClose();
            selectPlayer(playerName);
            handleSelect();
          }}
          player={playerName.name}
          team={
            draftingData.pickupOrder[parseInt(draftingData.currentPickup) - 1]
          }
        />
      </div>
    </>
  );
};

const mapStateToProps = (props) => ({
  isLoggedIn: props.userReducer.isLoggedIn,
  drafting: props.draftingReducer,
  teams: props.teamReducer,
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(Actions, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(PlayerSelection);
