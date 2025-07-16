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
      stroke="#fff"
      strokeWidth={2}
      d="m17 12.967-5 5.007-5-5.007m5-6.007v10.012V6.96Zm0-5.007c6.075 0 11 4.932 11 11.014 0 6.083-4.925 11.014-11 11.014S1 19.05 1 12.967C1 6.885 5.925 1.953 12 1.953Z"
    />
  </svg>
)
export default SvgComponent
