import { Hono } from 'hono'
import { LLMRoute } from './modules/llm/route'
import { cors } from 'hono/cors'

const app = new Hono()

const CORS_ORIGIN = process.env.CORS_ORIGIN || "http://localhost:3000"

app.use(cors({ origin: CORS_ORIGIN }))

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.route("/llm", LLMRoute)

export default app
