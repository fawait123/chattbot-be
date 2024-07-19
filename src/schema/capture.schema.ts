import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Capture {
    @Prop({ required: true, default: new Date() })
    date: string

    @Prop({ required: true })
    source: string

    @Prop({ required: true })
    userID: string

    @Prop({ required: true, default: new Date() })
    createdAt: string

    @Prop({ required: true, default: new Date() })
    updatedAt: string
}

export const CaptureSchema = SchemaFactory.createForClass(Capture)