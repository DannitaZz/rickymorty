import { Card, CardMedia, Typography, CardContent, Stack, Tooltip } from '@mui/material'
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import { useConsumer } from '../context/context';

export default function OpenedCard({ id, name, type, image }) {

	const [state, dispatch] = useConsumer();

	function validate(type, id) {
		if (type === 'character') {
			return !state.albumCharacters[id].id === 9999

		} else if (type === 'episode') {
			return !state.albumEpisodes[id].id === 9999
		}
	}

	let isObtained = validate(type, id)

	function handleClickPlus() {
		dispatch({ type: 'addItem', value: { itemType: type, itemId: id, data: { id: id, name: name, type: type, image: image } } })
	}

	return <Card sx={{ display: { xs: 'block', sm: 'block', maxHeight: '350px', maxWidth: '250px' }, margin: '10px' }}>
		<CardMedia
			component="img"
			height="200px"
			image={image}
			alt={'a'}
			sx={{
				maxHeight: '200px',
				align: 'center',
				margin: '0px',
				padding: '0px',
				border: '0px',
				objectFit: 'contain',
			}}
		/>
		<CardContent>
			<Stack sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
				<Typography gutterBottom variant="p" component="div" sx={{ textAlign: 'center' }}>
					# {id}
				</Typography>
				{name}
				{(() => {
					if (type === 'character' && state.albumCharacters[id].id === 9999) {
						return (<Tooltip title='add to album'>
							<AddCircleIcon fontSize='large' onClick={handleClickPlus} />
						</Tooltip>)
					} else if (type === 'episode' && state.albumEpisodes[id].id === 9999) {
						return (<Tooltip title='discard'>
							<AddCircleIcon fontSize='large' onClick={handleClickPlus} />
						</Tooltip>)
					} else {
						return (<Tooltip title='discard'>
							<RemoveCircleIcon fontSize='large' />
						</Tooltip>)
					}
				})()}

			</Stack>
		</CardContent>
	</Card>
}