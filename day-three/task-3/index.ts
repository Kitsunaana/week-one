// ----------------------------------------------------
// ----- utils ----------------------------------------
const sleep = (delay: number): Promise<string> => (
  new Promise((resolve) => (
    setTimeout(resolve, delay)
  ))
)

const charset = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
const generateRandomString = (length: number = 16): string => (
  Array
    .from({ length })
    .reduce<string>((result) => {
      return result += charset[Math.floor(Math.random() * charset.length)]
    }, "")
)


// ----------------------------------------------------
// ----- interfaces -----------------------------------
type TodoId = string

interface ITodoCreationAttrs {
  caption: string
  description: string
  completed: boolean
}

interface ITodo extends ITodoCreationAttrs {
  id: TodoId
}

interface IApiList<Payload, Data, Id> {
  create(payload: Payload): Promise<Data>
  remove(id: Id): Promise<boolean>
  getAll(): Promise<Data[]>
}


// ----------------------------------------------------
// ----- implements -----------------------------------
type TodosApiList = IApiList<ITodoCreationAttrs, ITodo, TodoId> & {
  todos: ITodo[]
}

class FakeDoTodosApi {
  constructor(private readonly todosApiList: TodosApiList) { }

  async create(payload: ITodoCreationAttrs): Promise<ITodo> {
    return this.todosApiList.create(payload)
  }

  async remove(id: TodoId): Promise<boolean> {
    return this.todosApiList.remove(id)
  }

  async getAll() {
    return this.todosApiList.getAll()
  }
}


// ----------------------------------------------------
// ----- api ------------------------------------------
const todosApi: TodosApiList = {
  todos: [
    {
      id: generateRandomString(),
      caption: "caption 1",
      description: "desc 1",
      completed: false,
    },
  ],

  async create(payload: ITodoCreationAttrs): Promise<ITodo> {
    return sleep(1000)
      .then(() => {
        const data = { ...payload, id: generateRandomString() }
        this.todos.push(data)
        return data
      })
  },

  async remove(id: TodoId): Promise<boolean> {
    return sleep(1000)
      .then(() => {
        const findIndex = this.todos.findIndex((todo) => todo.id === id)

        if (findIndex === -1) throw new Error("todo not found")

        this.todos = [
          ...this.todos.slice(0, findIndex - 1),
          ...this.todos.slice(findIndex, this.todos.length),
        ]

        return true
      })
  },

  async getAll(): Promise<ITodo[]> {
    return sleep(1000)
      .then(() => this.todos)
  },
};


// ----------------------------------------------------
// ----- examples -------------------------------------
(async () => {
  const fakeDoTodosApi = new FakeDoTodosApi(todosApi)

  console.log(
    await fakeDoTodosApi.getAll(),
  )

  const createdTodo = await fakeDoTodosApi.create({
    caption: "new task",
    completed: true,
    description: "so so",
  })

  console.log(createdTodo)

  console.log(
    await fakeDoTodosApi.getAll(),
  )

  console.log(
    await fakeDoTodosApi.remove(createdTodo.id)
  )

  console.log(
    await fakeDoTodosApi.getAll(),
  )
})()
