type SourceData = {
  title: string
  year: number
  author: string
}

type TargetData = SourceData & {
  preview: string
  url: string
}

const source: SourceData = {
  title: "Harry Potter",
  year: 1997,
  author: "J.K. Rowling",
}

const target: TargetData = {
  title: "Harry Potter",
  year: 1997,
  author: "J.K. Rowling",
  preview: "Название: [title], Автор: [author], Год: [year]",
  url: "www.someurl.com/preview?title=[title]&year=[year]&author=[author]"
}

const createBook = (source: SourceData): TargetData => {
  return {
    ...source,
    preview: `Название: ${source.title}, Автор: ${source.author}, Год: ${source.year}`,
    url: `www.someurl.com/preview?title=${source.title}&year=${source.year}&author=${source.author}`,
  }
}

console.log(createBook(source))