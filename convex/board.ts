import { v } from 'convex/values'
import { mutation } from './_generated/server'

const images = (function () {
  return Array.from({ length: 10 })
    .fill(10)
    .map((_, i) => `/placeholders/${i + 1}.svg`)
})()

const getRandomImage = () => images[Math.floor(Math.random() * images.length)]

export const create = mutation({
  args: {
    orgId: v.string(),
    title: v.string()
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthorized')
    }

    const randomImage = getRandomImage()
    const board = await ctx.db.insert('boards', {
      title: args.title,
      orgId: args.orgId,
      authorId: identity.subject,
      authorName: identity.name!,
      imageUrl: randomImage
    })

    return board
  }
})

export const remove = mutation({
  args: { id: v.id('boards') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()

    if (!identity) {
      throw new Error('Unauthorized')
    }

    // TODO: later check to delete favourite relation well
    await ctx.db.delete(args.id)
  }
})
