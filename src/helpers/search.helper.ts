import { Request } from "express";

export class Search<T> {
    public search: object = {}
    constructor(req: Request, column: string[]) {
        if (req.query.search) {
            const searchData = column.map((item) => {
                return {
                    [item]: {
                        $regex: new RegExp(req.query.search as string, 'i')
                    }
                }
            })

            this.search = {
                $or: searchData
            }
        }
    }
}