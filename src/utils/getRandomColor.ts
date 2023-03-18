/**
 * small function that takes a number as input and converts it into a hex value string that can be used as color
 * @param num integer input
 * @returns hex string that looks like something like this '#ffffff'
 */
export function getRandomColor(num: number) {
  // Convert the number to a hexadecimal string
  const hexString = num.toString(16)

  // Trim the string to 6 characters or less
  const trimmedHexString = hexString.slice(-6)

  // Pad the string with zeros if it's shorter than 6 characters
  const paddedHexString = trimmedHexString.padStart(6, '0')

  // Return the color string in the format "#RRGGBB"
  return `#${paddedHexString}`
}
