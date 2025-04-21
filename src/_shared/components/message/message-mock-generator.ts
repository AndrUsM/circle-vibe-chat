const messageStatuses = ["VIEWED", "UNREAD", "NOT_SENT", "DRAFT"];
const messageTypes = ["TEXT", "IMAGE", "VIDEO", "FILE"];
const fileTypes = ["video/mp4", "video/ogg", "video/webm", "video/avi"];

const sampleUsernames = ["alex", "jordan", "taylor", "morgan", "casey"];
const sampleSurnames = ["smith", "johnson", "brown", "lee", "martinez"];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function generateUser(id) {
  const username = getRandomElement(sampleUsernames);
  const surname = getRandomElement(sampleSurnames);
  return {
    _id: `${id}`,
    username,
    surname,
    birthDate: new Date(1990 + Math.floor(Math.random() * 10), 1, 1),
    password: "hashedpassword123",
    avatarUrl: `https://example.com/avatars/${username}.png`,
    isHiddenContactInfo: Math.random() < 0.5,
    address: null,
    city: null,
    zipCode: null,
    country: null,
    phones: null,
    email: `${username}@example.com`,
    primaryPhone: null
  };
}

function generateFile(id) {
  return {
    id,
    fileName: `file_${id}.mp4`,
    url: `https://example.com/files/file_${id}.mp4`,
    type: getRandomElement(fileTypes),
    description: `Description for file_${id}`
  };
}

function generateMessage(id) {
  const numImages = Math.floor(Math.random() * 3);
  const numVideos = Math.floor(Math.random() * 3);
  const numFiles = Math.floor(Math.random() * 3);
  const createdDate = new Date(Date.now() - Math.random() * 1000000000).toISOString();
  const updatedDate = new Date(Date.parse(createdDate) + Math.random() * 10000000).toISOString();

  return {
    id,
    content: `This is the content of message ${id}`,
    images: Array.from({ length: numImages }, (_, i) => generateFile(id * 100 + i)),
    videos: Array.from({ length: numVideos }, (_, i) => generateFile(id * 200 + i)),
    files: Array.from({ length: numFiles }, (_, i) => generateFile(id * 300 + i)),
    status: getRandomElement(messageStatuses),
    chatId: Math.floor(Math.random() * 10),
    receiverId: Math.floor(Math.random() * 5 + 1),
    sender: generateUser(id),
    createdDate,
    updatedDate,
    messageType: getRandomElement(messageTypes),
  };
}

const messages = Array.from({ length: 100 }, (_, i) => generateMessage(i + 1));

console.log(messages);
