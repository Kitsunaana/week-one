type Contact = {
  phone: string
  email: string
}

type Address = {
  city: string
  zip: string
}

type SourceData = {
  user_id: string
  full_name: string
  contact: Contact
  address: Address
  is_active: boolean
}

type TargetData = {
  id: string
  name: string
  phone: string
  email: string
  location: string
  status: string
}

const source: SourceData = {
  user_id: "123",
  full_name: "John Doe",
  contact: {
    phone: "+123456789",
    email: "john.doe@example.com",
  },
  address: {
    city: "New York",
    zip: "10001",
  },
  is_active: true,
};

const target: TargetData = {
  id: "123",
  name: "John Doe",
  phone: "+123456789",
  email: "[john.doe@example.com](<mailto:john.doe@example.com>)",
  location: "New York, 10001",
  status: "active",
};

// ---------------------------------------------------------------------------
// ---------------------------------------------------------------------------
type CommonRecord = Record<string, unknown>

type Rules<Source extends CommonRecord, Target extends CommonRecord> = {
  [Key in keyof Target]: (source: Source) => Target[Key]
}

const makeAdapterFactory = <
  Source extends CommonRecord,
  Target extends CommonRecord
>(
  source: Source,
  rules: Rules<Source, Target>
) => {
  const targetKeys = Object.keys(rules) as (keyof Target)[]

  return targetKeys
    .reduce((target, key) => {
      target[key] = rules[key](source)

      return target
    }, {} as Target)
}


const convertUser = (source: SourceData) => (
  makeAdapterFactory<SourceData, TargetData>(source, {
    id: (source) => source.user_id,
    name: (source) => source.full_name,
    phone: (source) => source.contact.phone,
    email: (source) => `[${source.contact.email}](<mailto:${source.contact.email}>)`,
    location: (source) => `${source.address.city}, ${source.address.zip}`,
    status: (source) => source.is_active ? "active" : "inactive"
  })
)

console.log(convertUser(source))