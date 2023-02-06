import https from 'node:https'
import queryString from 'node:querystring'
import { OutgoingHttpHeaders, IncomingMessage } from 'http'
import { ResultJson } from './types';

export const BASE_URL = 'www.kookapp.cn'

interface HttpRequest {
    method: string
    path: string
    headers: OutgoingHttpHeaders
    body: any
}

export class KookHttp {
    static createRequest(
        path: string,
        body: any = '',
        headers: OutgoingHttpHeaders = {},
        method: string = 'GET'
    ) {
        return {
            path, method, headers, body
        }
    }

    static authHeader(token: string, headers: any = {}) {
        return Object.assign(headers, {
            Authorization: token
        })
    }

    static createResponse(data: Buffer) {
        const returnVal = {
            raw: () => data,
            text: (encoding: BufferEncoding='utf-8') => data.toString(encoding),
            json: (encoding: BufferEncoding='utf-8') => JSON.parse(returnVal.text(encoding))
        }

        return returnVal
    } 

    static request(req: HttpRequest): Promise<ReturnType<typeof this.createResponse>> {
        return new Promise((resolve, reject) => {
            const _callback = (res: IncomingMessage) => {
                let buf = Buffer.alloc(0)
                res.on('error', err => reject(err))
                res.on('data', c => buf = Buffer.concat([buf, c]))
                res.on('end', () => resolve(this.createResponse(buf)))
            }

            if (req.method.toLowerCase() === 'get' && req.body) {
                let obj: any = {}
                Object.entries(req.body).forEach(([k, v]) => {
                    if (!v) {
                        return
                    }

                    obj[k] = v
                })
                
                if (obj) {
                    const query = queryString.encode(obj)
                    req.path = `${req.path}${query? '?' + query: ''}`
                }

                req.body = null
            }

            const _req = https.request({
                host: BASE_URL,
                method: req.method,
                path: req.path,
                headers: req.headers,
                protocol: 'https:'
            }, _callback)

            if (req.body) {
                _req.write(KookHttp.toWriteable(req.body))
            }

            _req.end()
        })
    }

    static toWriteable(data: any = '') {
        if (typeof data === 'string') {
            return data
        }

        if (
            data instanceof Buffer ||
            data instanceof ArrayBuffer
        ) {
            return data
        }

        let dataStr: string
        try {
            dataStr = JSON.parse(data)
        } catch (_) {
            dataStr = data.toString()
        }

        return dataStr
    }
}

export function api<T, R = any>(path: string, method: 'get' | 'post'='get') {
    return async (t: string, opt?: T): Promise<ResultJson<R>> => {
        const res = await KookHttp.request(KookHttp.createRequest(
            path, opt, KookHttp.authHeader(t), method
        ))
    
        return res.json()
    }
}