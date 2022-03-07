import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';


export default function PaginationSimple({ data, count, page, dispatch }) {

	const handleChange = async (event, value) => {
		const currentData = data.slice((value - 1) * 20, value * 20);
		if (count * 20 > 60) {
			dispatch({ type: 'setAlbumCharPage', page: value, currentAlbum: currentData })
		} else {
			dispatch({ type: 'setAlbumEpiPage', page: value, currentAlbum: currentData })
		}

	};

	return (
		<>
			<div style={{ width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1%', marginBottom: '1%' }}>
				<Stack spacing={2} sx={{ alignSelf: 'center' }}>
					<Pagination count={count} page={Number(page)} onChange={handleChange} />
				</Stack>
			</div>
		</>
	);
}