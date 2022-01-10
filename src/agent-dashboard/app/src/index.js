import App from './App';
import TicketContextProvider from './contexts/TicketContext';
import FiltersContextProvider from './contexts/FiltersContext';

ReactDOM.render(
	<TicketContextProvider>
		<FiltersContextProvider>
			<App />
		</FiltersContextProvider>
	</TicketContextProvider>,
	document.getElementById( 'helpdesk-agent-dashboard' )
);
