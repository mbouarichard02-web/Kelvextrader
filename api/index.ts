// Vercel Serverless Function Entry Point
import { createServer } from "http";
import { parse } from "url";
import app from "../server/_core/index";

const server = createServer(app);

export default app;
