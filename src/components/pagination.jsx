import * as React from 'react';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function PaginationControlled({ count, page, dispatch }) {


    const handleChange = async (event, value) => {
        const bodyRepo = {
            "query": `
            query {
                characters(page: ${Number(value)})  {
                  info {
                    count
                  }
                  results {
                    image, name, 
                    status, species, gender
                  }
                }
              }
            
        `
        }

        const baseUrl = "https://rickandmortyapi.com/graphql";
        const headers = {
            "Content-Type": "application/json"
        }
        const response = await axios({ method: "post", url: baseUrl, data: JSON.stringify(bodyRepo), headers: headers });
        const fulldata = response.data.data.characters.results;
        dispatch({ type: 'setInfoPage', page: value, currentData: fulldata })
    };

    return (
        <Stack spacing={2}>
            <Typography>Page: {page}</Typography>
            <Pagination count={count} page={page} onChange={handleChange} />
        </Stack>
    );
}