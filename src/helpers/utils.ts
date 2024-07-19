import * as bcrypt from 'bcrypt';
import * as ffmpeg from 'fluent-ffmpeg';
import { existsSync, mkdirSync } from 'fs';
import { IUserProfile } from 'src/interface/user-profile.interface';

export const hashPassword = async (password: string): Promise<string> => {
    const saltOrRounds = 10;

    return await bcrypt.hash(password, saltOrRounds);
}

export const comparePassword = async (plaintText: string, hash: string): Promise<boolean> => {
    return await bcrypt.compare(plaintText, hash);
}

export const generateThumbnail = (videoPath: string, pathName: string, thumbnailFileName: string, time: string = '00:00:01') => {
    return new Promise<string | any>((resolve, reject) => {
        if (!existsSync(pathName)) {
            mkdirSync(pathName, { recursive: true })
        }
        ffmpeg('./' + videoPath)
            .screenshots({
                count: 1,
                filename: thumbnailFileName,
                timemarks: [time],

            })
            .on('end', () => {
                console.log('Thumbnail generated successfully.');
                resolve(thumbnailFileName);
            })
            .on('error', (err) => {
                console.error('Error generating thumbnail:', err);
                reject(err);
            });
    });
};

export const generateRandomString = (length: number): string => {
    const charset = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charsetLength = charset.length;

    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * charsetLength);
        result += charset[randomIndex];
    }

    return result;
}

export const toUserProfileResponse = (user: any): IUserProfile => {
    return {
        id: user.sub,
        name: user.name,
        username: user.username,
        email: user.email
    }
}