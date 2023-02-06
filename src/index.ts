import { list, view, userList } from './http/guild'

const token = 'Bot 1/MTUyOTg=/SKcPr1nEzxIzhs7W+5vQTA=='

    ; (async () => {
        console.log((await list(token)).data)
        console.log(await view(token, { guild_id: '9247774535624182' }))
        console.log(await userList(token, { guild_id: '9247774535624182' }))

    })()