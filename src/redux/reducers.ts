import { combineReducers } from 'redux';

interface Campaign {
    id: number;
    name: string;
    date: string;
    sentGifts: number;
}

const campaignsReducer = (state: Campaign[] = [], action: any) => {
    switch (action.type) {
        case 'FETCH_CAMPAIGNS':
            return action.payload;
        case 'CREATE_CAMPAIGN':
            return [...state, action.payload];
        case 'UPDATE_CAMPAIGN':
            return state.map(campaign => campaign.id === action.payload.id ? action.payload : campaign);
        default:
            return state;
    }
};

const rootReducer = combineReducers({
    campaigns: campaignsReducer,
});

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
