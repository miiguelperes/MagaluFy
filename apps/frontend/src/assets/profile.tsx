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
      d="M20 21.25v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2M12 11.25a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z"
    />
  </svg>
)
export default SvgComponent
