const getLongString = (first: string, second: string) => (
  first.length > second.length ? first : second
)

const getShortString = (first: string, second: string) => (
  first.length > second.length ? second : first
)

const getLettersOfString = (str: string) => str.split("")

const addCharExistInTwoStrings = (letters: string[]) => (
  (result: string, char: string) => (
    letters.includes(char) ? (result += char) : result
  )
)

const getResultIdenticalLetters = (
  letters: string[],
  callback: (result: string, char: string) => string
) => (
  letters.reduce(callback, "")
)


// -------------------------------------------------------------------------------------
const identicalLetters = (first: string, second: string) => {
  const longString = getLongString(first, second)
  const shortString = getShortString(first, second)

  const lettersOfLongString = getLettersOfString(longString)
  const lettersOfShortString = getLettersOfString(shortString)

  return lettersOfLongString.reduce(addCharExistInTwoStrings(lettersOfShortString), "")
}

console.log(identicalLetters("abc", "bcd")) // -> bc
console.log(identicalLetters("hello world", "bcd")) // -> d
console.log(identicalLetters("hello world", "helloworld")) // -> helloworld 