// ------------------------------------------------------------------------
// ---- utils -------------------------------------------------------------
const getLast = <T,>(array: T[]) => array[array.length - 1]

const getWithoutLast = <T,>(array: T[]) => array.slice(0, array.length - 1)

const getDivisionWithFloored = (a: number, b: number) => Math.floor(a / b)
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



// ------------------------------------------------------------------------
// ---- solution ----------------------------------------------------------
type ResultDenominationCount<T extends number> = Record<T, number>

const getDenominationsCount = <T extends number,>(
  sum: number,
  denominations: T[],
  result: Partial<ResultDenominationCount<T>> = {}
): ResultDenominationCount<T> => {
  if (sum === 0) return result as Required<ResultDenominationCount<T>>

  const lastDenomination = getLast(denominations)
  const count = getDivisionWithFloored(sum, lastDenomination)

  const withoutLastDenimination = getWithoutLast(denominations)
  const difference = sum - count * lastDenomination

  return getDenominationsCount(
    sum < lastDenomination ? sum : difference,
    withoutLastDenimination,
    {
      ...result,
      [lastDenomination]: count
    }
  )
}
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------



// ------------------------------------------------------------------------
// ---- examples ----------------------------------------------------------
type IDenomination = 1 | 2 | 5 | 10 | 50 | 100
const denominations = [1, 2, 5, 10, 50, 100] as IDenomination[]

const result = getDenominationsCount(1858, denominations)

console.log(result)
// ------------------------------------------------------------------------
// ------------------------------------------------------------------------