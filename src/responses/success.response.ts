import { IPaginate } from "src/interface/paginate.interface"

export class SuccessResponse {
    static toJson<T>(data: any): IPaginate<T> {
        return {
            page: data.page,
            limit: data.limit,
            total: data.total,
            data: data
        }
    }
}