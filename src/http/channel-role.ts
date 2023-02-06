import { api } from './basic'
import { Channel } from './types'

export const index = api<Channel>('/api/v3/channel-role/index')

interface RoleOption extends Channel {
    type?: 'role_id' | 'user_id'
    value?: string
}
export const create = api<RoleOption>('/api/v3/channel-role/create', 'post')

interface RoleUpdateOption extends RoleOption {
    allow?: number
    deny?: number
}
export const update = api<RoleUpdateOption>('/api/v3/channel-role/update', 'post')

export const remove = api<RoleOption>('/api/v3/channel-role/delete', 'post')