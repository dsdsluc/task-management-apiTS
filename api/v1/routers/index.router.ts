import { TaskRouter } from "./task.router";
import { Express } from "express"


const mainRouterV1 = (app: Express)=>{
  const version = "/api/v1"

  app.use(version + "/task",TaskRouter);

}

export default mainRouterV1