import { Outlet } from 'react-router-dom'
import MobileNavigation from './MobileNavigation'
import Sidebar from '../../pages/Sidebar'

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="min-w-0 flex-1 pb-16 md:pb-0">
        <Outlet />
      </div>

      <MobileNavigation />
    </div>
  )
}

export default AppLayout