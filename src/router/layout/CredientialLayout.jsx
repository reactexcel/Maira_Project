import LoginAndRegisterComponent from '../../components/loginandregister'
import { Outlet} from 'react-router-dom'

const CredientialLayout = () => {
  return (
    <LoginAndRegisterComponent pages={<Outlet/>}/>
  )
}

export default CredientialLayout
