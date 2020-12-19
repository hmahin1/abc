import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as postActions from "../actions/postActions";
import CardView from './CardView';
import Grid from "@material-ui/core/Grid";

const CaptainsView = ({ actions, captainsData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    actions.getAllCaptains();
  }, []);

  useEffect(() => {
    console.log(captainsData, 'aaaa');
    setData(captainsData);
  }, [captainsData]);

  return (
<div>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
        {data?.length > 0 && data.map((props, i) =>
          <CardView key={i} {...props} />
        )}

     </Grid>
     </Grid>
     </div>
  );
};

const mapStateToProps = (props) => ({
  captainsData: props.postReducer.captains
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(postActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(CaptainsView);
