import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Typography from '@mui/material/Typography';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { useConsumer } from '../context/context';

function performQuery({ pageNumber, apiUrl }) {
	const query = `query {
        characters(page: ${pageNumber}) {
          results{
            name, origin {name}
          }
        }
      }`
	const request = {
		url: apiUrl,
		method: 'post',
		headers: {
			"Content-Type": "application/json"
		},
		data: {
			query: query
		}
	}

	return axios(request)
}

async function getAllData({ pages, apiUrl }) {
	let promises = Array.from({ length: pages }, (_, i) => i + 1)
	promises = promises.map(i => performQuery({ pageNumber: i, apiUrl: apiUrl }))
	let rawResults = await Promise.all(promises)
	return rawResults
}

function processOrigins(rawResults) {
	let results = rawResults.map(item => item.data.data.characters.results)

	let flatResults = []

	for (let i = 0; i < results.length; i++) {
		flatResults.push(...results[i]);
	}

	let originsArr = flatResults.map(item => item.origin.name)
	originsArr = new Array(...new Set(originsArr))
	let origins = {}

	for (let item of originsArr) {
		origins[item] = []
	}

	flatResults.forEach(item => { origins[item.origin.name].push(item.name) })

	return origins

}

async function getOrigins() {
	const API_URL = 'https://rickandmortyapi.com/graphql'

	const info_response = await axios.get('https://rickandmortyapi.com/api/character/')
	const info = info_response.data.info
	const pages = info.pages
	const rawResults = await getAllData({ pages: pages, apiUrl: API_URL })
	const origins = processOrigins(rawResults)

	return origins
}

export function Origins() {
	const [state, dispatch] = useConsumer();
	const [expanded, setExpanded] = useState(false);

	const handleChange = (panel) => (event, isExpanded) => {
		setExpanded(isExpanded ? panel : false);
	};

	useEffect(() => {

		async function checkData() {
			let originData = localStorage.getItem('originData')
			if (originData === null) {
				originData = await getOrigins()
				localStorage.setItem('originData', JSON.stringify(originData))
			} else {
				originData = JSON.parse(originData)
			}
			dispatch({ type: 'setOrigins', originData: originData })
		}
		checkData()
	}
		, [])


	return (
		<>
			{state.infoPage.currentOriginData.map((origin, i) => {
				return (
					<Accordion key={'ac' + i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
						<AccordionSummary
							expandIcon={<ExpandMoreIcon />}
							aria-controls="panel1bh-content"
							id="panel1bh-header"
						>
							<Typography sx={{ width: '33%', flexShrink: 0 }}>
								{origin[0]}
							</Typography>
							<Typography sx={{ color: 'text.secondary' }}> {/* {checkData(location, 'type')} */}</Typography>
						</AccordionSummary>
						<AccordionDetails>
							<Typography sx={{ textAlign: 'center' }}>
								Natives: {origin[1].map((resident, i) => {
									return <li key={'r' + i}>{resident}</li>
								})}
							</Typography>
						</AccordionDetails>
					</Accordion>
				)
			})}
		</>
	)
}



