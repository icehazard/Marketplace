import { ChatGPTAPI, getOpenAIAuth } from 'chatgpt'

async function example() {
  // use puppeteer to bypass cloudflare (headful because of captchas)
  const openAIAuth = await getOpenAIAuth({
    email: 'whitlock.s@tutanota.com',
    password: 'securMeet777&'
  })

  const api = new ChatGPTAPI({ ...openAIAuth })
  await api.initSession()

  // send a message and wait for the response
  const result = await api.sendMessage('Write a python version of bubble sort.')

  // result.response is a markdown-formatted string
  console.log(result.response)
}

example()