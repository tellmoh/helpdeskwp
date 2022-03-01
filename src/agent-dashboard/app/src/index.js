import App from './App';
import TicketContextProvider from './contexts/TicketContext';
import FiltersContextProvider from './contexts/FiltersContext';
import SettingsContextProvider from './contexts/SettingsContext';

ReactDOM.render(
	<TicketContextProvider>
		<FiltersContextProvider>
			<SettingsContextProvider>
				<App />
			</SettingsContextProvider>
		</FiltersContextProvider>
	</TicketContextProvider>,
	document.getElementById( 'helpdesk-agent-dashboard' )
);
