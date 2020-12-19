import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux';
import * as postActions from "../actions/postActions";
import CardView from './CardView';
import TeamLogos from '../components/TeamLogos';

import Grid from "@material-ui/core/Grid";

const TeamsView = ({ actions, teamsData }) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    actions.getAllTeams();
  }, []);

  useEffect(() => {
    console.log(teamsData, 'teamsData');
    setData(teamsData);
  }, [teamsData]);

  return (
<div>
      <Grid container spacing={1}>
        <Grid container item xs={12} spacing={3}>
        {data?.length > 0 && data.map((props, i) =>
          <TeamLogos key={i} image={props.image}
          teamName={props.name}
          teamId={props.id} />
        )}

     </Grid>
     </Grid>
     </div>
  );
};

const mapStateToProps = (props) => ({
  teamsData: props.postReducer.teams
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(postActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(TeamsView);
