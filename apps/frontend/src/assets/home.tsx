import * as React from "react"
const SvgComponent = (props: React.SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={24}
    height={27}
    fill="none"
    {...props}
  >
    <g fill="#949EA2" clipPath="url(#a)">
      <path d="M12 15.34c-.796 0-1.559.343-2.121.953A3.4 3.4 0 0 0 9 18.594v7.621h6v-7.62a3.4 3.4 0 0 0-.879-2.302A2.886 2.886 0 0 0 12 15.34Z" />
      <path d="M13.338 1.058A1.915 1.915 0 0 0 12 .501c-.494 0-.97.199-1.338.557L0 11.468v11.28c0 .92.337 1.803.937 2.454.6.651 1.414 1.017 2.263 1.017H7v-7.624c0-1.439.527-2.818 1.464-3.835.938-1.017 2.21-1.589 3.536-1.589s2.598.572 3.536 1.589C16.473 15.777 17 17.156 17 18.595v7.62h3.8c.849 0 1.663-.365 2.263-1.016.6-.65.937-1.534.937-2.454V11.464L13.338 1.058Z" />
    </g>
    <defs>
      <clipPath id="a">
        <path fill="#fff" d="M0 .155h24v26.033H0z" />
      </clipPath>
    </defs>
  </svg>
)
export default SvgComponent
