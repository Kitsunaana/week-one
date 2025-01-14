const sleep = (delay: number, message: string): Promise<string> => (
  new Promise((resolve) => (
    setTimeout(() => resolve(message), delay)
  ))
)

sleep(1000, "Готово")
  .then(console.log)