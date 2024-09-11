import { Box } from "@chakra-ui/layout"

export function Icon({
  size = "1.25rem",
  viewBox = "0 0 24 24",
  stroke = "currentcolor",
  strokeWidth = 2,
  strokeLinecap = "butt",
  strokeLinejoin = "bevel",
  children,
  isAnimated,
  className,
  ...restProps
}) {
  const size2 = [size].flat()
  const strokeWidth2 = [strokeWidth].flat()
  const fontSize = strokeWidth2.map((d) => (d ? d * 0.0625 + "rem" : d))
  return (
    <Box
      xmlns="http://www.w3.org/2000/svg"
      as="svg"
      w={size2}
      h={size2}
      fontSize={fontSize}
      aria-hidden="true"
      focusable="false"
      viewBox={viewBox}
      stroke={stroke}
      strokeWidth="1em"
      strokeLinecap={strokeLinecap}
      strokeLinejoin={strokeLinejoin}
      fill="none"
      sx={{
        "circle, path, rect, text, line": {
          vectorEffect: "non-scaling-stroke",
        },
      }}
      className={`${className}${
        isAnimated ? ` is-animated-${isAnimated}` : ""
      }`}
      {...restProps}
    >
      {children}
    </Box>
  )
}

export const UploadIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 0 0 2-2v-4M17 8l-5-5-5 5M12 4.2v10.3" />
  </Icon>
)

export const QuestionIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" />
    <path strokeWidth="1.25em" d="M12 17h.008" />
  </Icon>
)

export const ChevronLeftIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M15 18l-6-6 6-6" />
  </Icon>
)

export const ChevronRightIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M9 18l6-6-6-6" />
  </Icon>
)

export const ChevronDownIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M6 9l6 6 6-6" />
  </Icon>
)

export const ChevronUpIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M18 15l-6-6-6 6" />
  </Icon>
)

export const ArrowRightIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M5 12h13m-6-7l7 7-7 7" />
  </Icon>
)

export const ArrowLeftIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M19 12H6M12 5l-7 7 7 7" />
  </Icon>
)

export const DownloadIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M3 15v4c0 1.1.9 2 2 2h14a2 2 0 002-2v-4m-4-6l-5 5-5-5m5 3.8V2.5" />
  </Icon>
)
export const ShareIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <circle cx="18" cy="5" r="3" />
    <circle cx="6" cy="12" r="3" />
    <circle cx="18" cy="19" r="3" />
    <path d="M8.59 13.51L15.42 17.49" />
    <path d="M15.41 6.51L8.59 10.49" />
  </Icon>
)

export const TwitterIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps} fill="currentcolor" stroke="none">
    <path d="M13.477 10.618L20.03 3h-1.553l-5.69 6.614L8.242 3H3l6.873 10.002L3 20.991h1.553l6.01-6.985 4.799 6.985h5.242l-7.128-10.373zM11.35 13.09l-.697-.996-5.54-7.925h2.385l4.471 6.396.697.996 5.812 8.314h-2.385L11.35 13.09z" />
  </Icon>
)

export const InstagramIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps} fill="currentcolor" stroke="none">
    <path d="M16.15 2.003a5.748 5.748 0 014.231 1.65 5.782 5.782 0 011.616 4.198v8.298c0 1.732-.566 3.224-1.65 4.273a5.948 5.948 0 01-4.231 1.575h-8.23a5.881 5.881 0 01-4.191-1.575 5.799 5.799 0 01-1.691-4.307V7.851c0-3.515 2.332-5.848 5.848-5.848h8.297zm.04 1.858H7.886c-1.208 0-2.25.358-2.94 1.041a4.015 4.015 0 00-1.083 2.95v8.263c0 1.25.358 2.25 1.082 2.983a4.165 4.165 0 002.941 1.041h8.23a4.165 4.165 0 002.941-1.041 3.938 3.938 0 001.167-2.95V7.852a4.165 4.165 0 00-1.083-2.907 4.015 4.015 0 00-2.95-1.083zM12 6.801c2.825 0 5.165 2.333 5.165 5.166a5.165 5.165 0 11-5.164-5.165zm0 1.85a3.324 3.324 0 00-3.307 3.307 3.324 3.324 0 003.308 3.308 3.323 3.323 0 003.307-3.308A3.324 3.324 0 0012 8.651zm5.365-3.14a1.166 1.166 0 110 2.332 1.166 1.166 0 010-2.332z" />
  </Icon>
)

