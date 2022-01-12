import { SET_SELECTED_TAB } from '../actionTypes';

export const setSelectedTab = (tab) => {
	return { type: SET_SELECTED_TAB, tab };
};
