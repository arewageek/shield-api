import { Hono } from 'hono'
import { LLMRoute } from './modules/llm/route'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/llm", LLMRoute)

export default app
