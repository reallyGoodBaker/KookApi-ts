import { api } from './basic';

interface TimeRange {
    guild_id: string
    start_time?: number
    end_time?: number
}
export const list = api<TimeRange>('/api/v3/guild-mute/list')