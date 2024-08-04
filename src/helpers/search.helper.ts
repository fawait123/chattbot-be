import { Request } from "express";

export class Search<T> {
    public search: object = {}
    public filter: object = {}
    constructor(req: Request, column: string[]) {
        if (req.query.search) {
            const searchData = this.searchData(column, req)
            console.log(searchData)
            this.search = {
                $or: searchData
            }
        }

        if (req.query.filter) {
            const filter = req.query.filter as string
            const searchData = req.query.search ? { $or: this.searchData(column, req) } : {}
            const filterData = this.filterData(JSON.parse(filter))
            this.search = {
                $and: [
                    {
                        ...searchData
                    },
                    {
                        $and: filterData
                    }
                ]
            }
        }
    }

    private filterData(filter: any) {
        return filter.map((item: any) => {
            return {
                [item.key]: item.value
            }
        })
    }

    private searchData(column: string[], req: Request) {
        return column.map((item) => {
            return {
                [item]: {
                    $regex: new RegExp(req.query.search as string, 'i')
                }
            }
        })
    }
}