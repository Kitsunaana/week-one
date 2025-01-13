const chars = ["!", "\"", "#", "$", "%", "&", "'", "(", ")", "*", "+", ",", "-", ".", "/", ":", ";", "<", "=", ">", "?", "@", "[", "\\", "]", "^", "_", "`", "{", "|", "}", "~"]

const getWords = (sentence: string) => sentence.split(" ")

const getCleanedWord = (word: string, cleanChars: string[]) => (
  cleanChars.reduce((result, char) => result.replaceAll(char, ""), word)
)

const sortWordsByLengthAsc = (first: string, second: string) => first.length - second.length

const getLastItem = <T,>(array: T[]) => array[array.length - 1]


// -------------------------------------------------------------------------------------
const longestWord = (sentence: string) => {
  const words = getWords(sentence)
  const sortedWords = words.sort(sortWordsByLengthAsc)
  const longestWord = getLastItem(sortedWords)

  return getCleanedWord(longestWord, chars)
}

console.log(
  longestWord(
    "Написать функцию identicalLetters,, которая принимает две строки и возвращает строку с буквами, которые встречаются в обеих строках"
  )
) // -> identicalLetters
console.log(
  longestWord(
    "Написать функцию longestWord, которая находит самое длинное слово в строке и возвращает его."
  )
) // -> longestWord