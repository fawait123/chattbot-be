import * as firebase from 'firebase-admin';
import { join } from 'path';

export class FirebaseHelper {
    constructor() {
        // pakai aplikasi notitification-firebase
        firebase.initializeApp({
            credential: firebase.credential.cert(
                join(__dirname, '..', '..', 'credentials/firebase.json'),
            ),
        });
    }

    send(title: string, body: string, token: string) {
        return new Promise(async (resolve, reject) => {
            try {
                await firebase
                    .messaging()
                    .send({
                        notification: { title, body },
                        token: token,
                        android: { priority: 'high' },
                    })

                resolve(true)
            } catch (error) {
                reject(error)
            }
        })
    }
}