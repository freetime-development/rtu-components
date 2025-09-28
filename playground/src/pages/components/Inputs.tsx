import { useMemo, useState } from 'react';

import {
  BaseCheckbox,
  BaseFileInput,
  BaseInput,
  BaseRadio,
  BaseSelect,
  BaseTextArea,
} from '@/components/base/inputs';
import type { Option } from '@/components/types';

export const meta = {
  title: 'Inputs',
  description: 'Low-level input primitives that power the form system.',
};

const fruitOptions: Option[] = [
  { label: 'Apple', value: 'apple' },
  { label: 'Orange', value: 'orange' },
  { label: 'Banana', value: 'banana' },
];

const InputsPage = () => {
  const [fullName, setFullName] = useState('Ada Lovelace');
  const [bio, setBio] = useState('Pioneer of computing and analytical engines.');
  const [selectedFruit, setSelectedFruit] = useState<Option['value'] | null>(
    fruitOptions[1].value,
  );
  const [marketingOptIn, setMarketingOptIn] = useState(true);
  const [preferredRhythm, setPreferredRhythm] = useState<'daily' | 'weekly'>(
    'weekly',
  );
  const [files, setFiles] = useState<File[]>([]);

  const selectedFruitLabel = useMemo(() => {
    return fruitOptions.find(option => option.value === selectedFruit)?.label ??
      'Nothing selected';
  }, [selectedFruit]);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Text inputs</h2>
          <p className="mt-1 text-sm opacity-80">
            Render custom affordances on either side of the input using
            <code className="rounded px-1.5 py-0.5">renderLeft</code> and
            <code className="rounded px-1.5 py-0.5">renderRight</code>.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <BaseInput
            name="full-name"
            value={fullName}
            onChange={event => setFullName(event.target.value)}
            placeholder="Full name"
            renderLeft={(_, className) => (
              <span
                aria-hidden
                className={`${className ?? ''} icon-user text-gray-400`}
              />
            )}
            renderRight={className => (
              <span
                aria-hidden
                className={`${className ?? ''} icon-checkmark`}
              />
            )}
          />
          <BaseInput
            name="search"
            value=""
            placeholder="Search components"
            renderLeft={(_, className) => (
              <span
                aria-hidden
                className={`${className ?? ''} icon-equalizer text-gray-400`}
              />
            )}
          />
          <BaseTextArea
            name="bio"
            value={bio}
            onChange={event => setBio(event.target.value)}
            rows={4}
            placeholder="Tell us something about yourself"
          />
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Select input</h2>
          <p className="mt-1 text-sm opacity-80">
            `BaseSelect` wraps Headless UI&apos;s Combobox to provide keyboard
            navigation, loading states, and optional adornments.
          </p>
        </header>
        <div className="grid gap-4 md:grid-cols-2">
          <div className="space-y-2">
            <BaseSelect<Option>
              name="favorite-fruit"
              value={selectedFruit}
              options={fruitOptions}
              placeholder="Pick a fruit"
              onChange={value => setSelectedFruit(value)}
              clear={() => setSelectedFruit(null)}
              renderLeft={(_, className) => (
                <span
                  aria-hidden
                  className={`${className ?? ''} icon-bubbles4 text-gray-400`}
                />
              )}
            />
            <p className="text-xs opacity-70">
              Selected: <span className="font-medium">{selectedFruitLabel}</span>
            </p>
          </div>
          <div className="space-y-2 rounded-xl border border-dashed border-gray-200 p-4">
            <h3 className="text-sm font-semibold">Loading preview</h3>
            <BaseSelect<Option>
              name="loading-select"
              value={null}
              options={[]}
              placeholder="Loading…"
              isLoading
              onChange={_value => undefined}
              clear={() => undefined}
            />
            <p className="text-xs opacity-70">
              Display a skeleton state by passing <code>isLoading</code>.
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Choice inputs</h2>
          <p className="mt-1 text-sm opacity-80">
            Checkboxes and radios share sizing tokens, enabling consistent
            alignment inside forms.
          </p>
        </header>
        <div className="grid gap-6 md:grid-cols-2">
          <label className="flex items-center gap-3 text-sm">
            <BaseCheckbox
              name="marketing"
              checked={marketingOptIn}
              onChange={event => setMarketingOptIn(event.target.checked)}
            />
            Receive occasional product emails
          </label>
          <div className="space-y-2">
            <span className="text-sm font-medium">Delivery frequency</span>
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 text-sm">
                <BaseRadio
                  name="rhythm"
                  value="daily"
                  checked={preferredRhythm === 'daily'}
                  onChange={() => setPreferredRhythm('daily')}
                />
                Daily
              </label>
              <label className="flex items-center gap-2 text-sm">
                <BaseRadio
                  name="rhythm"
                  value="weekly"
                  checked={preferredRhythm === 'weekly'}
                  onChange={() => setPreferredRhythm('weekly')}
                />
                Weekly summaries
              </label>
            </div>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">File input</h2>
          <p className="mt-1 text-sm opacity-80">
            The file picker toggles between a call-to-action and inline previews once selections are made.
          </p>
        </header>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
          <BaseFileInput
            name="assets"
            value={files}
            multiple
            onSuccess={setFiles}
            className="flex h-24 w-24 items-center justify-center border border-dashed border-gray-300 bg-white"
          >
            <div className="flex flex-col items-center text-xs text-gray-500">
              <span className="icon-arrow-up2" aria-hidden />
              <span>Upload</span>
            </div>
          </BaseFileInput>
          <p className="text-xs opacity-70">
            {files.length ? `${files.length} file(s) selected.` : 'No files chosen yet.'}
          </p>
        </div>
      </section>
    </div>
  );
};

export default InputsPage;
