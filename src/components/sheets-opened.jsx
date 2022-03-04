import { Card, CardActionArea, CardMedia, Typography, CardContent, Stack, Tooltip, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useState, useEffect } from 'react';
import rickymorty from '../img/rickymorty.png'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useNavigate } from 'react-router-dom';
import { useConsumer } from '../context/context';
import axios from 'axios';

export default function OpenedSheets() {

	const navigateTo = useNavigate();
	const [state, dispatch] = useConsumer();

	let sheets = [false, false, false, false, false];
	const [visible, setVisible] = useState(sheets);

	const handleClick = (e) => {
		let isVisible = [false, false, false, false]
		const value = Number(e.currentTarget.value);
		isVisible[value] = true;
		setVisible(isVisible);
	}

	const closeEnvelope = () => {
		navigateTo('/sheets/closed')
	}

	function randomNumber(a, b) {
		return Math.round(Math.random() * (b - a) + parseInt(a));
	}
	function queryCharacter(number) {
		const body = {
			"query": `
			query {
				character(id: ${Number(number)}) {
					
					name, image, id
				}
			}
			`
		}
		return body
	}

	function queryEpisode(number) {
		const body = {
			"query": `
			query {
				episode(id: ${Number(number)}) {
					
					name, id
				}
			}
			`
		}
		return body
	}

	const baseUrl = "https://rickandmortyapi.com/graphql";
	const headers = {
		"Content-Type": "application/json"
	}
	useEffect(() => {
		async function getCharacter(number) {
			try {
				let promises = [];
				for (var i = 1; i < 5; i++) {
					const response = axios({ method: "post", url: baseUrl, data: JSON.stringify(queryCharacter(randomNumber(1, 821))), headers: headers });
					promises.push(response);
				}
				const episode = axios({ method: "post", url: baseUrl, data: JSON.stringify(queryEpisode(randomNumber(1, 51))), headers: headers });
				promises.push(episode);
				let results = await Promise.all(promises);
				console.log('promises', results)
			} catch (error) {
				console.error(error);
			}
		}
		getCharacter();
	}, [])


	return (

		<Box sx={{ display: 'flex', alignContent: 'center', justifyItems: 'center', height: '70%', margin: { xs: '20px' } }} >
			{console.log('en el componente', visible)}
			< Paper elevation={3} sx={{ display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#ECFBA7', padding: { xs: '5%', xl: '9%' }, paddingLeft: { xl: '13%' }, paddingRight: { xl: '13%' } }}>
				{sheets.map((e, i) => {
					return (
						<Card key={`${i}c`} sx={{ display: { xs: 'block', sm: 'block', height: '400px' }, margin: '10px' }}>
							<CardMedia
								component="img"
								height="300px"
								image={`https://rickandmortyapi.com/api/character/avatar/15.jpeg`}
								alt={'a'}
								sx={{
									height: '250px',
									align: 'center',
									margin: '0px',
									padding: '0px',
									border: '0px',
									objectFit: 'contain',
								}}
							/>
							<CardContent>
								<Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
									<Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'center' }}>
										Pepito Pérez
									</Typography>
									<Tooltip title='add to album'>
										<AddCircleIcon fontSize='large' />
									</Tooltip>
									{/* <RemoveCircleIcon /> */}
								</Stack>
							</CardContent>
						</Card>
					)
				})}
				<CancelPresentationIcon fontSize='large' onClick={closeEnvelope} />
			</Paper>
		</Box >
	)
}
