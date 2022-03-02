import React from 'react'
import CenteredTabs from '../components/tab'

export default function Info({ data, currentData, locations, locationCount, locationsPage, page, count, dispatch }) {
  return (
    <>
      <CenteredTabs data={data} currentData={currentData} locationCount={locationCount} locations={locations} locationsPage={locationsPage} page={page} dispatch={dispatch} count={count} />
    </>
  )
}
