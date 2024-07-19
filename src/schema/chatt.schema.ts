import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Chatt {
    @Prop({ required: true })
    message: string

    @Prop({ required: true })
    response: string

    @Prop({ required: true, default: true })
    userID: string

    @Prop({ required: true, default: new Date() })
    createdAt: string

    @Prop({ required: true, default: new Date() })
    updatedAt: string
}

export const ChattSchema = SchemaFactory.createForClass(Chatt)