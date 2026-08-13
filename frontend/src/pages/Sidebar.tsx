import { NavLink } from 'react-router-dom'

const navigationItems = [
  {
    label: 'Dashboard',
    path: '/',
  },
  {
    label: 'Services',
    path: '/services',
  },
  {
    label: 'Jobs',
    path: '/jobs',
  },
  {
    label: 'Logs',
    path: '/logs',
  },
]

const Sidebar = () => {
  return (
    <aside className="hidden min-h-screen w-64 flex-col border-r border-slate-200 bg-slate-950 text-white md:flex">
      <div className="border-b border-slate-800 px-6 py-5">
        <h1 className="text-xl font-bold">
          AutoOps
        </h1>

        <p className="mt-1 text-xs text-slate-400">
          Operations Portal
        </p>
      </div>

      <nav className="flex-1 px-3 py-6">
        <ul className="space-y-2">
          {navigationItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                end={item.path === '/'}
                className={({ isActive }) =>
                  [
                    'block rounded-lg px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-slate-800 text-white'
                      : 'text-slate-400 hover:bg-slate-900 hover:text-white',
                  ].join(' ')
                }
              >
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div className="border-t border-slate-800 px-6 py-4">
        <p className="text-xs text-slate-500">
          AutoOps v0.1.0
        </p>
      </div>
    </aside>
  )
}

export default Sidebar