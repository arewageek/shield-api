import { Hono } from "hono";
import factory from "./services";

const route = new Hono();

route.get("/test", async c => {
    const {data} = await c.req.json()
    if(!data){
        return c.json({error: "No data"}, 400)
    }

    const response = await factory.deploy(data)

    return c.json(response)
})

export { route as FactoryRoute }