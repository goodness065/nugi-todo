import Navbar from './navbar'
import { Outlet } from 'react-router-dom'

const PageLayout = () => {
  return (
    <div>
    <Navbar />
    <div className='layout-container pt-10'>
      <Outlet />
    </div>
  </div>
  )
}

export default PageLayout