export const LinkedinIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps} fill="currentcolor" stroke="none">
    <path d="M6.655 8.434H2.64a.323.323 0 00-.322.323v12.898c0 .179.144.323.322.323h4.015a.322.322 0 00.323-.323V8.757a.323.323 0 00-.323-.323zM4.65 2.022A2.651 2.651 0 002 4.669a2.651 2.651 0 002.65 2.647A2.65 2.65 0 007.296 4.67a2.65 2.65 0 00-2.648-2.647zM16.868 8.114c-1.612 0-2.805.693-3.528 1.48v-.837a.323.323 0 00-.322-.323H9.173a.323.323 0 00-.323.323v12.898c0 .179.144.323.323.323h4.006a.322.322 0 00.322-.323v-6.381c0-2.151.585-2.989 2.084-2.989 1.632 0 1.762 1.343 1.762 3.1v6.27c0 .179.144.323.323.323h4.007a.323.323 0 00.323-.323V14.58c0-3.197-.61-6.466-5.132-6.466z" />
  </Icon>
)

export const FiltersIcon = ({ viewBox = "0 0 24 24", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M4 21L4 14" />
    <path d="M4 10L4 3" />
    <path d="M12 21L12 12" />
    <path d="M12 8L12 3" />
    <path d="M20 21L20 16" />
    <path d="M20 12L20 3" />
    <path d="M1 14L7 14" />
    <path d="M9 8L15 8" />
    <path d="M17 16L23 16" />
  </Icon>
)

export const PowerandGridsandBuildingsIconRaw = () => (
  <>
    <path d="M8.308 28.308l2.077-20.77h6.923l2.077 20.77" />
    <path d="M6.027 3.385h15.638L2.77 22.769h22.154L6.027 3.385z" />
    <path d="M2.77 16.538L13.845 3.385l11.077 13.153H2.77zM9 22.77l4.846-6.232 4.846 6.231H9z" />
    <path d="M24.615 12.23h13.847M15.384 27.615v9.231M37.23 13.461V37M13.692 37h24.923M23.385 37v-6.23h5.538V37M26.154 24.538v2.077M30.308 19.692v2.077M30.308 24.538v2.077M34.462 14.846v2.077M34.462 19.692v2.077M34.462 24.538v2.077" />
  </>
)

export const PowerandGridsandBuildingsIcon = ({
  viewBox = "0 0 40 40",
  ...restProps
}) => (
  <Icon viewBox={viewBox} {...restProps}>
    <PowerandGridsandBuildingsIconRaw />
  </Icon>
)

export const PowerandBuildingsIconRaw = () => (
  <>
    <path d="M12 38l3-30h10l3 30" />
    <path d="M8.706 2h22.588L4 30h32L8.706 2z" />
    <path d="M4 21L20 2l16 19H4zM13 30l7-9 7 9H13z" />
  </>
)

export const PowerandBuildingsIcon = ({
  viewBox = "0 0 40 40",
  ...restProps
}) => (
  <Icon viewBox={viewBox} {...restProps}>
    <PowerandBuildingsIconRaw />
  </Icon>
)

export const MaterialsandIndustryIconRaw = () => (
  <>
    <path d="M21.5 4H19v31.5h2.5V4z" />
    <path d="M34 11L21.5 4H19l-8 3M29 13.5v6M32 13.5v6" />
    <path d="M33 19.5h-5V22h5v-2.5zM35.5 25h-10v6.5h10V25z" />
    <path d="M27.5 27.5V29M29.5 27.5V29M31.5 27.5V29M33.5 27.5V29" />
    <path d="M11 11V7H6v4M30.5 22v3M11 35.5v-22H8.5v22H11zM11 13.5L19 25M11 25h8M11 27.5h8M4.5 35.5h31M21.5 11H36v2.5H21.5M19 11H4v2.5h15" />
  </>
)

export const MaterialsandIndustryIcon = ({
  viewBox = "0 0 40 40",
  ...restProps
}) => (
  <Icon viewBox={viewBox} {...restProps}>
    <MaterialsandIndustryIconRaw />
  </Icon>
)

export const TransportIconRaw = () => (
  <>
    <circle cx="14" cy="23" r="2" />
    <circle cx="26" cy="23" r="2" />
    <path d="M14.5 8a3.5 3.5 0 00-3.5 3.5V18h18v-6.5A3.5 3.5 0 0025.5 8h-11z" />
    <path d="M32 11.5A6.5 6.5 0 0025.5 5h-11A6.5 6.5 0 008 11.5V28h24V11.5z" />
    <path d="M27 31l5 7M13 31l-5 7M15 2h10" />
  </>
)

export const TransportIcon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <TransportIconRaw />
  </Icon>
)

