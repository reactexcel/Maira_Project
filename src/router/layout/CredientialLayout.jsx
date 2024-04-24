import React, { useEffect } from 'react'
import LoginAndRegisterComponent from '../../components/loginandregister'
import { Outlet, useNavigate } from 'react-router-dom'

const CredientialLayout = () => {
  
  return (
    <LoginAndRegisterComponent pages={<Outlet/>}/>
  )
}

export default CredientialLayout
