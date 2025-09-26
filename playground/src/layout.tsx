import { NavLink, Outlet, useLocation } from 'react-router-dom';

export type PlaygroundPage = {
  path: string;
  title: string;
  description?: string;
};

type LayoutProps = {
  pages: PlaygroundPage[];
};

const Layout = ({ pages }: LayoutProps) => {
  const location = useLocation();

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 md:flex-row md:py-10">
        <aside className="w-full shrink-0 rounded-2xl border border-gray-200 bg-white shadow-sm md:w-72">
          <div className="border-b border-gray-200 px-5 py-6">
            <p className="text-sm font-semibold text-primary-600">RTU Components</p>
            <h1 className="mt-1 text-xl font-semibold text-gray-900">Playground</h1>
            <p className="mt-2 text-sm text-gray-500">
              Browse the ready-made routes below to explore the component catalog.
            </p>
          </div>
          <nav className="flex flex-col gap-1 px-3 py-4">
            {pages.map((page) => (
              <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-3 py-2 text-sm font-medium transition-all',
                    'hover:bg-gray-100 hover:text-gray-900 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-500',
                    (isActive || location.pathname === page.path)
                      ? 'bg-primary-50 text-primary-700 shadow-sm'
                      : 'text-gray-600',
                  ].join(' ')
                }
                end={page.path === '/'}
              >
                <div className="flex flex-col gap-1">
                  <span>{page.title}</span>
                  {page.description ? (
                    <span className="text-xs font-normal text-gray-500">{page.description}</span>
                  ) : null}
                </div>
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          <div className="h-full rounded-2xl border border-gray-200 bg-white p-6 shadow-sm md:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
