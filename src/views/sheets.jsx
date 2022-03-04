import React from 'react'
import { Outlet } from 'react-router-dom'
import ClosedSheets from '../components/sheets-closed'
import OpenedSheets from '../components/sheets-opened'

export default function Sheets() {
  return (
    <>

      {/* <ClosedSheets /> */}
      {/* <OpenedSheets /> */}
      <Outlet />
    </>
  )
}
