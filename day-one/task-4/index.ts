type Char = string
type Count = number

type CharCounter = [Char, Count]


// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------


const getLetterOfString = (str: string) => str.split("")

const getLastItem = <T,>(array: T[]) => array[array.length - 1]

const getLastChar = (array: CharCounter[]): Char | undefined => getLastItem(array)?.[0]

const getLastCharCount = (array: CharCounter[]): Count => getLastItem(array)[1]

const getAllItemsWithoutLast = <T,>(array: T[]) => array.slice(0, array.length - 1)


// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
const runLengthEncoding = (str: string) => {
  const lettersOfString = getLetterOfString(str)

  return lettersOfString
    .reduce<CharCounter[]>((result, char) => {
      if (char === getLastChar(result)) {
        const itemsWithoutLast = getAllItemsWithoutLast(result)
        const addCharCounter: CharCounter = [char, getLastCharCount(result) + 1]

        return itemsWithoutLast.concat([addCharCounter])
      }

      return result.concat([[char, 1]])
    }, [])
    .map((charCounter) => charCounter.join("-"))
    .join("")
}
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------


const getCleanedEncoded = (str: string) => str.replaceAll("--", "separator-")

const returnOriginalChar = (str: string) => str.replaceAll("separator", "-")

const getLettersOfEncodedString = (str: string) => str.split("-")

const getStringWithoutLastChar = (str = "") => str.split("").slice(0, str.length - 1).join("")

const getLastCharOfString = (str = "") => str[str.length - 1]

const getNextItem = <T,>(array: T[], index: number) => array[index + 1]

const isFirstIteration = (index: number) => index === 0

const isPenultimateIteration = <T,>(index: number, array: T[]) => index === array.length - 2

const isLastIteration = <T,>(index: number, array: T[]) => index === array.length - 1


// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------
const runLengthDecoding = (encoded: string) => {
  const cleanEncoded = getCleanedEncoded(encoded)
  const lettersOfEncodedString = getLettersOfEncodedString(cleanEncoded)

  return lettersOfEncodedString
    .map(returnOriginalChar)
    .reduce<CharCounter[]>((result, item, index, array) => {
      if (isFirstIteration(index)) {
        return result.concat([
          [
            item,
            Number(getStringWithoutLastChar(getNextItem(array, index)))
          ]
        ])
      }

      if (isPenultimateIteration(index, array)) {
        return result.concat([
          [
            getLastCharOfString(item),
            Number(getNextItem(array, index))
          ]
        ])
      }

      if (isLastIteration(index, array)) {
        return result
      }

      return result.concat([
        [
          getLastCharOfString(item),
          Number(getStringWithoutLastChar(getNextItem(array, index)))
        ]
      ])
    }, [])
    .map(([char, count]) => char.repeat(count))
    .join("")
}
// -------------------------------------------------------------------------------------
// -------------------------------------------------------------------------------------


const encoding = runLengthEncoding("helllo worlddddd---1111")
const decoding = runLengthDecoding(encoding)

console.log(encoding) // -> "h-1e-1l-3o-1 -1w-1o-1r-1l-1d-5--31-4" 
console.log(decoding) // -> "helllo worlddddd---1111" 

// ['h', '1e', '1l', '3o', '1 ', '1w', '1o', '1r', '1l', '1d', '5separator', '31', '4']