import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Notification {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    body: string

    @Prop({ required: true, default: false })
    isRead: string

    @Prop({ required: true })
    userID: string

    @Prop({ required: true, default: new Date() })
    createdAt: string

    @Prop({ required: true, default: new Date() })
    updatedAt: string
}

export const NotificationSchema = SchemaFactory.createForClass(Notification)