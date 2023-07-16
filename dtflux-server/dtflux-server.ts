import express from "express";
import { App } from "./dtflux-app";
import * as conf from "./dtflux-conf/conf.json";

const app = new App().expressApp;

app.listen(conf.httpPort, conf.httpHost, () => {
  console.log(`Server is running on port ${conf.httpPort}`);
});
