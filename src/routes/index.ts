import { Router } from "express";

import ImageRouter from "./api/ImageRouter";

interface Route {
  resource: string;
  router: Router;
}

const routes: Route[] = [
  {
    resource: "/images",
    router: ImageRouter,
  },
];

const index = Router();

routes.forEach((r) => index.use(r.resource, r.router));

export default index;
