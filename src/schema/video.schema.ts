import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema()
export class Video {
    @Prop({ required: true })
    title: string

    @Prop({ required: true })
    description: string

    @Prop({ required: true })
    thumbnail: string

    @Prop({ required: true })
    source: string

    @Prop({ required: true, default: true })
    is_public: boolean

    @Prop({ required: true, default: new Date() })
    createdAt: string

    @Prop({ required: true, default: new Date() })
    updatedAt: string
}

export const VideoSchema = SchemaFactory.createForClass(Video)