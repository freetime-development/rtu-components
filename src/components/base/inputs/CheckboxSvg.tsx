import type { SVGProps } from 'react';
import { Ref, forwardRef } from 'react';

const Component = (props: SVGProps<SVGSVGElement>, ref: Ref<SVGSVGElement>) => (
  <svg
    width="24"
    height="24"
    fill="none"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
    ref={ref}
    className="relative opacity-0 peer-checked:opacity-100"
    {...props}
  >
    <path
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={3}
      d="M20 6 9 17l-5-5"
    />
  </svg>
);
export const CheckboxSvg = forwardRef(Component);
