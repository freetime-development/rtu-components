import { Header, typographyVariants } from '@/components/base/typography/Header';

export const meta = {
  title: 'Typography',
  description: 'Semantic heading styles that align with the RTU design system.',
};

const headingVariants = ['h1', 'h2', 'h3', 'h4', 'h5'] as const;

type HeadingVariant = (typeof headingVariants)[number];

const TypographyPage = () => {
  return (
    <div className="space-y-10">
      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Heading scale</h2>
          <p className="mt-1 text-sm opacity-80">
            Use the `variant` prop to render the appropriate semantic heading tag while applying consistent styling.
          </p>
        </header>
        <div className="space-y-3">
          {headingVariants.map(variant => {
            const classes = typographyVariants({ variant });
            return (
              <div key={variant} className="space-y-1">
                <Header variant={variant as HeadingVariant}>
                  {variant.toUpperCase()} — Product growth report
                </Header>
                <p className="text-sm opacity-70">
                  Class names:&nbsp;
                  <code className="rounded px-1.5 py-0.5">{classes}</code>
                </p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-4">
        <header>
          <h2 className="text-2xl font-semibold">Composable content</h2>
          <p className="mt-1 text-sm opacity-80">
            Because the component forwards refs and props, you can layer additional utilities like gradients or motion.
          </p>
        </header>
        <Header
          variant="h2"
          className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
        >
          Beautiful typography with utility hooks
        </Header>
      </section>
    </div>
  );
};

export default TypographyPage;
