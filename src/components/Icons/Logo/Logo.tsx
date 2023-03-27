import { memo } from 'react'

export const LogoRaw = () => {
  return (
    <svg viewBox="0 0 113 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clip-path="url(#clip0_14_88)">
        <path
          d="M0 0.319824V32.5898L56 64.6098V32.4698L0 0.319824Z"
          fill="#0368FF"
        />
        <path
          d="M56 64.6099V96.8899L112 128.91V96.7599L56 64.6099Z"
          fill="#0368FF"
        />
        <path
          d="M112.07 0L84 16.07L84.05 80.71L112 64.7L112.07 0Z"
          fill="#0368FF"
        />
        <path
          d="M28.07 48.6401L0 64.7201L0.05 129.36L28 113.35L28.07 48.6401Z"
          fill="#0368FF"
        />
      </g>
      <defs>
        <clipPath id="clip0_14_88">
          <rect width="113" height="130" fill="white" />
        </clipPath>
      </defs>
    </svg>
  )
}

export const Logo = memo(LogoRaw)
