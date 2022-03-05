import React from 'react'
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab'
import AlbumList from '../components/albumList'
import { useConsumer } from '../context/context'

export default function Album() {
  const [value, setValue] = React.useState('1');
  const [state, dispatch] = useConsumer();
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box sx={{ width: '100%', bgcolor: 'background.paper' }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Personajes" value='1' />
          <Tab label="Episodios" value='2' />
        </Tabs>
      </Box>
      {(() => {
        switch (value) {
          case '1':
            return <AlbumList fullData={state.albumCharacters} data={state.albumPage.currentChars} count={state.count} page={state.albumPage.charPage} dispatch={dispatch} />
          case '2':
            return <AlbumList fullData={state.albumEpisodes} data={state.albumPage.currentEpis} count={state.episodesCount} page={state.albumPage.epiPage} dispatch={dispatch} />
          default:
            break;
        }
      })()}
    </>
  )
}