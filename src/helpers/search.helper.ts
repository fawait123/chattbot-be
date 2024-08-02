import { Request } from "express";

export class Search<T> {
    public search: object = {}
    public filter: object = {}
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

        if (req.query.filter) {
            const filter = req.query.filter as string
            const splitFilter = filter.split(",")
            this.filter = {
                [splitFilter[0]]: splitFilter[1]
            }
        }
    }
}