interface IGadget {
  id: string,
  name: string,
  price: string | undefined
}

interface IUser {
  id: string,
  name: string,
}

interface IUserWithGadget extends IUser {
  gadget: IGadget
}

interface IUserWithGadgets extends IUser {
  gadgets: IGadget[]
}

const input: IUserWithGadget[] = [
  {
    id: "1",
    name: "Khalid Kashmiri",
    gadget: { id: "101", name: "Phone", price: "1000" },
  },
  {
    id: "2",
    name: "Khidir Karawita",
    gadget: { id: "102", name: "Tablet", price: undefined },
  },
  {
    id: "3",
    name: "Khalid Kashmiri",
    gadget: { id: "103", name: "Laptop", price: "1500" },
  },
];

const isEmptyArray = <T,>(array: T[]) => array.length === 0

const exclude = <T extends object, K extends keyof T>(data: T, keys: K[]) => {
  const entries = Object
    .entries(data)
    .filter(([key, value]) => keys.includes(key as K) ? null : [key, value])

  return Object.fromEntries(entries) as Omit<T, K>
}

const findUserByName = <T extends IUser>(name: string, users: T[]) => (
  users.find((user) => user.name === name)
)

const findUsersByName = <T extends IUser>(name: string, users: T[]) => (
  users.filter((user) => user.name === name)
)

const getAllGadgetsByUsername = (name: string, usersWithGadget: IUserWithGadget[]) => (
  findUsersByName(name, usersWithGadget)
    .map(user => user.gadget)
)

// const getUniqueNamesFromUsers = <T extends IUser>(users: T[]) => {
//   const set = new Set()
//   users.forEach(user => set.add(user.name))
//   return set
// } 

const getUniqueNamesFromUsers = <T extends IUser>(users: T[], names: string[] = []): string[] => {
  return isEmptyArray(users)
    ? names
    : (
      getUniqueNamesFromUsers(
        users.slice(1, users.length),
        (({ name }: IUser) => names.concat(names.includes(name) ? [] : name))(users[0])
      )
    )
}

const groupGadgetByUser = (usersWithGadget: IUserWithGadget[]): IUserWithGadgets[] => {
  const uniqueNames = getUniqueNamesFromUsers(usersWithGadget)

  return uniqueNames.map((name) => {
    const userInfo = exclude(findUserByName(name, usersWithGadget)!, ["gadget"])

    return {
      ...userInfo,
      gadgets: getAllGadgetsByUsername(userInfo.name, usersWithGadget)
    }
  })
}

console.log(
  groupGadgetByUser(input)
)