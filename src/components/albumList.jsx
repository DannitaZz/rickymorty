import React from 'react'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Stack } from '@mui/material';
import ListItem from '@mui/material/ListItem';
import PaginationSimple from './paginationSimple';
import { DataArray } from '@mui/icons-material';

export default function AlbumList({ fullData, data, count, page, dispatch }) {
	const checkData = (data, key) => {
		try {
			return data[key]
		}
		catch {
			return 'loading'
		}
	}
	return (
		<>
			<div className='fade-in' style={{ width: '100vw', display: 'flex', flexDirection: 'row', flexFlow: 'row wrap', justifyContent: 'center' }}>
				{data && data.map((char, i) => {
					return (
						<div key={`div_${i}`}>
							<Card key={`${checkData(char, 'id')}`} sx={{ display: { xs: 'none', sm: 'block', height: '300px' }, maxWidth: '200px', margin: '10px' }}>
								<CardMedia
									component="img"
									height="200px"
									image={char.image}
									alt={checkData(char, 'name')}
									sx={{
										height: '200px',
										align: 'center',
										margin: '0px',
										padding: '0px',
										border: '0px',
										objectFit: 'contain',
									}}
								/>
								<CardContent>
									<Stack sx={{
										display: 'flex',
										flexDirection: 'column',
										margin: '0px',
										padding: '0px',
										border: '0px',
										marginLeft: '5px'
									}}>
										{checkData(char, 'id') === 9999 ? <span></span> : <Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
											# {checkData(char, 'id')}
										</Typography>}
										<Typography gutterBottom variant="h6" component="div" sx={{ textAlign: 'center' }}>
											{checkData(char, 'name')}
										</Typography>
									</Stack>

								</CardContent>
							</Card>
							<ListItem key={`char_${checkData(char, 'id')}`} alignItems="center" sx={{ width: '100%', bgcolor: 'background.paper', height: '130px', display: { xs: 'flex', sm: 'none' } }} >
								<Card sx={{ display: 'flex', width: '93vw', height: '125px' }} key={checkData(char, 'id')}>
									<CardContent sx={{ flex: '1 1 auto', flexDirection: 'row' }}>
										<Stack sx={{
											display: 'flex',
											flexDirection: 'row',
											justifyContent: 'space-between',
											margin: '0px',
											padding: '0px',
											border: '0px',
											marginLeft: '5px'
										}}>
											<Typography gutterBottom variant="h6" component="div">
												{checkData(char, 'id')}
											</Typography>
											<Typography gutterBottom variant="h6" component="div">
												{checkData(char, 'name')}
											</Typography>
										</Stack>

									</CardContent>
									<CardMedia
										component="img"
										sx={{
											width: '30vw',
											objectFit: 'contain',
										}}
										image={char.image}
										alt={checkData(char, 'name')}
									/>
								</Card>
							</ListItem>
						</div>
					)
				})}
			</div>
			<PaginationSimple data={fullData} count={Math.round(count / 20)} page={page} dispatch={dispatch} />
		</>
	)
}
