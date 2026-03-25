//const express = require("express");
import express from "express";
import { config } from "dotenv";

config()
///Import Routes
import movieRoutes from "../routes/movieRoutes.js";
import authRoutes from "../routes/authRoutes.js"
import watchlistRoutes from "../routes/watchListRoutes.js"

import { prisma,connectDB,disconnectDB } from "../config/db.js";

connectDB();

const app = express();

//Body parsing middlewares
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//API routes
app.use("/movies",movieRoutes);
app.use("/auth", authRoutes);
app.use("/watchlist",watchlistRoutes);


const PORT = 5001;

const server = app.listen(PORT, ()=>{
    console.log(`Server running on PORT ${PORT}`);
});

//Handle db rejections and connection errors

process.on("unhandledRejection",(error)=>{
    console.error("Unhandled rejection:",error);
    server.close(async()=>{
        await disconnectDB();
        process.exit(1);
    })
});

process.on("uncaughtException",async(error)=>{
    console.error("Uncaught exception:",error);
    await disconnectDB();
    process.exit(1);
});

process.on("SIGTERM", async()=>{
    console.log("SIGTERM received, shutting down gracefully");
    server.close(async()=>{
        await disconnectDB();
        process.exit(0);
    })
});




