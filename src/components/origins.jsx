import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PaginationLocation from './pagination-location';
import { useConsumer } from '../context/context';

export function Origins() {
    const [state, dispatch] = useConsumer();
    const body = (page) => {
        const bodyRepo = {
            "query": `
        query {
            characters(page: ${Number(page)}) {
              results{
                name, origin {name}
              }
            }
          }
    `
        }
        return bodyRepo
    }

    const baseUrl = "https://rickandmortyapi.com/graphql";
    const headers = {
        "Content-Type": "application/json"
    }

    useEffect(() => {
        async function getOrigins() {
            try {
                let origins = []
                let characters = []
                for (let i = 1; i > 43; i++) {
                    const response = await axios({ method: "post", url: baseUrl, data: JSON.stringify(body(i)), headers: headers });
                    const originsData = response.data.data.characters.results;
                    characters.push(originsData);
                    console.log('response', response);
                }
                console.log('Characters', characters);
                /* const response = await axios({ method: "post", url: baseUrl, data: JSON.stringify(body(1)), headers: headers });
                const originsData = response.data.data.characters.results; */
                /* originsData.forEach((char, i) => {
                    origins.push(char.origin.name);
                }) */
                console.log('Origins', origins);
                // dispatch({ type: 'getLocations', data: locations, count: locationCount })

            } catch (error) {
                console.error(error);
            }
        }
        getOrigins();

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
            <p>Orígenes</p>
            {/* {state.infoPage.currentLocations.map((location, i) => {
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
            <PaginationLocation count={parseInt(state.locationCount / 20)} page={state.infoPage.locationPage} dispatch={dispatch} /> */}
        </>
    )
}

