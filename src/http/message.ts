import { api } from './basic'
import { Message, Target } from './types';

interface MessageListOption extends Target, Message {
    pin?: 0 | 1
    flag?: 'before' | 'around' | 'after'
    page_size?: number
}
export const list = api<MessageListOption>('/api/v3/message/list')

export const view = api<Message>('/api/v3/message/view')

interface MessageOption extends Target {
    content: string
    type?: 1 | 9 | 10
    quote?: string
    nonce?: string
    temp_target_id?: string
}
export const create = api<MessageOption>('/api/v3/message/create', 'post')

interface MessageUpdateOption extends Message {
    content: string
    quote?: string
    temp_target_id?: string
}
export const update = api<MessageUpdateOption>('/api/v3/message/update', 'post')

export const remove = api<Message>('/api/v3/message/delete', 'post')

interface MessageWithEmoji extends Message {
    emoji: string
}
export const reactionList = api<MessageWithEmoji>('/api/v3/message/reaction-list')

export const addReaction = api<MessageWithEmoji>('/api/v3/message/add-reaction', 'post')

interface MWEDeleteOption extends MessageWithEmoji {
    user_id?: string
}
export const deleteReaction = api<MWEDeleteOption>('/api/v3/message/delete-reaction', 'post')