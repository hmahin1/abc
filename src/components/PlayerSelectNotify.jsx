import React from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogTitle from "@material-ui/core/DialogTitle";
import CardMedia from "@material-ui/core/CardMedia";
import Slide from "@material-ui/core/Slide";
import Grid from "@material-ui/core/Grid";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const getBackgroundColor = (teamName) => {
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

export default function AlertDialogSlide({
  notification,
  NotifySelectionClose,
  team,
  player,
}) {
  const useStyles = makeStyles((theme) => ({
    backDrop: {
      backdropFilter: "blur(3px)",
      backgroundColor: "rgba(0,0,30,0.4)",
    },
    img: {
      objectFit: "contain",
    },
    picks: {
      fontSize: "40",
      color: getBackgroundColor(team?.name),
    },
    paper: { borderRadius: 100 },
  }));
  const classes = useStyles();
  return (
    <div>
      <Dialog
        open={notification}
        TransitionComponent={Transition}
        keepMounted
        onClose={NotifySelectionClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
        BackdropProps={{
          classes: {
            root: classes.backDrop,
            paper: classes.paper,
          },
        }}
        classes={{
          paper: classes.paper,
        }}
      >
        <DialogTitle id="alert-dialog-slide-title">
          <Grid
            container
            direction="row"
            justify="space-around"
            alignItems="flex-start"
          >
            <Grid>
              <CardMedia
                component="img"
                height="250"
                className={classes.img}
                image={team?.image}
              />
            </Grid>
            <Grid>
              <Typography
                type="secondary"
                align="center"
                variant="h5"
                // style={{ display: "inline-block" }}
                inline
              >
                PICKS
              </Typography>
              <Typography
                type="secondary"
                variant="h3"
                // style={{ display: "inline-block" }}
                inline
                className={classes.picks}
              >
                {`${player}`}
              </Typography>
            </Grid>
          </Grid>
        </DialogTitle>
        {/* <DialogActions>
          <Button onClick={NotifySelectionClose} color="primary">
            OK
          </Button>
        </DialogActions> */}
      </Dialog>
    </div>
  );
}
