export interface IHttpResponse {
    statusCode: number
    body: any
    cookies?: any
}

export interface IMultiPartFile {
    type: 'file' | 'field'
    toBuffer: () => Promise<Buffer>
    file: any
    fieldname: string
    filename: string
    encoding: string
    mimetype: string
    fields: any
    value: any
}

export interface IHttpRequest {
    body?: any
    headers?: any
    params?: any
    cookies?: any
    parts?: () => any
}
