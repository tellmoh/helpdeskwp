import TopBar from "./TopBar";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0051af'
        }
    }
});

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`vertical-tabpanel-${index}`}
            aria-labelledby={`vertical-tab-${index}`}
            {...other}
        >
        {value === index && (
            <Box sx={{ p: 3 }}>
                {children}
            </Box>
        )}
        </div>
    );
  }

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    };
}

const Settings = () => {
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <ThemeProvider theme={theme}>
            <TopBar />
            <div className="helpdesk-main helpdesk-settings">
                <Box
                    sx={{ flexGrow: 1, bgcolor: 'background.paper', display: 'flex', border: '1px solid #dbe0f3', boxShadow: '0 0 20px -15px #344585', borderRadius: '7px' }}
                >
                    <Tabs
                        orientation="vertical"
                        value={value}
                        onChange={handleChange}
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Portal Page" {...a11yProps(0)} />
                        <Tab label="Category" {...a11yProps(1)} />
                        <Tab label="Type" {...a11yProps(2)} />
                        <Tab label="Priority" {...a11yProps(3)} />
                        <Tab label="Status" {...a11yProps(4)} />
                        <Tab label="Agent" {...a11yProps(5)} />
                    </Tabs>
                    <TabPanel value={value} index={0}>
                        Portal Page
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        Category
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        Type
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        Priority
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        Status
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        Agent
                    </TabPanel>
                </Box>
            </div>
        </ThemeProvider>
    )
}

export default Settings
