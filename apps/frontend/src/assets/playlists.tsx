import * as React from "react"
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={25}
    fill="none"
    {...props}
  >
    <path
      stroke="#949EA2"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="m5 3.219 14 9-14 9v-18Z"
    />
  </svg>
)
export default SvgComponent
