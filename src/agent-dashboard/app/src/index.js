import App from './App';
import FiltersContextProvider from './contexts/FiltersContext';
import SettingsContextProvider from './contexts/SettingsContext';

import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store={ store }>
		<FiltersContextProvider>
			<SettingsContextProvider>
				<App />
			</SettingsContextProvider>
		</FiltersContextProvider>
	</Provider>,
	document.getElementById( 'helpdesk-agent-dashboard' )
);
