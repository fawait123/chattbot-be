import { Document } from "mongoose";

export interface IUserInterface extends Document {
    readonly name: string
    readonly username: string
    readonly email: string
    readonly password: string
    readonly role: string
    readonly status: boolean
}