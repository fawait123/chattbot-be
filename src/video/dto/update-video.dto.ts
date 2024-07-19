import { Optional } from "@nestjs/common"
import { IsNotEmpty } from "class-validator"

export class UpdateVideoDto {
    @IsNotEmpty()
    readonly title: string
    @IsNotEmpty()
    readonly description: string
    @Optional()
    source: string
    @Optional()
    thumbnail: string
}

