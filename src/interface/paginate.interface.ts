export interface IPaginate<T> {
    readonly page: number,
    readonly limit: number,
    readonly total: number,
    readonly data: T[],
}