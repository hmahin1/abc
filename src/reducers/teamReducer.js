const initState = {
	currentCategoryOfPlayers: 0,
	teams: {
		'Shan-e-Nawait': [],
		'Nawait Sultan': [],
		'Nawait Janbaz': [],
		'Nawait Royals': [],
		'Nawait United': [],
		'Nawait Aces': [],
	},
	selectedTeam: [],
	currentCategoryRemainingPlayers: [],
	categories: ['keeper', 'allrounder', 'bowler', 'batsman', 'emerging'],
	error: '',
};

const teamReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case 'GET_PLAYERS_FOR_PARTICULAR_CATEGORY':
			return {
				...state,
				currentCategoryRemainingPlayers: payload,
			};
		case 'PLAYER_SELECTED':
			return {
				...state,
				teams: payload.teams,
				currentCategoryRemainingPlayers:
					payload.currentCategoryRemainingPlayer.length === 0
						? state.currentCategoryRemainingPlayers
						: payload.currentCategoryRemainingPlayer,
			};
		case 'CHANGE_PLAYER_CATEGORY':
			return {
				...state,
				currentCategoryOfPlayers: payload,
			};
		case 'GET_SELECTED_TEAM':
			return {
				...state,
				selectedTeam: payload,
			};
		case 'CLEAR_SELECTED_TEAM':
			return {
				...state,
				selectedTeam:[]
			}
		default:
			return state;
	}
};

export default teamReducer;
