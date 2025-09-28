import { Fragment, useMemo, useState } from 'react';

import {
  Button,
  Chip,
  LinkButton,
  TabOption,
  Tabs,
} from '@/components/base/buttons';
import { Icon } from '@/components';

export const meta = {
  title: 'Buttons',
  description:
    'Explore the base Button component variants, sizes, and orientations.',
};

const variants = ['primary', 'secondary', 'outlined'] as const;
const sizes = ['small', 'normal', 'large', 'full'] as const;

const chipPresets = ['Design', 'Operations', 'Finance', 'Marketing'];

const ButtonShowcase = () => {
  const [chips, setChips] = useState(chipPresets);
  const tabOptions = useMemo<TabOption[]>(
    () => [
      { label: 'Overview', value: 'overview' },
      { label: 'Analytics', value: 'analytics' },
      { label: 'Settings', value: 'settings' },
    ],
    [],
  );
  const [tabValue, setTabValue] = useState(tabOptions[0].value);
  const [secondaryTab, setSecondaryTab] = useState(tabOptions[1].value);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Variants</h2>
          <p className="mt-1 text-sm opacity-80">
            The <code className="rounded px-1.5 py-0.5">variant</code> prop
            swaps the visual style of the button.
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          {variants.map(variant => (
            <Button key={variant} variant={variant}>
              {variant.charAt(0).toUpperCase() + variant.slice(1)}
            </Button>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Link buttons</h2>
          <p className="mt-1 text-sm opacity-80">
            `LinkButton` shares the same visual variants while rendering a
            semantic anchor tag for navigation.
          </p>
        </header>
        <div className="flex flex-wrap gap-3">
          <LinkButton href="#" variant="secondary">
            View docs
          </LinkButton>
          <LinkButton href="#" variant="primary" orientation="reverse">
            <Fragment>
              Get started <Icon name="arrow-right2" />
            </Fragment>
          </LinkButton>
          <LinkButton
            href="#"
            variant="outlined"
            className="gap-1"
            icon="arrow-right2"
          >
            Explore more
          </LinkButton>
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Dismissible chips</h2>
          <p className="mt-1 text-sm opacity-80">
            The `Chip` component is a small pill button useful for filters or
            selected tags.
          </p>
        </header>
        <div className="flex flex-wrap">
          {chips.length === 0 ? (
            <span className="rounded-lg border border-dashed border-gray-300 px-3 py-2 text-sm opacity-70">
              Click “Reset chips” below to bring back the examples.
            </span>
          ) : null}
          {chips.map((chip, index) => (
            <Chip
              key={chip}
              onRemove={() =>
                setChips(prev =>
                  prev.filter((_, chipIndex) => chipIndex !== index),
                )
              }
            >
              {chip}
            </Chip>
          ))}
        </div>
        <button
          type="button"
          className="text-sm font-medium text-primary hover:underline"
          onClick={() => setChips(chipPresets)}
        >
          Reset chips
        </button>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Tabs</h2>
          <p className="mt-1 text-sm opacity-80">
            Tabs come in primary and secondary accents with horizontal or
            vertical orientations.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 rounded-xl border border-dashed border-gray-200 p-4">
            <h3 className="text-sm font-semibold">Primary</h3>
            <Tabs options={tabOptions} value={tabValue} onClick={setTabValue} />
            <p className="text-xs opacity-70">
              Selected tab:&nbsp;<span className="font-medium">{tabValue}</span>
            </p>
          </div>
          <div className="space-y-3 rounded-xl border border-dashed border-gray-200 p-4">
            <h3 className="text-sm font-semibold">Secondary, vertical</h3>
            <Tabs
              options={tabOptions}
              value={secondaryTab}
              onClick={setSecondaryTab}
              orientation="vertical"
              variant="secondary"
              containerClassName="gap-2"
            />
            <p className="text-xs opacity-70">
              Selected tab:&nbsp;
              <span className="font-medium">{secondaryTab}</span>
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Sizes</h2>
          <p className="mt-1 text-sm opacity-80">
            Combine <code className="rounded px-1.5 py-0.5">size</code> and{' '}
            <code className="rounded px-1.5 py-0.5">variant</code> to achieve
            the right emphasis for each action.
          </p>
        </header>
        <div className="flex flex-col gap-4">
          {sizes.map(size => (
            <div key={size} className="flex flex-wrap items-center gap-3">
              <span className="w-24 text-sm font-medium opacity-75">
                {size}
              </span>
              {variants.map(variant => (
                <Button
                  key={`${size}-${variant}`}
                  size={size}
                  variant={variant}
                >
                  {variant.charAt(0).toUpperCase() + variant.slice(1)}
                </Button>
              ))}
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Loading & Orientation</h2>
          <p className="mt-1 text-sm opacity-80">
            Use the <code className="rounded px-1.5 py-0.5">loading</code> and{' '}
            <code className="rounded px-1.5 py-0.5">orientation</code> props to
            adapt the button for more complex states.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="rounded-xl border border-dashed border-gray-200 p-4">
            <h3 className="text-sm font-semibold">Loading state</h3>
            <p className="mt-1 text-xs opacity-75">
              Disable interactions and lower opacity by toggling the{' '}
              <code className="rounded px-1.5 py-0.5">loading</code> prop.
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {variants.map(variant => (
                <Button key={`loading-${variant}`} loading variant={variant}>
                  Loading…
                </Button>
              ))}
            </div>
          </div>
          <div className="rounded-xl border border-dashed border-gray-200 p-4">
            <h3 className="text-sm font-semibold">Orientation</h3>
            <p className="mt-1 text-xs opacity-75">
              Reverse the placement of icons or other children by setting{' '}
              <code className="rounded px-1.5 py-0.5">
                orientation=&quot;reverse&quot;
              </code>
              .
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {variants.map(variant => (
                <Button
                  key={`orientation-${variant}`}
                  orientation="reverse"
                  variant={variant}
                >
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