export const AgricultureIconRaw = () => (
  <>
    <path d="M13 38V2M10.5 4.75v7.167l2.5 1.25 2.5-1.25V4.75" />
    <path d="M8 10.667l5 2.5 5-2.5M8 15.667l5 2.5 5-2.5M8 20.667l5 2.5 5-2.5M8 25.667l5 2.5 5-2.5" />
    <path d="M18 7v20.333a5 5 0 01-10 0V7.5" />
    <path d="M27 38V2M24.5 4.75v7.167l2.5 1.25 2.5-1.25V4.75" />
    <path d="M22 10.667l5 2.5 5-2.5M22 15.667l5 2.5 5-2.5M22 20.667l5 2.5 5-2.5M22 25.667l5 2.5 5-2.5" />
    <path d="M32 7v20.333a5 5 0 01-10 0V7.5" />
  </>
)

export const AgricultureIcon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <AgricultureIconRaw />
  </Icon>
)

const BuildingsIconRaw = () => (
  <path d="M2 2h36M4 4v34M36 4v34M2 38h36M16 38v-9h8v9M8 6v3M8 13v3M8 20v3M14 6v3M14 13v3M14 20v3M20 6v3M20 13v3M20 20v3M26 6v3M26 13v3M26 20v3M32 6v3M32 13v3M32 20v3" />
)

export const BuildingsIcon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <BuildingsIconRaw />
  </Icon>
)

export const FinancialsIcon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M17.5 22.5h-15V30h15v-7.5z" />
    <circle cx="10" cy="26.25" r="2" />
    <path d="M4.5 26.25H6M14 26.25h1.5" />
    <path d="M24 13h3v4.5h-3V13zM29 9h3v8.5h-3V9zM34 6h3v11.5h-3V6z" />
    <path d="M2 20c0-9.941 8.059-18 18-18 3.7 0 7.14 1.117 10 3.031M5.1 10H26M2 20h36M20 30h14.9" />
    <path d="M20 38V2" />
    <path d="M38 20c0 9.941-8.059 18-18 18a17.94 17.94 0 01-12.5-5.048" />
    <path d="M30 20c0 9.941-4.477 18-10 18-2.684 0-5.12-1.903-6.917-5M10 20c0-9.941 4.477-18 10-18 2.684 0 5.12 1.903 6.917 5" />
  </Icon>
)

export const CivilsocietyIcon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M28.333 35.833v-7.916a7.927 7.927 0 00-4.755-7.267 5.398 5.398 0 002.255-4.4 5.417 5.417 0 10-8.571 4.404 7.928 7.928 0 00-4.762 7.263v7.916" />
    <path d="M19.167 9.583a5.417 5.417 0 10-8.572 4.404 7.928 7.928 0 00-4.762 7.263v7.917M21.667 9.583a5.417 5.417 0 0110.833 0 5.397 5.397 0 01-2.255 4.4A7.928 7.928 0 0135 21.25v7.917" />
  </Icon>
)

export const CompaniesIcon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M24.5 2H2v36h22.5V2zM32 5h-7.5v5H32V5zM38 10H24.5v28H38V10z" />
    <path d="M29 14v4M29 21.5v4M29 29v4M20 29v4M20 21.5v4M20 14v4M20 6.5v4M6.5 29v4M6.5 21.5v4M6.5 14v4M6.5 6.5v4M11 21.5v4M11 14v4M11 6.5v4M15.5 21.5v4M15.5 14v4M15.5 6.5v4M33.5 14v4M33.5 21.5v4M33.5 29v4" />
    <path d="M15.5 38v-9H11v9" />
  </Icon>
)

export const ConsumersIcon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M26.126 38v-3.836a6.205 6.205 0 00-3.718-5.688 4.226 4.226 0 001.764-3.444 4.237 4.237 0 00-4.235-4.24 4.237 4.237 0 00-4.235 4.24c0 1.42.698 2.678 1.768 3.447a6.206 6.206 0 00-3.722 5.685V38m10.524-27.055a6.19 6.19 0 00-1.864-1.261 4.226 4.226 0 001.764-3.444A4.237 4.237 0 0019.937 2a4.237 4.237 0 00-4.235 4.24c0 1.42.698 2.677 1.768 3.446a6.209 6.209 0 00-1.863 1.26m2.567 7.105a4.237 4.237 0 00-4.235-4.24 4.237 4.237 0 00-4.235 4.24c0 1.42.698 2.677 1.769 3.447a6.206 6.206 0 00-3.723 5.684v4.52m4.674-20.182a4.237 4.237 0 00-4.235-4.24 4.237 4.237 0 00-4.235 4.24c0 1.42.698 2.678 1.769 3.447A6.206 6.206 0 002 20.652v4.52m19.75-7.121a4.237 4.237 0 014.235-4.24 4.237 4.237 0 014.235 4.24c0 1.42-.693 2.675-1.764 3.444a6.205 6.205 0 013.718 5.688v4.52M27.5 11.52a4.237 4.237 0 014.235-4.24 4.237 4.237 0 014.234 4.24c0 1.42-.692 2.675-1.763 3.444a6.205 6.205 0 013.718 5.688v4.52" />
  </Icon>
)

