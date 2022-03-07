
import { Card, CardActionArea, CardMedia, Typography } from '@mui/material';
import React from 'react';
import rickymorty from '../img/rickymorty.png'
import { useNavigate } from 'react-router-dom';
import { useConsumer } from '../context/context';

export default function CardPack({ num }) {
	const navigateTo = useNavigate();
	const [state, dispatch] = useConsumer();

	const handleClick = (e) => {
		if (state.packPage.timerVal == 0) {
			navigateTo('/sheets/opened');
			dispatch({ 'type': 'setTimer', 'value': 60 })
			dispatch({ 'type': 'closePack', 'value': num })
		}
	}


	return (
		< Card sx={{ display: 'block', height: '250px', maxWidth: 400, margin: '10px' }}>
			<CardActionArea value={num} onClick={handleClick}>
				{(() => {
					if (state.packPage.packs[num]) {
						return (<Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'center' }}>Abre aquí</Typography>)
					} else {
						return (<Typography gutterBottom variant="h4" component="div" sx={{ textAlign: 'center' }}>Cerrado</Typography>)
					}
				})()}

				<CardMedia component='img' image={rickymorty} sx={{
					height: '150px',
					align: 'center',
					margin: '0px',
					padding: '0px',
					border: '0px',
					objectFit: 'contain',
				}}>
				</CardMedia>
			</CardActionArea>
		</Card>
	)
}