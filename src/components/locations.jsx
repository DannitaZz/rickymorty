import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaginationLocation from './pagination-location';

export function Locations({ locationCount, locations, locationsPage, dispatch }) {
    const bodyRepo = {
        "query": `
        query {
            locations(page: 1){
                info{
                    count
                }
              results{
                id, name, type, residents {name}
              }
            }
          }
        
    `
    }

    const baseUrl = "https://rickandmortyapi.com/graphql";
    const headers = {
        "Content-Type": "application/json"
    }

    useEffect(() => {
        async function getLocations() {
            try {

                const response = await axios({ method: "post", url: baseUrl, data: JSON.stringify(bodyRepo), headers: headers });
                const locations = response.data.data.locations.results;
                const locationCount = Number(response.data.data.locations.info.count);
                dispatch({ type: 'getLocations', data: locations, count: locationCount })

            } catch (error) {
                console.error(error);
            }
        }
        getLocations();

    }
        , [])
    const checkData = (data, key) => {
        try {
            return data[key]
        }
        catch {
            return 'loading'
        }
    }

    const [expanded, setExpanded] = useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <>
            {locations.map((location, i) => {
                return (
                    <Accordion key={'ac' + i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography sx={{ width: '33%', flexShrink: 0 }}>
                                {checkData(location, 'name')}
                            </Typography>
                            <Typography sx={{ color: 'text.secondary' }}> {checkData(location, 'type')}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography sx={{ textAlign: 'center' }}>
                                Residents: {location.residents.map((resident, i) => {
                                    return <li key={'r' + i}>{resident.name}</li>
                                })}
                            </Typography>
                        </AccordionDetails>
                    </Accordion>
                )
            })}
            <PaginationLocation count={parseInt(locationCount / 20)} page={locationsPage} dispatch={dispatch} />
        </>
    )
}

