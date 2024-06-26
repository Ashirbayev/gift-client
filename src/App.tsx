import React from 'react';
import CampaignTable from './components/CampaignTable';
import { Provider } from 'react-redux';
import store from './redux/store';

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <div className="App">
                <h1>Gift Campaigns</h1>
                <CampaignTable />
            </div>
        </Provider>
    );
}

export default App;
