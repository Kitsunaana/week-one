const data = {
  "name1": "Alice",
  "age2": 25,
  address: "",
  phone: undefined,
  "email3": "[alice@example.com](<mailto:alice@example.com>)",
  notes: null,
  "test4": {
    "test5": "caption",
    "test6": "caption",
    "test7": "caption",
    "test8": {
      "test9": "caption",
      empty1: "",
      empty2: undefined,
      empty3: [],
      empty5: {},
    }
  },
};

const isNull = (value: unknown) => value === null
const isUndefined = (value: unknown) => value === undefined
const isEmptyString = (value: unknown) => value === ""
const isArray = (value: unknown) => Array.isArray(value)

const isObject = (value: unknown): value is object => (
  typeof value === "object" && !isNull(value) && !isArray(value)
)

const isEmptyObject = (value: object) => Object.keys(value).length === 0
const isEmptyArray = (value: unknown[]) => value.length === 0

const isEmpty = (value: unknown) => (
  isNull(value) ||
  isUndefined(value) ||
  isEmptyString(value) ||
  (isArray(value) && isEmptyArray(value)) ||
  (isObject(value) && isEmptyObject(value))
)

const incrementIfNotEmpty = (count: number, value: unknown) => (
  isEmpty(value) ? count : (count + 1)
)

const countFilledValues = (obj: object, count = 0): number => {
  return Object
    .values(obj)
    .reduce<number>((count, value) => {
      if (isObject(value)) {
        return incrementIfNotEmpty(
          count + countFilledValues(value, 0),
          value
        )
      }

      return incrementIfNotEmpty(count, value)
    }, count)
}

console.log(countFilledValues(data)) // 9