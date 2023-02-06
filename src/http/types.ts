export interface ServerOption {
    guild_id: string
}

export interface ListQueryOption {
    page?: number
    page_size?: number
}

export interface ResultJson<T = any> {
    code: number
    message: string
    data: T
}

export interface Channel {
    channel_id: string
}

export interface Target {
    target_id: string
}

export interface Message {
    msg_id: string
}