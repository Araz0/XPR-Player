/**
 * Returns an integer from string value
 * @param  {string} inputString The string to hash.
 * @param  {number | undefined} lengthLimit maximum length of the hash string
 * @return {number} A 32bit integer
 * @see http://werxltd.com/wp/2010/05/13/javascript-implementation-of-javas-string-hashcode-method/
 */
export function generateIntFromString(
  inputString: string,
  lengthLimit?: number
): number {
  let hash = 0
  for (let i = 0, len = inputString.length; i < len; i++) {
    const chr = inputString.charCodeAt(i)
    hash = (hash << 5) - hash + chr
    hash |= 0 // Convert to 32bit integer
  }
  const size = lengthLimit ?? inputString.length
  return parseInt(hash.toString().slice(-size))
}
