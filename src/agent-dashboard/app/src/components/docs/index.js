import { __ } from '@wordpress/i18n';
import { useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Documentation from './Documentation';
import Categories from './Categories';
import Tags from './Tags';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme( {
	palette: {
		primary: {
			main: '#0051af',
		},
	},
} );

function TabPanel( props ) {
	const { children, value, index, ...other } = props;

	return (
		<div
			role="tabpanel"
			hidden={ value !== index }
			id={ `vertical-tabpanel-${ index }` }
			aria-labelledby={ `vertical-tab-${ index }` }
			{ ...other }
		>
			{ value === index && <Box sx={ { p: 3 } }>{ children }</Box> }
		</div>
	);
}

function a11yProps( index ) {
	return {
		id: `vertical-tab-${ index }`,
		'aria-controls': `vertical-tabpanel-${ index }`,
	};
}

const Docs = () => {
	const [ value, setValue ] = useState( 0 );

	const handleChange = ( event, newValue ) => {
		setValue( newValue );
	};

	return (
		<ThemeProvider theme={ theme }>
			<div className="helpdesk-main helpdesk-settings helpdesk-docs">
				<Box
					sx={ {
						flexGrow: 1,
						bgcolor: 'background.paper',
						display: 'flex',
						border: '1px solid #dbe0f3',
						boxShadow: '0 0 20px -15px #344585',
						borderRadius: '7px',
					} }
				>
					<Tabs
						orientation="vertical"
						value={ value }
						onChange={ handleChange }
						sx={ { borderRight: 1, borderColor: 'divider' } }
					>
						<Tab
							label={ __( 'Docs', 'helpdeskwp' ) }
							{ ...a11yProps( 0 ) }
						/>
						<Tab
							label={ __( 'Categories', 'helpdeskwp' ) }
							{ ...a11yProps( 1 ) }
						/>
						<Tab
							label={ __( 'Tags', 'helpdeskwp' ) }
							{ ...a11yProps( 2 ) }
						/>
					</Tabs>
					<TabPanel value={ value } index={ 0 }>
						<Documentation />
					</TabPanel>
					<TabPanel value={ value } index={ 1 }>
						<Categories />
					</TabPanel>
					<TabPanel value={ value } index={ 2 }>
						<Tags />
					</TabPanel>
				</Box>
			</div>
		</ThemeProvider>
	);
};

export default Docs;
