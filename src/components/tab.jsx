import * as React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

export default function CenteredTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%', bgcolor: 'background.paper', color: 'secondary.main' }}>
      <Tabs value={value} onChange={handleChange} centered>
        <Tab label="Personajes" />
        <Tab label="Ubicaciones" />
        <Tab label="Orígenes" />
      </Tabs>
    </Box>
  );
}