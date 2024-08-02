import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Schema as MongoSchema, Types } from "mongoose";

@Schema()
export class Capture {
    @Prop({ required: true, default: new Date() })
    date: string

    @Prop({ required: true })
    source: string

    @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User', alias: 'relation', required: true })
    userID: Types.ObjectId

    @Prop({ required: false })
    note: string

    @Prop({ required: true, default: new Date() })
    createdAt: string

    @Prop({ required: true, default: new Date() })
    updatedAt: string

    @Prop({ type: MongoSchema.Types.ObjectId, ref: 'User' })
    user: Types.ObjectId
}

export const CaptureSchema = SchemaFactory.createForClass(Capture)