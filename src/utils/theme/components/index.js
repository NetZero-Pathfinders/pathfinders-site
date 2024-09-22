import { theme as defaultTheme } from "@chakra-ui/theme"

import buttonTheme from "./button"
import containerTheme from "./container"
import headingTheme from "./heading"
import linkTheme from "./link"
import textTheme from "./text"
import sectorCardTheme from "./sectorCard"
import dividerTheme from "./divider"
import inputTheme from "./input"
import checkboxTheme from "./checkbox"

export default {
  ...defaultTheme.components,
  Button: buttonTheme,
  Container: containerTheme,
  Heading: headingTheme,
  Link: linkTheme,
  Text: textTheme,
  SectorCard: sectorCardTheme,
  Divider: dividerTheme,
  Input: inputTheme,
  Checkbox: checkboxTheme,
}
