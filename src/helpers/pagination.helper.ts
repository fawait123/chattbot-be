import { Request } from "express";

export class Pagination {
    public page: number | unknown
    public limit: number | unknown
    constructor(req: Request) {
        this.page = req.query.page ? req.query.page : 0
        this.limit = req.query.limit ? req.query.limit : 10
    }

    getPagination() {
        return {
            offset: (+this.page - 1) * +this.limit,
            limit: +this.limit
        }
    }

    getPage() {
        return {
            page: +this.page,
            limit: this.limit
        }
    }
}