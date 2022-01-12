import { SET_SELECTED_TAB } from '../actionTypes';

const initState = {
	loading: false,
	error: null,
	selectedTab: 0,
};

const userReducer = (state = initState, action) => {
	switch (action.type) {
		case SET_SELECTED_TAB: {
			return {
				...state,
				selectedTab: action.tab,
			};
		}

		default:
			return state;
	}
};

export default userReducer;