export const PolicymakersIcon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M20 9V5m0 0V2h4v3h-4zM9 23h22v15H9V23zM31 25h7v13h-7V25zM2 25h7v13H2V25zM13 16.5h14" />
    <path d="M27.5 21v-3.933C27.5 12.612 24.142 9 20 9c-4.142 0-7.5 3.612-7.5 8.067V21M16 19v1.5M15 27.5V31M5.5 27.5V31M15 34v4M5.5 34v4M24 19v1.5M25 27.5V31M34.5 27.5V31M25 34v4M34.5 34v4M20 19v1.5M20 27.5V31M20 34v4" />
  </Icon>
)

export const Pillar1Icon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <g>
      <path d="M20 4H27.5V6H20z" />
      <path d="M13.143 14c2.522-3.054 6.337-5 10.607-5 7.594 0 13.75 6.156 13.75 13.75S31.344 36.5 23.75 36.5c-4.27 0-8.085-1.946-10.607-5M24 22.5l8.5-5M5 16.5h12.5M2.5 22.5H15M5 28.5h12.5M23.75 6.5v2" />
    </g>
  </Icon>
)

export const Pillar2Icon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <g>
      <path d="M28.4 19.625c-1.41 1.669-2.708 3.714-2.708 6.053V31.5H14.308v-5.822c0-2.34-1.299-4.384-2.708-6.053a10.977 10.977 0 01-2.6-7.11C9 6.43 13.925 1.5 20 1.5s11 4.93 11 11.014c0 2.711-.978 5.192-2.6 7.111zM15 34h10m-10 2.5h10M16.5 39h7" />
      <circle cx="20" cy="13" r="3" />
      <path d="M16.82 7.667l.2.067.189-.098c.31-.161.634-.297.972-.403l.202-.064.095-.19.719-1.437a7.59 7.59 0 011.606 0l.719 1.438.095.19.202.063c.338.106.663.242.972.403l.188.098.202-.067 1.524-.508c.418.337.799.718 1.136 1.136l-.508 1.524-.067.202.098.188c.162.31.297.634.403.972l.064.203.19.094 1.436.719a7.58 7.58 0 010 1.606l-1.437.719-.19.095-.063.202a6 6 0 01-.403.972l-.098.188.067.202.508 1.524a7.55 7.55 0 01-1.136 1.136l-1.524-.508-.202-.067-.188.098c-.31.162-.634.297-.972.403l-.202.064-.095.19-.719 1.436a7.579 7.579 0 01-1.606 0l-.719-1.437-.095-.19-.202-.063a6.012 6.012 0 01-.972-.403l-.188-.098-.201.067-1.525.508a7.55 7.55 0 01-1.136-1.136l.508-1.524.067-.202-.098-.188a5.996 5.996 0 01-.403-.972l-.064-.202-.19-.095-1.436-.719a7.582 7.582 0 010-1.606l1.437-.719.19-.095.063-.202a6 6 0 01.403-.972l.098-.188-.067-.201-.508-1.525c.337-.418.718-.799 1.136-1.136l1.524.508z" />
    </g>
  </Icon>
)

export const Pillar3Icon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <g>
      <path d="M39 20c0 10.493-8.507 19-19 19-6.398 0-11.557-2.653-15-7.5M1 20C1 9.507 9.507 1 20 1c6.394 0 11.556 2.658 15 7.5" />
      <path d="M35.494 4v5H31M9 30.991H4.5V35.5M15.466 11.289l-2.667-.89a12.073 12.073 0 00-2.4 2.4l.89 2.667a9.76 9.76 0 00-.655 1.58l-2.515 1.258a12.101 12.101 0 000 3.392l2.515 1.258c.173.549.393 1.077.655 1.58l-.89 2.667a12.07 12.07 0 002.4 2.4l2.667-.89a9.761 9.761 0 001.58.655l1.258 2.515a12.1 12.1 0 003.392 0l1.257-2.515a9.759 9.759 0 001.58-.655l2.668.89a12.073 12.073 0 002.4-2.4l-.89-2.667a9.755 9.755 0 00.655-1.58l2.515-1.258a12.1 12.1 0 000-3.392l-2.515-1.257a9.756 9.756 0 00-.655-1.58l.89-2.668a12.073 12.073 0 00-2.4-2.4l-2.667.89a9.758 9.758 0 00-1.58-.655l-1.258-2.515a12.103 12.103 0 00-3.392 0l-1.257 2.515a9.76 9.76 0 00-1.58.655zM20 15v2M20 23v2" />
      <path d="M17 23h4.5a1.5 1.5 0 000-3h-3a1.5 1.5 0 010-3H23" />
    </g>
  </Icon>
)

