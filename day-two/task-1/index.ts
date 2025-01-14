const data = {
  name: "Alice",
  age: 25,
  address: "",
  phone: undefined,
  email: "[alice@example.com](<mailto:alice@example.com>)",
  notes: null,
};

const isNull = (value: unknown) => value === null
const isUndefined = (value: unknown) => value === undefined
const isEmptyString = (value: unknown) => value === ""

const isEmpty = (value: unknown) => (
  isNull(value) || isUndefined(value) || isEmptyString(value)
)

const incrementIfNotEmpty = (count: number, value: unknown) => (
  isEmpty(value) ? count : (count + 1)
)

const countFilledValues = (obj: Record<string, unknown>) => {
  return Object
    .values(obj)
    .reduce<number>(incrementIfNotEmpty, 0)
}

console.log(countFilledValues(data)) // 3