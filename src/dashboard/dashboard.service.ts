import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICapture } from 'src/interface/capture.interface';
import { IQuestion } from 'src/interface/question.interface';
import { IUserInterface } from 'src/interface/user.interface';
import { IVideoInterface } from 'src/interface/video.interface';

@Injectable()
export class DashboardService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUserInterface>,
        @InjectModel('Video') private readonly videoModel: Model<IVideoInterface>,
        @InjectModel('Capture') private readonly captureModel: Model<ICapture>,
        @InjectModel('Question') private readonly questionModel: Model<IQuestion>
    ) { }
    async index() {
        try {
            return {
                user: await this.userModel.countDocuments(),
                video: await this.videoModel.countDocuments(),
                capture: await this.captureModel.countDocuments(),
                question: await this.questionModel.countDocuments()
            }
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }
}
