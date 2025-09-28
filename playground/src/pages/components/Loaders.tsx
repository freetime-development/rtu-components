import { LoadingSpinner } from '@/components/base/loaders';

export const meta = {
  title: 'Loaders',
  description: 'Progress indicators to communicate asynchronous work.',
};

const LoadersPage = () => {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <header>
          <h2 className="text-2xl font-semibold">Inline spinner</h2>
          <p className="mt-1 text-sm opacity-80">
            The spinner inherits the text color of its container and supports light or dark treatments.
          </p>
        </header>
        <div className="flex flex-wrap gap-6">
          <div className="flex items-center gap-3 rounded-xl bg-primary px-4 py-3 text-white shadow-sm">
            <LoadingSpinner />
            <span className="text-sm font-medium">Saving changes…</span>
          </div>
          <div className="flex items-center gap-3 rounded-xl border border-gray-200 px-4 py-3 text-gray-700 shadow-sm">
            <LoadingSpinner color="black" />
            <span className="text-sm font-medium">Fetching analytics…</span>
          </div>
        </div>
      </section>

      <section className="space-y-3">
        <header>
          <h2 className="text-2xl font-semibold">Composable</h2>
          <p className="mt-1 text-sm opacity-80">
            Pair the loader with helper text to create richer skeleton states.
          </p>
        </header>
        <div className="grid gap-4 rounded-2xl border border-dashed border-gray-200 p-6 md:grid-cols-2">
          {[1, 2, 3].map(item => (
            <div key={item} className="flex items-center gap-4 rounded-xl bg-gray-50 p-4">
              <LoadingSpinner color="black" />
              <div>
                <p className="text-sm font-semibold">Card {item}</p>
                <p className="text-xs opacity-70">Awaiting response from the API…</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default LoadersPage;
