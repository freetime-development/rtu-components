import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const Component = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <div className="absolute top-0 left-0 pointer-events-none">
    <svg
      width="24"
      height="24"
      fill="none"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      ref={ref}
      {...props}
    >
      <path
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M20 6 9 17l-5-5"
      />
    </svg>
  </div>
);
export const CheckboxSvg = forwardRef(Component);
