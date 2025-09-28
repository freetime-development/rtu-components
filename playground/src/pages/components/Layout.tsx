import { Box, CenteredMaxwContainer, Divider } from '@/components/base/layout';

export const meta = {
  title: 'Layout primitives',
  description: 'Utility containers for grouping content and managing page width.',
};

const LayoutPage = () => {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Box</h2>
          <p className="mt-1 text-sm opacity-80">
            `Box` applies a soft background and shadow, perfect for cards or panels.
          </p>
        </header>
        <Box className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
          <h3 className="text-lg font-semibold">Weekly report</h3>
          <p className="text-sm opacity-70">
            Wrap arbitrary content in a styled container. Combine with other utilities like `Divider` to add structure.
          </p>
          <Divider />
          <ul className="space-y-2 text-sm">
            <li>✓ Ship new onboarding flow</li>
            <li>✓ Close accessibility audit</li>
            <li>• Plan Q4 roadmap workshops</li>
          </ul>
        </Box>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Centered container</h2>
          <p className="mt-1 text-sm opacity-80">
            Constrain page width responsively without writing media queries by using `CenteredMaxwContainer`.
          </p>
        </header>
        <div className="rounded-2xl border border-dashed border-gray-200 p-6">
          <CenteredMaxwContainer className="space-y-4 text-sm">
            <p>
              Resize the viewport to see the container clamp at different breakpoints. The helper keeps content readable
              on wide screens while still centering everything automatically.
            </p>
            <p>
              Combine it with CSS grid or flex layouts inside to create balanced page sections and marketing hero bands.
            </p>
          </CenteredMaxwContainer>
        </div>
      </section>
    </div>
  );
};

export default LayoutPage;
