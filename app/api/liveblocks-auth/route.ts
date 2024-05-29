import { auth, currentUser } from '@clerk/nextjs/server'
import { Liveblocks } from '@liveblocks/node'
import { ConvexHttpClient } from 'convex/browser'
import { api } from '~/convex/_generated/api'

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!)

const liveblocks = new Liveblocks({
  secret:
    'sk_dev_ryQViAO151F_iQcpX-seIlk_yR7rTdk5M2YW0tDQFEfautfkk9--tr7IxEBQMfk0'
})

export async function POST(request: Request) {
  const authorization = auth()
  const user = await currentUser()

  if (!authorization || !user) {
    return new Response('Unauthorized', { status: 403 })
  }

  const { room } = await request.json()
  const board = await convex.query(api.board.get, { id: room })

  if (board?.orgId !== authorization.orgId) {
    return new Response('Unauthorized', { status: 403 })
  }

  const userInfo = {
    name: user.firstName || 'who u',
    picture: user.imageUrl!
  }

  // Start an auth session inside your endpoint
  const session = liveblocks.prepareSession(
    user.id,
    {
      userInfo
    } // Optional
  )

  if (room) {
    session.allow(room, session.FULL_ACCESS)
  }

  const { status, body } = await session.authorize()

  return new Response(body, { status })
}
