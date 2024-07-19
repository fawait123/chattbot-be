import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class User {
    @Prop({ required: true })
    name: string

    @Prop({ required: true })
    username: string

    @Prop({ required: true })
    email: string

    @Prop({ required: true })
    password: string

    @Prop({ required: true })
    role: string

    @Prop({ required: true, default: true })
    status: boolean

    @Prop({ required: true, default: new Date() })
    createdAt: string

    @Prop({ required: true, default: new Date() })
    updatedAt: string
}

export const UserSchema = SchemaFactory.createForClass(User)