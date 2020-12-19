import { request } from '../http-helper';

export const getPlayers = () => {
	return (dispatch, getState) => {
		let { currentCategoryOfPlayers, categories } = getState().teamReducer;

		// console.log('Category and index', currentCategoryOfPlayers, categories);

		return request(
			`/players?type=${categories[currentCategoryOfPlayers]}`,
			'get',
			'',
			false
		)
			.then((res) => {
				const { data } = res;

				// console.log(data);
				dispatch({
					type: 'GET_PLAYERS_FOR_PARTICULAR_CATEGORY',
					payload: data,
				});
			})
			.catch((error) => console.log(error));
	};
};

export const ChangePlayerCategory = () => {
	return (dispatch, getState) => {
		let state = getState().teamReducer;
		let { currentCategoryOfPlayers, categories } = state;

		// console.log(categories[currentCategoryOfPlayers]);

		if (currentCategoryOfPlayers <= 3) {
			dispatch({
				type: 'CHANGE_PLAYER_CATEGORY',
				payload: ++currentCategoryOfPlayers,
			});
		}
	};
};

export const SelectPlayer = (team, player) => {
	return (dispatch, getState) => {
		let state = getState().teamReducer;
		// console.log(team.name, player);
		const obj = {
			player_id: player.id,
			team_id: team.id,
		};
		return request('/select-team', 'POST', obj)
			.then((res) => {
				// console.log(res, 'ressponsee');
				let { teams, currentCategoryRemainingPlayers } = state;

				currentCategoryRemainingPlayers.splice(
					currentCategoryRemainingPlayers.findIndex(
						(item) => item.id === player.id
					),
					1
				);
				teams[team.name].push(player);

				dispatch({
					type: 'PLAYER_SELECTED',
					payload: { teams, currentCategoryRemainingPlayers },
				});
			})
			.catch((error) => console.log(error));
	};
};
export const getSelectedTeam = (id) => {
	return (dispatch) => {
		return request(`/selected-team?team_id=${id}`, 'get', '', false)
			.then((res) => {
				const { data } = res;
				dispatch({ type: 'GET_SELECTED_TEAM', payload: data.team_selections });
			})
			.catch((error) => console.log(error));
	};
};

export const clearSelectedTeam = () => {
	return (dispatch) => {
		dispatch({type:'CLEAR_SELECTED_TEAM'});
	}
}