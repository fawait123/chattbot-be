import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ICapture } from 'src/interface/capture.interface';
import { IQuestion } from 'src/interface/question.interface';
import { IUserInterface } from 'src/interface/user.interface';
import { IVideoInterface } from 'src/interface/video.interface';
import * as moment from 'moment';
import { IChatt } from 'src/interface/chatt.interface';



@Injectable()
export class DashboardService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUserInterface>,
        @InjectModel('Video') private readonly videoModel: Model<IVideoInterface>,
        @InjectModel('Capture') private readonly captureModel: Model<ICapture>,
        @InjectModel('Question') private readonly questionModel: Model<IQuestion>,
        @InjectModel("Chatt") private readonly chattModel: Model<IChatt>
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

    async userActivity() {
        try {
            const result = this.getPrevMonth(5).map(async (item) => {
                const countChatt = await this.chattModel.countDocuments({
                    createdAt: {
                        $regex: new RegExp(item.where, 'i')
                    }
                })
                return {
                    label: item.label,
                    date: item.date,
                    value: countChatt
                }
            })

            return await Promise.all(result)
        } catch (error) {
            throw new InternalServerErrorException(error.message)
        }
    }

    getPrevMonth(length: number) {
        const month = [];
        const start = moment().startOf('month');

        for (let i = 0; i < length; i++) {
            const current = start.clone().subtract(i, 'months');
            month.push({
                label: current.format('MMMM YYYY'),
                date: current.format('YYYY-MM-DD'),
                where: current.format("MMM")
            });
        }

        return month;
    }
}
