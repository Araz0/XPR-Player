/**
 * stringify the object and creates a Blob and embeds it to an a tag and then automaticly clicks it to simulate a download
 * @param object any object that is formated as a JSON
 * @param fileName this value will be the name of the file that is downloaded
 */
export function downloadJson(object: any, fileName: string) {
  const json = JSON.stringify(object, null, 2)
  const blob = new Blob([json], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `${fileName}.json`
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
