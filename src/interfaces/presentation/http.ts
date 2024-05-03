export interface IHttpResponse {
    statusCode: number
    body: any
    cookies?: any
}

export interface IHttpRequest {
    body?: any
    headers?: any
    params?: any
    cookies?: any
}