export const Pillar4Icon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <g>
      <path d="M1 35H39V39H1z" />
      <path d="M3 31H37V35H3z" />
      <path d="M6.5 27H13.5V31H6.5z" />
      <path d="M16.5 27H23.5V31H16.5z" />
      <path d="M16.5 16H23.5V20H16.5z" />
      <path d="M26.5 16H33.5V20H26.5z" />
      <path d="M6.5 16H13.5V20H6.5z" />
      <path d="M7.5 20H12.5V27H7.5z" />
      <path d="M17.5 20H22.5V27H17.5z" />
      <path d="M27.5 20H32.5V27H27.5z" />
      <path d="M26.5 27H33.5V31H26.5z" />
      <circle cx="20" cy="10" r="3" />
      <path d="M2.363 15.875L20 1.643l17.637 14.232H2.363z" />
    </g>
  </Icon>
)

export const FinanceIcon = ({ viewBox = "0 0 40 40", ...restProps }) => (
  <Icon viewBox={viewBox} {...restProps}>
    <path d="M17.5 22.5h-15V30h15v-7.5z" />
    <circle cx="10" cy="26.25" r="2" />
    <path d="M4.5 26.25H6M14 26.25h1.5" />
    <path d="M24 13h3v4.5h-3V13zM29 9h3v8.5h-3V9zM34 6h3v11.5h-3V6z" />
    <path d="M2 20c0-9.941 8.059-18 18-18 3.7 0 7.14 1.117 10 3.031M5.1 10H26M2 20h36M20 30h14.9" />
    <path d="M20 38V2" />
    <path d="M38 20c0 9.941-8.059 18-18 18a17.94 17.94 0 01-12.5-5.048" />
    <path d="M30 20c0 9.941-4.477 18-10 18-2.684 0-5.12-1.903-6.917-5M10 20c0-9.941 4.477-18 10-18 2.684 0 5.12 1.903 6.917 5" />
  </Icon>
)

export const pillarIcons = {
  Pillar1Icon,
  Pillar2Icon,
  Pillar3Icon,
  Pillar4Icon,
}

export const sectorIcons = {
  PowerandGridsandBuildingsIconRaw,
  PowerandgridsandBuildingsIconRaw: PowerandGridsandBuildingsIconRaw,
  PowerandgridsIconRaw: PowerandBuildingsIconRaw,
  PowerandGridsIconRaw: PowerandBuildingsIconRaw,
  IndustryandMaterialsIconRaw: MaterialsandIndustryIconRaw,
  TransportIconRaw,
  BuildingsIconRaw,
  AgricultureIconRaw,
  PowerandgridsIcon: PowerandBuildingsIcon,
  PowerandGridsIcon: PowerandBuildingsIcon,
  PowerandGridsandBuildingsIcon,
  PowerandgridsandBuildingsIcon: PowerandGridsandBuildingsIcon,
  IndustryandMaterialsIcon: MaterialsandIndustryIcon,
  TransportIcon,
  BuildingsIcon: BuildingsIcon,
  AgricultureIcon,
  CivilsocietyIcon: ConsumersIcon,
  CompaniesIcon,
  ConsumersIcon,
  PolicymakersIcon,
  FinancialsIcon,
  FinanceIcon: FinancialsIcon,
}

export const SearchIcon = ({ viewBox = "0 0 24 24", ...restProps }) => {
  return (
    <Icon viewBox={viewBox} {...restProps}>
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </Icon>
  )
}

export const CloseIcon = ({ viewBox = "0 0 24 24", ...restProps }) => {
  return (
    <Icon viewBox={viewBox} {...restProps}>
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </Icon>
  )
}

export const MenuIcon = ({ viewBox = "0 0 24 24", ...restProps }) => {
  return (
    <Icon viewBox={viewBox} {...restProps}>
      <line x1={2} x2={22} y1={8} y2={8} />
      {/* <line x1={4} x2={20} y1={12} y2={12} /> */}
      <line x1={2} x2={22} y1={16} y2={16} />
    </Icon>
  )
}
