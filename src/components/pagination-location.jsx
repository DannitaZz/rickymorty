import * as React from 'react';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import axios from 'axios';

export default function PaginationLocation({ count, page, dispatch }) {

    const handleChange = async (event, value) => {

        const bodyRepo = {
            "query": `
            query {
                locations(page: ${Number(value)}){
                  results{
                    id, name, type, residents {name}
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
        const fulldata = response.data.data.locations.results;
        dispatch({ type: 'setLocations', locationPage: value, currentLocations: fulldata })
    };

    return (
        <div style={{ width: '100vw', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: '1%', marginBottom: '1%' }}>
            <Stack spacing={2} sx={{ alignSelf: 'center' }}>
                <Pagination count={count} page={page} onChange={handleChange} />
            </Stack>
        </div>
    );
}