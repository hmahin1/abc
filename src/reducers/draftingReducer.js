const initState = {
	isLoading: false,
	pickupOrder: [],
	currentPickup: 1,
	round: 1,
	error: '',
};

const draftingReducer = (state = initState, { type, payload }) => {
	switch (type) {
		case 'REQUEST_DRAFTING':
			return {
				...state,
				isLoading: true,
			};
		case 'DRAFTING_SUCCESS':
			return {
				...state,
				data: payload,
				isLoading: false,
			};
		case 'NEXT_TURN':
			return {
				...state,
				...payload,
			};
		case 'REFRESH_PICKUP_ORDER':
			return {
				...state,
				pickupOrder: payload,
			};
		default:
			return state;
	}
};

export default draftingReducer;
