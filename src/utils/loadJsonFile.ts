export async function loadJsonFile(url: string) {
  try {
    const response = await fetch(url)
    console.log(
      '🚀 ~ file: loadJsonFile.ts:4 ~ loadJsonFile ~ response:',
      response
    )
    const result = await response.json()
    console.log('🚀 ~ file: loadJsonFile.ts:5 ~ loadJsonFile ~ result:', result)
    return result
  } catch (error) {
    // eslint-disable-next-line no-console
    return console.error(`Error loading JSON file ${url}: ${error}`)
  }
}
