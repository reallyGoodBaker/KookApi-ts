import { api } from './basic';
import { Channel, ListQueryOption, ServerOption, Target } from './types'

interface ChannelListQueryOption extends ListQueryOption {
    type?: 1 | 2
}
export const list = api<ChannelListQueryOption>('/api/v3/channel/list')

export const view = api<Target>('/api/v3/channel/view')

interface ChannelOption extends ServerOption {
    name: string
    parent_id?: string
    type?: 1 | 2
    limit_amount?: number
    voice_quality?: 1 | 2 | 3
    is_category?: 0 | 1
}
export const create = api<ChannelOption>('/api/v3/channel/create', 'post')

interface ChannelUpdateOption extends Channel {
    name?: string
    topic?: string
    slow_mode?: 0 | 5000 | 10000 | 15000 | 30000 | 60000 | 120000 | 300000 | 600000 | 900000 | 1800000 | 3600000 | 7200000 | 21600000
}
export const update = api<ChannelUpdateOption>('/api/v3/channel/update', 'post')

export const remove = api<Channel>('/api/v3/channel/delete', 'post')

export const userList = api<Channel>('/api/v3/channel/user-list')

interface VoiceChannelMoveOption extends Target {
    user_ids: string[]
} 
export const moveUser = api<VoiceChannelMoveOption>('/api/v3/channel/move-user', 'post')