import { Stack, Paper } from '@mui/material';
import { Box } from '@mui/system';
import React, { useEffect } from 'react';
import rickymorty from '../img/rickymorty.png'
import CancelPresentationIcon from '@mui/icons-material/CancelPresentation';
import { useNavigate } from 'react-router-dom';
import { useConsumer } from '../context/context';
import axios from 'axios';
import OpenedCard from './openedCard';
const defaultImg = rickymorty
const numCharacters = 821
const numEpisodes = 51

export default function OpenedSheets() {

	const navigateTo = useNavigate();
	const [state, dispatch] = useConsumer();

	let sheets = [false, false, false, false, false];

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
		async function getCharacter() {
			try {
				let promises = [];
				for (var i = 1; i < 5; i++) {
					const response = axios({ method: "post", url: baseUrl, data: JSON.stringify(queryCharacter(randomNumber(1, numCharacters))), headers: headers });
					promises.push(response);
				}
				const episode = axios({ method: "post", url: baseUrl, data: JSON.stringify(queryEpisode(randomNumber(1, numEpisodes))), headers: headers });
				promises.push(episode);
				let results = await Promise.all(promises);
				results = results.map(item => item.data.data)
				let characters = results.slice(0, 4).map(item => ({
					id: item.character.id,
					name: item.character.name,
					image: item.character.image,
					type: 'character'
				}))
				let episode_ = results.slice(4, 5).map(item => ({
					id: item.episode.id,
					name: item.episode.name,
					image: defaultImg,
					type: 'episode'
				}))

				results = [...characters, ...episode_]

				dispatch({ type: 'setCardPack', results: results })

			} catch (error) {
				console.log(error);
			}
		}
		getCharacter();

	}, [])


	return (

		<Box sx={{ display: 'flex', alignContent: 'center', justifyItems: 'center', height: '70%', margin: { xs: '20px' } }} >
			< Paper elevation={3} sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around', alignItems: 'center', backgroundColor: '#ECFBA7', padding: { xs: '5%', xl: '9%' }, paddingLeft: { xl: '13%' }, paddingRight: { xl: '13%' } }}>
				<CancelPresentationIcon fontSize='large' onClick={closeEnvelope} sx={{ alignSelf: 'flex-end' }} />
				<Stack sx={{ display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'space-around', alignItems: 'center' }} >
					{
						sheets.map((e, i) => {
							return (<OpenedCard
								id={state.packPage.currentCards[i].id}
								key={`${i}c`}
								name={state.packPage.currentCards[i].name}
								image={state.packPage.currentCards[i].image}
								type={state.packPage.currentCards[i].type}
							/>)
						})
					}
				</Stack>

			</Paper>
		</Box >
	)
}
