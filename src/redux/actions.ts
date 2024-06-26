import axios from 'axios';
import { ThunkAction } from 'redux-thunk';
import { AnyAction } from 'redux';
import { RootState } from './store';

const BASE_URL = 'http://localhost:5000';

export const fetchCampaigns = (): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    try {
        const response = await axios.get(`${BASE_URL}/api/campaigns`);
        dispatch({ type: 'FETCH_CAMPAIGNS', payload: response.data });
    } catch (error) {
        console.error('Error fetching campaigns:', error);
    }
};

export const createCampaign = (campaign: any): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    try {
        const response = await axios.post(`${BASE_URL}/api/campaigns`, campaign);
        dispatch({ type: 'CREATE_CAMPAIGN', payload: response.data });
        dispatch(fetchCampaigns());
    } catch (error) {
        console.error('Error creating campaign:', error);
    }
};

export const updateCampaign = (id: number, campaign: any): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    try {
        const response = await axios.put(`${BASE_URL}/api/campaigns/${id}`, campaign);
        dispatch({ type: 'UPDATE_CAMPAIGN', payload: response.data });
        dispatch(fetchCampaigns());
    } catch (error) {
        console.error('Error updating campaign:', error);
    }
};

export const deleteCampaign = (id: number): ThunkAction<void, RootState, unknown, AnyAction> => async (dispatch) => {
    try {
        await axios.delete(`${BASE_URL}/api/campaigns/${id}`);
        dispatch(fetchCampaigns());
    } catch (error) {
        console.error('Error deleting campaign:', error);
    }
};

