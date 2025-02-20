import { Document } from "mongoose";

export interface IVideoInterface extends Document {
    readonly title: string
    readonly description: string
    readonly thumbnail: string
    readonly source: string
}