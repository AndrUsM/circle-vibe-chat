// Generate 30 users and 100 chats using random data
function randomDate(start, end) {
  return new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  )
}

function generateUser(id) {
  const firstNames = ["John", "Jane", "Mike", "Anna", "Chris"]
  const lastNames = ["Doe", "Smith", "Brown", "Taylor", "Wilson"]

  const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
  const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]

  return {
    _id: `u${id}`,
    username: `${firstName.toLowerCase()}${id}`,
    surname: lastName,
    birthDate: randomDate(new Date(1970, 0, 1), new Date(2005, 11, 31)),
    password: `hashed_password_${id}`,
    avatarUrl:
      Math.random() > 0.2 ? `https://example.com/avatar${id}.jpg` : null,
    isHiddenContactInfo: Math.random() < 0.5,
    address: Math.random() > 0.3 ? `${id} Main St` : null,
    city: Math.random() > 0.3 ? "New York" : null,
    zipCode: Math.random() > 0.3 ? "10001" : null,
    country: Math.random() > 0.3 ? "USA" : null,
    phones: Math.random() > 0.5 ? [`+12345678${id}`] : null,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${id}@example.com`,
    primaryPhone: Math.random() > 0.5 ? `+12345678${id}` : null
  }
}

function generateChat(users, index) {
  const isGroupChat = Math.random() > 0.4
  const userCount = isGroupChat ? Math.floor(Math.random() * 3) + 3 : 2
  const selectedUsers = users
    .sort(() => 0.5 - Math.random())
    .slice(0, userCount)

  const now = new Date()
  const createdAt = randomDate(new Date(now.getTime() - 100 * 86400000), now)
  const updatedAt = new Date(
    createdAt.getTime() + Math.random() * 86400000 * 30
  )

  return {
    users: selectedUsers,
    name: `chat_${index}`,
    readableName: selectedUsers.map(u => u.username).join(" & "),
    type: isGroupChat ? "group" : userCount === 1 ? "self" : "private",
    isGroupChat: isGroupChat,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString()
  }
}

const users = Array.from({ length: 30 }, (_, i) => generateUser(i + 1))
const chats = Array.from({ length: 100 }, (_, i) => generateChat(users, i + 1))

console.log(chats)
