import { api } from './basic';
import { ServerOption } from './types';

interface MutedListOption extends ServerOption {
    return_type: 'detail'
}
export const list = api<MutedListOption>('/api/v3/guild-mute/list')

interface MuteOption extends ServerOption {
    user_id: string
    type: 1 | 2
}
export const create = api<MuteOption>('/api/v3/guild-mute/create', 'post')

export const remove = api<MuteOption>('/api/v3/guild-mute/create', 'post')
