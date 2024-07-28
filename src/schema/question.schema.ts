import { Prop, SchemaFactory, Schema } from "@nestjs/mongoose";
import { Schema as MongoSchema, Types } from "mongoose";

@Schema()
export class Question {
    @Prop({ required: true, default: new Date() })
    description: string

    @Prop({ required: true, default: true })
    isPublic: boolean

    @Prop({ required: true, default: new Date() })
    createdAt: string

    @Prop({ required: true, default: new Date() })
    updatedAt: string
}

export const QuestionSchema = SchemaFactory.createForClass(Question)