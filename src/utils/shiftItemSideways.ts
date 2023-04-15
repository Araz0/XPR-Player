export function shiftItemRightByIndex(arr: Array<any>, index: number) {
  if (index === arr.length - 1) {
    // If the element is already at the end of the array, don't do anything
    return arr
  }

  // Remove the element from its current position
  const [removed] = arr.splice(index, 1)

  // Insert the element at the new position
  arr.splice(index + 1, 0, removed)

  return arr
}

export function shiftItemLeftByIndex(arr: Array<any>, index: number) {
  if (index === 0) {
    // If the element is already at the beginning of the array, don't do anything
    return arr
  }

  // Remove the element from its current position
  const [removed] = arr.splice(index, 1)

  // Insert the element at the new position
  arr.splice(index - 1, 0, removed)

  return arr
}
