import { IsNotEmpty, IsOptional } from "class-validator"

export class CreateNotificationDto {
    @IsNotEmpty()
    title: string
    @IsNotEmpty()
    body: string
    @IsOptional()
    isRead: string
    @IsOptional()
    userID: string
    @IsOptional()
    createdAt: string
    @IsOptional()
    updatedAt: string
}
