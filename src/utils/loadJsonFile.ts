export async function loadJsonFile(url: string) {
  try {
    const response = await fetch(url)
    const result = await response.json()
    return result
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(`Error loading JSON file ${url}: ${error}`)
  }
}
