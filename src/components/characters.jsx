import React, { useState, useEffect } from 'react'
import axios from 'axios';
import List from './list';
import PaginationControlled from './pagination';
import { useConsumer } from '../context/context';

export default function Characters({ count }) {
	const [state, dispatch] = useConsumer();
	const bodyRepo = {
		"query": `
        query {
            characters(page: ${Number(state.infoPage.page)})  {
              info {
                count
              }
              results {
                id, image, name, 
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

	useEffect(() => {
		async function getCharacters() {
			try {

				const response = await axios({ method: "post", url: baseUrl, data: JSON.stringify(bodyRepo), headers: headers });
				const fulldata = response.data.data.characters.results;
				const totalCount = Number(response.data.data.characters.info.count);
				dispatch({ type: 'getData', data: fulldata, count: totalCount })

			} catch (error) {
				console.error(error);
			}
		}
		getCharacters();

	}
		, [])

	return (
		<>
			<List currentData={state.infoPage.currentData} />
			<PaginationControlled count={parseInt(state.count / 20)} page={state.infoPage.page} dispatch={dispatch} />
		</>
	)
}
