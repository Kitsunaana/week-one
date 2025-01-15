type Key = string | number

const queryController: Record<string, AbortController> = {}

const getKey = (keys: Key[]) => keys.join("")

const setQueryKey = (key: string, controller: AbortController) => {
  queryController[key] = controller
}

const getQueryController = (key: Key): AbortController => queryController[key]

const doFetchTodo = async <R,>({
  query,
  queryKey,
  onSuccess,
  onError,
}: {
  query: (signal: AbortSignal) => Promise<R>
  queryKey: Key[],
  onSuccess?: (data: R) => void
  onError?: (error: Error, message?: string) => void
}) => {
  try {
    const controller = new AbortController()
    const key = getKey(queryKey)
    setQueryKey(key, controller)

    const data = await query(getQueryController(key).signal)
    onSuccess?.(data)
  } catch (error: unknown) {
    if (!(error instanceof Error)) return

    if (error.name === "AbortError") onError?.(error, "Запрос был отменен")
    else onError?.(error)
  }
}

const todosApi = {
  url: "https://jsonplaceholder.typicode.com/todos",

  async getById(id: number, init: RequestInit): Promise<{ id: string }> {
    const response = await fetch(`${this.url}/${id}`, { signal: init.signal })
    return response.json()
  },
}

doFetchTodo({
  queryKey: ["todos", 1],
  query: (signal) => todosApi.getById(1, { signal }),
  onSuccess: (data) => console.log(data),
  onError: (_, message) => console.log(message, "123"),
})

// Если хотим прервать запрос
// getQueryController(getKey(["todos", 1])).abort()
