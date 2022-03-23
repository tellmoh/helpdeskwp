import App from './App';
import FiltersContextProvider from './contexts/FiltersContext';

import { store } from './app/store';
import { Provider } from 'react-redux';

ReactDOM.render(
	<Provider store={ store }>
		<FiltersContextProvider>
			<App />
		</FiltersContextProvider>
	</Provider>,
	document.getElementById( 'helpdesk-agent-dashboard' )
);
