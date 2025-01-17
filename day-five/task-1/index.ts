type IVariant = "stone" | "scissors" | "paper" | "lizard" | "spock"

const labelVariants: Record<IVariant, string> = {
  stone: "Камень",
  scissors: "Ножницы",
  paper: "Бумага",
  lizard: "Ящерица",
  spock: "Спок"
}

const getRandomVariant = () => {
  const variantValues = Object.keys(labelVariants) as IVariant[]
  const randomIndex = Math.floor(Math.random() * variantValues.length)

  return variantValues[randomIndex]
}

const getIsVariantWinner = (win: IVariant, loser: IVariant[]) => {
  return (player: IVariant, bot: IVariant) => {
    if (player === bot) return "Ничья"

    return (player === win && loser.includes(bot)) ? "Победа" : "Поражение"
  }
}

const getIsStone = getIsVariantWinner("stone", ["scissors", "lizard"])
const getIsScissors = getIsVariantWinner("scissors", ["paper", "lizard"])
const getIsPaper = getIsVariantWinner("paper", ["stone", "spock"])
const getIsLizard = getIsVariantWinner("lizard", ["spock", "paper"])
const getIsSpock = getIsVariantWinner("spock", ["stone", "scissors"])

const getIsWinner: Record<IVariant, (player: IVariant, bot: IVariant) => string> = {
  stone: getIsStone,
  scissors: getIsScissors,
  paper: getIsPaper,
  lizard: getIsLizard,
  spock: getIsSpock,
}

const startGame = (variant: IVariant) => {
  const randomVariant = getRandomVariant()

  return `
    ${labelVariants[variant]} vs ${labelVariants[randomVariant]}
    ${getIsWinner[variant](variant, randomVariant)}
  `
}

console.log(
  startGame("spock")
)