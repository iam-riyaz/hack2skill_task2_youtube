import mongoose, { Schema } from "mongoose";

const videoSchema= new mongoose.Schema({
title:{type:String},
description:{type:String},
publishedAt:{type:Number},
thumbnail:{type:String}
})

export const Video= mongoose.model("video",videoSchema)