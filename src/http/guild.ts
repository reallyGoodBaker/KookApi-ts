import { api } from './basic';
import { ListQueryOption, ServerOption } from './types';

interface SortListQueryOption extends ListQueryOption {
    sort?: 'id' | '-id'
}

export const list = api<SortListQueryOption>('/api/v3/guild/list')
export const view = api<ServerOption>('/api/v3/guild/view')

interface UserQueryOption extends ListQueryOption, ServerOption {
    channel_id?: string
    search?: string
    role_id?: number
    mobile_verified?: 0 | 1
    active_time?: 0 | 1
    joined_at?: 0 | 1
}
export const userList = api<UserQueryOption>('/api/v3/guild/user-list')

interface NicknameOption extends ServerOption {
    /**
     * 不传则清空昵称
     */
    nickname?: string

    /**
     * 不传则修改当前登陆用户的昵称
     */
    user_id?: string
}
export const nickname = api<NicknameOption>('/api/v3/guild/nickname', 'post')

export const leave = api<ServerOption>('/api/v3/guild/leave', 'post')

interface User extends ServerOption {
    target_id: string
}
export const kickout = api<User>('/api/v3/guild/kickout', 'post')