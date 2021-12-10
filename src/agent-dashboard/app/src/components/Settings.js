import { useState, useEffect, useContext } from 'react';
import TopBar from "./TopBar";
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Select from 'react-select';
import axios from 'axios';
import toast from 'react-hot-toast';
import { FiltersContext } from '../contexts/FiltersContext';
import { Toaster } from 'react-hot-toast';
import { ThemeProvider, createTheme } from '@mui/material/styles';

const theme = createTheme({
    palette: {
        primary: {
            main: '#0051af'
        }
    }
})

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
    )
  }

function a11yProps(index) {
    return {
        id: `vertical-tab-${index}`,
        'aria-controls': `vertical-tabpanel-${index}`,
    }
}

const Settings = () => {
    const [pages, setPages] = useState(null)
    const [setting, setSetting] = useState(null)
    const [value, setValue] = useState(0);
    const [categoryTerm, setCategory] = useState('');
    const [typeTerm, setType] = useState('');
    const [priorityTerm, setPriority] = useState('');
    const [statusTerm, setStatus] = useState('');
    const [agentTerm, setAgent] = useState('');

    const {
        category,
        type,
        agents,
        status,
        priority,
        takeCategory,
        takeType,
        takeAgents,
        takeStatus,
        takePriority,
        deleteTerms
    } = useContext(FiltersContext)

    let config = {
        headers: {
            'X-WP-Nonce': helpdesk_agent_dashboard.nonce,
            'Content-Type': 'application/json',
        }
    }

    useEffect(() => {
        takePages();
    }, [])

    useEffect(() => {
        takeSettings();
    }, [])

    const takePages = async () => {
        const pages = await fetchPages();
        setPages(pages);
    }

    const fetchPages = async () => {
        const url = `${helpdesk_agent_dashboard.url}wp/v2/pages/?per_page=100`

        let data
        await axios.get(url)
            .then( (res) => {
                data = res.data
            })

        return data
    }

    const takeSettings = async () => {
        const settings = await fetchSettings();
        setSetting(settings);
    }

    const fetchSettings = async () => {
        const url = `${helpdesk_agent_dashboard.url}helpdesk/v1/settings`

        let data
        await axios.get(url, config)
            .then( (res) => {
                data = res.data
            })

        return data
    }

    const handleSave = async () => {
        const data = {
            type: 'saveSettings',
            pageID: setting.value,
            pageName: setting.label
        }

        await axios.post(`${helpdesk_agent_dashboard.url}helpdesk/v1/settings`, JSON.stringify(data), config)
        .then(function () {
            toast('Saved.', {
                duration: 2000,
                style: {
                    marginTop: 50
                },
            })
        })
        .catch(function (err) {
            toast('Couldn\'t save.', {
                duration: 2000,
                icon: '❌',
                style: {
                    marginTop: 50
                },
            })
            console.log(err)
        })
    }

    const handleChange = (event, newValue) => {
        setValue(newValue);
    }

    const addNewTerm = async (taxonomy, name) => {
        const data = {
            type: 'addTerm',
            taxonomy: taxonomy,
            termName: name
        }

        await axios.post(`${helpdesk_agent_dashboard.url}helpdesk/v1/settings`, JSON.stringify(data), config)
        .then(function () {
            toast('Added.', {
                duration: 2000,
                style: {
                    marginTop: 50
                },
            })
        })
        .catch(function (err) {
            toast('Couldn\'t add.', {
                duration: 2000,
                icon: '❌',
                style: {
                    marginTop: 50
                },
            })
            console.log(err)
        })
    }

    const addNewCategory = async () => {
        await addNewTerm( 'ticket_category', categoryTerm )
        setCategory('')
        takeCategory()
    }

    const addNewType = async () => {
        await addNewTerm( 'ticket_type', typeTerm )
        setType('')
        takeType()
    }

    const addNewPriority = async () => {
        await addNewTerm( 'ticket_priority', priorityTerm )
        setPriority('')
        takePriority()
    }

    const addNewStatus = async () => {
        await addNewTerm( 'ticket_status', statusTerm )
        setStatus('')
        takeStatus()
    }

    const addNewAgent = async () => {
        await addNewTerm( 'ticket_agent', agentTerm )
        setAgent('')
        takeAgents()
    }

    const deleteCategory = async (id, taxonomy) => {
        await deleteTerms(id, taxonomy)
        takeCategory()
    }

    const deleteType = async (id, taxonomy) => {
        await deleteTerms(id, taxonomy)
        takeType()
    }

    const deletePriority = async (id, taxonomy) => {
        await deleteTerms(id, taxonomy)
        takePriority()
    }

    const deleteStatus = async (id, taxonomy) => {
        await deleteTerms(id, taxonomy)
        takeStatus()
    }

    const deleteAgent = async (id, taxonomy) => {
        await deleteTerms(id, taxonomy)
        takeAgents()
    }

    const onPageChange = (page) => {
        setSetting(page)
    }

    let pagesList = []
    pages && pages.map((page) => {
        pagesList.push({ value: page.id, label: page.title.rendered })
    })

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
                        <p style={{ margin: '5px 0'}}>Select the support portal page</p>
                        <div style={{ marginBottom: '10px' }}>
                            <small>This page will set as the support portal page</small>
                        </div>
                        {setting &&
                            <Select
                                options={pagesList}
                                onChange={onPageChange}
                                defaultValue={{ value: setting.pageID, label: setting.pageName }}
                            />
                        }
                        <div style={{ marginTop: '16px' }}>
                            <Button variant="contained" onClick={handleSave}>Save</Button>
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={1}>
                        <input type="text" placeholder="Category" value={categoryTerm} onChange={(e) => setCategory(e.target.value)} />
                        <Button variant="contained" className="add-new-btn" onClick={addNewCategory}>Add</Button>
                        <div className="helpdesk-terms-list">
                            {category && category.map((category) => {
                                return(
                                    <div key={category.id} className="helpdesk-term">
                                        <span>{category.name}</span>
                                        <div className="helpdesk-delete-term">
                                            <Button onClick={() => deleteCategory(category.id, 'ticket_category')}>
                                                <svg width="20" fill="#bfbdbd" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={2}>
                        <input type="text" placeholder="Type" value={typeTerm} onChange={(e) => setType(e.target.value)} />
                        <Button variant="contained" className="add-new-btn" onClick={addNewType}>Add</Button>
                        <div className="helpdesk-terms-list">
                            {type && type.map((type) => {
                                return(
                                    <div key={type.id} className="helpdesk-term">
                                        <span>{type.name}</span>
                                        <div className="helpdesk-delete-term">
                                            <Button onClick={() => deleteType(type.id, 'ticket_type')}>
                                                <svg width="20" fill="#bfbdbd" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={3}>
                        <input type="text" placeholder="Priority" value={priorityTerm} onChange={(e) => setPriority(e.target.value)} />
                        <Button variant="contained" className="add-new-btn" onClick={addNewPriority}>Add</Button>
                        <div className="helpdesk-terms-list">
                            {priority && priority.map((priority) => {
                                return(
                                    <div key={priority.id} className="helpdesk-term">
                                        <span>{priority.name}</span>
                                        <div className="helpdesk-delete-term">
                                            <Button onClick={() => deletePriority(priority.id, 'ticket_priority')}>
                                                <svg width="20" fill="#bfbdbd" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={4}>
                        <input type="text" placeholder="Status" value={statusTerm} onChange={(e) => setStatus(e.target.value)} />
                        <Button variant="contained" className="add-new-btn" onClick={addNewStatus}>Add</Button>
                        <div className="helpdesk-terms-list">
                            {status && status.map((status) => {
                                return(
                                    <div key={status.id} className="helpdesk-term">
                                        <span>{status.name}</span>
                                        <div className="helpdesk-delete-term">
                                            <Button onClick={() => deleteStatus(status.id, 'ticket_status')}>
                                                <svg width="20" fill="#bfbdbd" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPanel>
                    <TabPanel value={value} index={5}>
                        <input type="text" placeholder="Agent" value={agentTerm} onChange={(e) => setAgent(e.target.value)} />
                        <Button variant="contained" className="add-new-btn" onClick={addNewAgent}>Add</Button>
                        <div className="helpdesk-terms-list">
                            {agents && agents.map((agents) => {
                                return(
                                    <div key={agents.id} className="helpdesk-term">
                                        <span>{agents.name}</span>
                                        <div className="helpdesk-delete-term">
                                            <Button onClick={() => deleteAgent(agents.id, 'ticket_agent')}>
                                                <svg width="20" fill="#bfbdbd" viewBox="0 0 24 24"><path d="M19 6.41 17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"></path></svg>
                                            </Button>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    </TabPanel>
                </Box>
            </div>
            <Toaster />
        </ThemeProvider>
    )
}

export default Settings
