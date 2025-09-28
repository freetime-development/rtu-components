import { Alert } from '@/components/base/alerts';

export const meta = {
  title: 'Alerts',
  description: 'Feedback banners for inline messaging and toast replacements.',
};

const alertTypes = ['info', 'success', 'warning', 'error'] as const;

const AlertsPage = () => {
  return (
    <div className="space-y-8">
      <section className="space-y-3">
        <header>
          <h2 className="text-2xl font-semibold">Contextual styles</h2>
          <p className="mt-1 text-sm opacity-80">
            Pass <code className="rounded px-1.5 py-0.5"></code> to switch the
            visual treatment.
          </p>
        </header>
        <div className="flex flex-col gap-3">
          {alertTypes.map(type => (
            <Alert key={type} variant={{ type }} className="justify-between">
              <div>
                <p className="font-semibold capitalize">{type} state</p>
                <p className="text-sm opacity-80">
                  Use alerts for short, high-priority feedback that stays inline
                  with surrounding content.
                </p>
              </div>
            </Alert>
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <header>
          <h2 className="text-2xl font-semibold">Custom content</h2>
          <p className="mt-1 text-sm opacity-80">
            Alerts accept any children, so you can compose actions or longer
            descriptions freely.
          </p>
        </header>
        <Alert
          variant={{ type: 'info' }}
          className="flex-col gap-2 text-left sm:flex-row"
        >
          <div className="flex-1">
            <p className="font-semibold">Update available</p>
            <p className="text-sm opacity-80">
              There&apos;s a new release of the RTU components package. Update
              now to stay on the latest design tokens.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="text-sm font-medium text-white/80 underline-offset-4 hover:underline">
              Remind me later
            </button>
            <button className="rounded-md bg-white/15 px-3 py-1 text-sm font-medium text-white">
              View changelog
            </button>
          </div>
        </Alert>
      </section>
    </div>
  );
};

export default AlertsPage;
