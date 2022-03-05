import { Box } from '@mui/system';
import React from 'react';
import CardPack from './cardPack';

export default function ClosedSheets() {

	let sheets = [false, false, false, false];

	return (
		<>
			<Box sx={{ width: '100vw', height: { xs: '100%', sm: '80vh' }, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, flexFlow: 'row wrap', justifyContent: 'center', alignContent: 'center' }}>
				{sheets.map((e, i) => {
					return (
						< CardPack key={i} num={i} />
					)
				})}
			</Box>
		</>
	)
}
