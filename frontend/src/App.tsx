import { Route, Routes } from 'react-router-dom'
import AppLayout from './components/layouts/AppLayout'
import DashboardPage from './pages/DashboardPage'
import JobsPage from './pages/JobsPage'
import LogsPage from './pages/LogsPage'
import ServicesPage from './pages/ServicesPage'

function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route index element={<DashboardPage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="jobs" element={<JobsPage />} />
        <Route path="logs" element={<LogsPage />} />
      </Route>
    </Routes>
  )
}

export default App