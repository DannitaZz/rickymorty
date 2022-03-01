import React, { useState, useEffect } from 'react'
import axios from 'axios';
import List from './list';
import PaginationControlled from './pagination';

export default function Characters({ data, currentData, page, count, dispatch }) {
    const bodyRepo = {
        "query": `
        query {
            characters(page: ${Number(page)})  {
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
            <List currentData={currentData} />
            <PaginationControlled count={parseInt(count / 20)} page={page} dispatch={dispatch} />
        </>
    )
}
