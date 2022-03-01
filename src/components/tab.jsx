import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Characters from './characters';

export default function CenteredTabs({ currentData, page, count, dispatch }) {
    const [value, setValue] = React.useState('1');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <>
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
                        return <Characters currentData={currentData} page={page} count={count} dispatch={dispatch} />
                    case '2':
                        return <h1>Ubicaciones</h1>
                    case '3':
                        return <h1>Orígenes</h1>
                    default:
                        break;
                }
            })()}
        </>
    );
}