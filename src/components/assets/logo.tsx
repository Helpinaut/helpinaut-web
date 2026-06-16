import clsx from "clsx";
import { SVGProps } from "react";

type Props = SVGProps<SVGSVGElement> & {
  color?: string;
  size?: number | string;
};

export const Logo = ({ size = 48, color, className, ...props }: Props) => {
  return (
    <svg
      version="1.2"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 32 32"
      width={size}
      height={size}
      className={clsx("fill-current", className)}
      style={color ? { fill: color } : undefined}
      {...props}
    >
      <circle
        cx={16}
        cy={9}
        r={5}
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M14 9c0 1.1.9 2 2 2s2-.9 2-2h-4zM16 23v6h-5V16l-2.5 2.5c-.8.8-2.2.8-3 0h0c-.8-.8-.8-2.2 0-3l1.4-1.4C8.2 12.8 10.1 12 12 12h0M16 22v7h5V16l2.5 2.5c.8.8 2.2.8 3 0h0c.8-.8.8-2.2 0-3l-1.4-1.4C23.8 12.8 21.9 12 20 12h0"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8 13V5c0-1.1.9-2 2-2h12c1.1 0 2 .9 2 2v8M11 23h-1c-1.1 0-2-.9-2-2v-2M24 19v2c0 1.1-.9 2-2 2h-1"
        fill="none"
        stroke="currentColor"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};
