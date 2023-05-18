import express from "express";
import cors from "cors";

import SortMiddleware from "./app/middlewares/SortMiddleware";
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import route from "./routes/index.js";
import connect from "./config/db/index.js";