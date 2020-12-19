import { request } from '../http-helper';

export const refreshPickupOrder = () => {
	return (dispatch, getState) => {
		let { round } = getState().draftingReducer;

		return request(`/selected-pick?round_number=${round}`, 'get', '', false)
			.then((res) => {
				const { data } = res;

				let teams = data?.map((item) => item.team);
				console.log(teams);
				dispatch({ type: 'REFRESH_PICKUP_ORDER', payload: teams });
			})
			.catch((error) => console.log(error));
	};
};

export const nextPickup = () => {
	return (dispatch, getState) => {
		let state = getState().draftingReducer;
		let { currentPickup, round } = state;

		if (currentPickup % 6 === 0) {
			round += 1;
			currentPickup = 1;
		} else {
			currentPickup = currentPickup + 1;
		}
		dispatch({ type: 'NEXT_TURN', payload: { currentPickup, round } });
	};
};
