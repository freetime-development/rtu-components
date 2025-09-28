import { Icon } from '@/components/base/icons';
import { iconNames } from '@/components/base/icons/icomoon/icomoon';

export const meta = {
  title: 'Icons',
  description: 'Icomoon glyphs bundled with the component library.',
};

const IconsPage = () => {
  return (
    <div className="space-y-6">
      <section className="space-y-3">
        <header>
          <h2 className="text-2xl font-semibold">Icon set</h2>
          <p className="mt-1 text-sm opacity-80">
            Icons render as font glyphs. Use the <code className="rounded px-1.5 py-0.5">Icon</code> component for
            TypeScript safety and sizing utilities.
          </p>
        </header>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {iconNames.map(name => (
            <div
              key={name}
              className="flex items-center gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <Icon name={name} className="text-lg" />
              <code className="text-xs">{name}</code>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default IconsPage;
