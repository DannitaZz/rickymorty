import React from 'react'
import CenteredTabs from '../components/tab'

export default function Info({ data, currentData, page, count, dispatch }) {
  return (
    <>
      <CenteredTabs data={data} currentData={currentData} page={page} dispatch={dispatch} count={count} />
    </>
  )
}
