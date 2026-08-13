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

const MobileNavigation = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t border-slate-200 bg-white md:hidden">
      <ul className="grid grid-cols-4">
        {navigationItems.map((item) => (
          <li key={item.path}>
            <NavLink
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                [
                  'flex justify-center px-2 py-4 text-xs font-medium',
                  isActive
                    ? 'text-slate-900'
                    : 'text-slate-500',
                ].join(' ')
              }
            >
              {item.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default MobileNavigation