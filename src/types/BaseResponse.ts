export interface BaseResponse<T> {
    // filter(arg0: (company: unknown) => unknown): unknown;
    success: boolean;
    message: string;
    data: T;
}