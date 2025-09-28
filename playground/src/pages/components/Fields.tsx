import { useMemo, useState } from 'react';

import {
  BaseCheckboxField,
  BaseInputField,
  BaseSelectField,
} from '@/components/base/fields';
import type { Option } from '@/components/types';

export const meta = {
  title: 'Field wrappers',
  description: 'Higher-level field components provide labels, hints, and error messaging.',
};

const statusOptions: Option[] = [
  { label: 'Active', value: 'active' },
  { label: 'Paused', value: 'paused' },
  { label: 'Archived', value: 'archived' },
];

const FieldsPage = () => {
  const [projectName, setProjectName] = useState('Platform redesign');
  const [status, setStatus] = useState<Option['value'] | null>(statusOptions[0].value);
  const [optedIn, setOptedIn] = useState(false);

  const statusLabel = useMemo(() => {
    return statusOptions.find(option => option.value === status)?.label ?? 'Unknown';
  }, [status]);

  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Text field</h2>
          <p className="mt-1 text-sm opacity-80">
            `BaseInputField` composes a label, hint, and validation messaging around the primitive input.
          </p>
        </header>
        <BaseInputField
          name="project-name"
          label="Project name"
          value={projectName}
          onChange={event => setProjectName(event.target.value)}
          hint="This will appear in dashboards and notifications."
          tooltip="Used internally across the product."
        />
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Select field</h2>
          <p className="mt-1 text-sm opacity-80">
            Errors are passed as strings and automatically toggle the underlying select&apos;s error state.
          </p>
        </header>
        <div className="space-y-2">
          <BaseSelectField<Option>
            name="status"
            label="Status"
            value={status}
            options={statusOptions}
            placeholder="Choose a status"
            onChange={value => setStatus(value)}
            clear={() => setStatus(null)}
            error={status ? undefined : 'Status is required'}
          />
          <p className="text-xs opacity-70">
            Selected: <span className="font-medium">{statusLabel}</span>
          </p>
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Checkbox field</h2>
          <p className="mt-1 text-sm opacity-80">
            Field helpers keep labels aligned with their controls, even for inline elements like checkboxes.
          </p>
        </header>
        <BaseCheckboxField
          name="opt-in"
          label="Notify team members"
          checked={optedIn}
          onChange={event => setOptedIn(event.target.checked)}
          hint="We will send a weekly summary email."
        />
      </section>
    </div>
  );
};

export default FieldsPage;
