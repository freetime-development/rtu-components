import { Link } from 'react-router-dom';

export const meta = {
  title: 'Overview',
  description: 'Start here to learn how to use the RTU component playground.',
  order: -100,
};

const OverviewPage = () => {
  return (
    <div className="mx-auto flex max-w-4xl flex-col gap-8">
      <header className="space-y-4">
        <h2 className="text-3xl font-semibold tracking-tight">Welcome 👋</h2>
        <p className="text-base opacity-80">
          This playground is a lightweight Vite application that mirrors the RTU component library. Each page in the
          navigation showcases a real component implementation so you can explore the building blocks in isolation.
        </p>
      </header>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Getting started</h3>
        <ol className="list-decimal space-y-2 pl-6 text-base opacity-80">
          <li>Install dependencies with <code className="rounded px-1.5 py-0.5">pnpm install</code>.</li>
          <li>
            In one terminal tab run{' '}
            <code className="rounded px-1.5 py-0.5">pnpm build-css:watch</code> to keep Tailwind styles in sync.
          </li>
          <li>
            Launch the playground with{' '}
            <code className="rounded px-1.5 py-0.5">pnpm playground</code> and open the URL printed in the
            terminal.
          </li>
        </ol>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Create a new demo</h3>
        <p className="text-base opacity-80">
          Add a file inside <code className="rounded px-1.5 py-0.5">playground/src/pages</code> and export a
          React component. The router will generate a route automatically based on the file name, so placing a file at
          <code className="rounded px-1.5 py-0.5">components/Card.tsx</code> will appear at{' '}
          <code className="rounded px-1.5 py-0.5">/components/card</code>.
        </p>
        <p className="text-base opacity-80">
          Provide optional metadata by exporting a <code className="rounded px-1.5 py-0.5">meta</code> object
          alongside your component to customise the navigation title or ordering.
        </p>
      </section>

      <section className="space-y-4">
        <h3 className="text-xl font-semibold">Need inspiration?</h3>
        <p className="text-base opacity-80">
          Jump into any of the ready-made demos below to explore common UI building blocks:
        </p>
        <ul className="grid gap-2 sm:grid-cols-2">
          <li>
            <Link className="font-semibold underline" to="/components/button">
              Buttons & tabs
            </Link>
          </li>
          <li>
            <Link className="font-semibold underline" to="/components/inputs">
              Input primitives
            </Link>
          </li>
          <li>
            <Link className="font-semibold underline" to="/components/fields">
              Form field wrappers
            </Link>
          </li>
          <li>
            <Link className="font-semibold underline" to="/components/layout">
              Layout helpers
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
};

export default OverviewPage;
