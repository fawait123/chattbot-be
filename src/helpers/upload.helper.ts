import { existsSync, mkdirSync, writeFileSync } from "fs"

export const uploadFileBuffer = (dest: string, data: Buffer, mimeType: string) => {
    return new Promise((resolve, reject) => {
        try {
            if (!existsSync(dest)) {
                mkdirSync(dest, { recursive: true })
            }

            const [_, extension] = mimeType.split('/')

            const path = dest + '/' + generateRandomString(40) + '.' + extension

            writeFileSync(path, data)
            resolve(path)
        } catch (error) {
            reject(error)
        }
    })
}

export const generateRandomString = (length: number): string => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}