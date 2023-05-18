// const express = require("express");
// const SortMiddleware = require("./app/middlewares/SortMiddleware");

// const route = require("./routes");
// const db = require("./config/db");

import express from "express";
import cors from "cors";
//import SortMiddleware from "./app/middlewares/SortMiddleware";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import route from "./routes/index.js";
import connect from "./config/db/index.js";

//Connect to Db
connect();

const app = express();
const port = 8000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());