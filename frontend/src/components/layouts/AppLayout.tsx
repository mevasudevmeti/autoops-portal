import { Outlet } from 'react-router-dom'
import Sidebar from '../../pages/Sidebar'

const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />

      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  )
}

export default AppLayout