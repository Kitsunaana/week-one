const arrayFor = <T, R,>(
  array: T[],
  initial: R,
  isGood: (item: T, index: number, array: T[]) => ({ value: R, isBreak: boolean } | undefined)
) => {
  let result = initial

  for (let index = 0; index < array.length; index++) {
    const good = isGood(array[index], index, array)

    if (good && good?.isBreak) {
      result = good.value
      break
    }
  }

  return result
}

const getLettersOfString = (str: string) => str.split("")

const getWordOfArray = (array: string[]) => array.join("")

const getSubarrayByString = (array: string[], substring: string, start: number) => (
  array.slice(start, substring.length + start)
)


// -------------------------------------------------------------------------------------
const indexOf = (str: string, substring: string) => {
  const letters = getLettersOfString(str)
  const initialValue = -1

  return arrayFor(letters, initialValue, (_, index, array) => {
    const slicedArray = getSubarrayByString(array, substring, index)
    if (getWordOfArray(slicedArray) !== substring) return

    return { value: index, isBreak: true }
  })
}

console.log(indexOf("hello world", "ell")) // -> 1
console.log(indexOf("hello world", "lo w")) // -> 3
console.log(indexOf("hello world", "l")) // -> 2
console.log(indexOf("Привет мир", "hello")) // -> -1