const isWithinPercent = (percent: number) => (
  Math.floor(Math.random() * 100) < Math.min(Math.max(percent, 0), 100)
)

const sleep = (delay: number) => (
  new Promise(resolve => (
    setTimeout(resolve, delay)
  ))
)

const sleepWithReject = (delay: number) => (
  sleep(delay)
    .then(() => {
      if (isWithinPercent(10)) {
        throw new Error("Произошла какая-то ошибка")
      }
    })
)

interface IUser {
  name: string
  email: string
  isActive: boolean
}

const nameToLowerCase = (name: string) => (
  name
    .trim()
    .toLowerCase()
)

const emailToLowerCase = (email: string) => email.toLowerCase()

const cleanUserData = (users: IUser[]) => (
  sleepWithReject(10)
    .then(() => {
      return users
        .filter((user) => user.isActive)
        .map((user) => {
          const name = nameToLowerCase(user.name)
          const email = emailToLowerCase(user.email)

          return {
            ...user,
            name,
            email,
          }
        })
    })
)

const users: IUser[] = [
  {
    email: "kIt@GmAiL.com",
    name: "Kitsunaana",
    isActive: true,
  },
  {
    email: "REGINA@mail.ru",
    name: "Регина",
    isActive: false,
  }
]

const doClearUserData = async () => {
  try {
    const cleanedUserData = await cleanUserData(users)
    console.log(cleanedUserData)
  } catch (error) {
    console.log(error)
  }
}

doClearUserData()