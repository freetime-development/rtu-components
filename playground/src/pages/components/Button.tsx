import { Fragment } from 'react';

import { Button } from '@/components/base/buttons/Button';

export const meta = {
  title: 'Buttons',
  description: 'Explore the base Button component variants, sizes, and orientations.',
};

const variants = ['primary', 'secondary', 'outlined'] as const;
const sizes = ['small', 'normal', 'large', 'full'] as const;

const ButtonShowcase = () => {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold text-gray-900">Variants</h2>
          <p className="mt-1 text-sm text-gray-600">
            The <code className="rounded bg-gray-100 px-1.5 py-0.5">variant</code> prop swaps the visual style of the button.
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          {variants.map((variant) => (
            <Button key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold text-gray-900">Sizes</h2>
          <p className="mt-1 text-sm text-gray-600">
            Combine <code className="rounded bg-gray-100 px-1.5 py-0.5">size</code> and{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5">variant</code> to achieve the right emphasis for each
            action.
          </p>
        </header>
        <div className="flex flex-col gap-4">
          {sizes.map((size) => (
            <div key={size} className="flex flex-wrap items-center gap-3">
              <span className="w-24 text-sm font-medium text-gray-500">{size}</span>
              {variants.map((variant) => (
                <Button key={`${size}-${variant}`} size={size} variant={variant}>
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold text-gray-900">Loading & Orientation</h2>
          <p className="mt-1 text-sm text-gray-600">
            Use the <code className="rounded bg-gray-100 px-1.5 py-0.5">loading</code> and{' '}
            <code className="rounded bg-gray-100 px-1.5 py-0.5">orientation</code> props to adapt the button for more
            complex states.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-dashed border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900">Loading state</h3>
            <p className="mt-1 text-xs text-gray-500">
              Disable interactions and lower opacity by toggling the <code className="rounded bg-gray-100 px-1.5 py-0.5">
                loading
              </code>{' '}
              prop.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {variants.map((variant) => (
                <Button key={`loading-${variant}`} loading variant={variant}>
                  Loading…
                </Button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-gray-200 p-4">
            <h3 className="text-sm font-semibold text-gray-900">Orientation</h3>
            <p className="mt-1 text-xs text-gray-500">
              Reverse the placement of icons or other children by setting{' '}
              <code className="rounded bg-gray-100 px-1.5 py-0.5">orientation=&quot;reverse&quot;</code>.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {variants.map((variant) => (
                <Button key={`orientation-${variant}`} orientation="reverse" variant={variant}>
                  <Fragment>
                    <span>Reverse</span>
                    <span aria-hidden>&rarr;</span>
                  </Fragment>
                </Button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ButtonShowcase;
