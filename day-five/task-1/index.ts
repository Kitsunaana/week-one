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

const getIsVariantWinner = (winner: IVariant, loser: IVariant[]) => {
  return (player: IVariant, bot: IVariant) => {
    if (player === bot) return "Ничья"

    return (player === winner && loser.includes(bot)) ? "Победа" : "Поражение"
  }
}

const getIsWinner: Record<IVariant, (player: IVariant, bot: IVariant) => string> = {
  stone: getIsVariantWinner("stone", ["scissors", "lizard"]),
  scissors: getIsVariantWinner("scissors", ["paper", "lizard"]),
  paper: getIsVariantWinner("paper", ["stone", "spock"]),
  lizard: getIsVariantWinner("lizard", ["spock", "paper"]),
  spock: getIsVariantWinner("spock", ["stone", "scissors"]),
}

const startGame = (variant: IVariant) => {
  const randomVariant = getRandomVariant()

  return {
    player: labelVariants[variant],
    bot: labelVariants[randomVariant],
    result: getIsWinner[variant](variant, randomVariant)
  }
}

console.log(
  startGame("spock")
)