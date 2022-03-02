import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Characters from './characters';
import { Locations } from './locations';
import { Provider } from '../context/context';

export default function CenteredTabs() {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
            <Provider>
                <Box sx={{ width: '100%', bgcolor: 'background.paper', color: 'secondary.main' }}>
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab label="Personajes" value='1' />
                        <Tab label="Ubicaciones" value='2' />
                        <Tab label="Orígenes" value='3' />
                    </Tabs>
                </Box>
                {(() => {
                    switch (value) {
                        case '1':
                            return <Characters />
                        case '2':
                            return <Locations />
                        case '3':
                            return <h1>Orígenes</h1>
                        default:
                            break;
                    }
                })()}
            </Provider>
        </>
    );
}