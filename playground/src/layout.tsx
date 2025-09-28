import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { useTheme } from './theme';
import { ThemePreference } from './theme';
import { Tabs } from '@/components/base/buttons/Tabs';

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
  const { preference, setPreference } = useTheme();

  return (
    <div className="min-h-screen bg-[var(--surface-base)] text-[var(--text-primary)] transition-colors duration-300">
      <div className="mx-auto flex min-h-screen max-w-7xl flex-col gap-6 px-4 py-6 transition-colors duration-300 md:flex-row md:py-10">
        <aside className="w-full shrink-0 rounded-2xl transition-colors duration-300 md:w-72 overflow-y-scroll h-screen">
          <div className="space-y-4 px-5 py-6">
            <p className="text-sm font-semibold uppercase tracking-wide">
              RTU Components
            </p>
            <h1 className="mt-1 text-xl font-semibold">Playground</h1>
            <p className="mt-2 text-sm opacity-80">
              Browse the ready-made routes below to explore the component
              catalog.
            </p>
            <ThemeTabs
              activePreference={preference}
              selectTheme={setPreference}
            />
          </div>
          <nav className="flex flex-col gap-1 px-3 py-4">
            {pages.map(page => (
              <NavLink
                key={page.path}
                to={page.path}
                className={({ isActive }) =>
                  [
                    'rounded-xl px-3 py-2 text-sm font-medium transition-all focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[var(--color-primary-500)]',
                    'hover:shadow-sm transition-colors duration-200',
                    isActive || location.pathname === page.path
                      ? 'shadow-sm text-[var(--text-primary)]'
                      : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]',
                  ].join(' ')
                }
                end={page.path === '/'}
              >
                <div className="flex flex-col gap-1">
                  <span>{page.title}</span>
                  {page.description ? (
                    <span className="text-xs font-normal opacity-75">
                      {page.description}
                    </span>
                  ) : null}
                </div>
              </NavLink>
            ))}
          </nav>
        </aside>
        <main className="flex-1">
          <div className="rounded-2xl p-6 transition-colors duration-300 md:p-10">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;

type ThemeTabsProps = {
  activePreference: ThemePreference;
  selectTheme: (preference: ThemePreference) => void;
};

type ThemeOption = {
  value: ThemePreference;
  label: string;
  icon: string;
};

const themeOptions: ThemeOption[] = [
  { value: ThemePreference.LIGHT, label: 'Light', icon: 'sun' },
  { value: ThemePreference.DARK, label: 'Dark', icon: 'moon' },
  { value: ThemePreference.AUTO, label: 'Auto', icon: 'equalizer2' },
];

const ThemeTabs = ({ activePreference, selectTheme }: ThemeTabsProps) => {
  return (
    <Tabs
      options={themeOptions}
      value={activePreference}
      onClick={selectTheme}
      variant="secondary"
    />
  );
};
