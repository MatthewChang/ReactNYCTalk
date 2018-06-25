import { schema } from 'normalizr'

const userProcessStrategy = (value, parent, key) => {
  switch (key) {
    case 'author':
      return { ...value, posts: [parent.id] }
    case 'user':
      return { ...value, comments: [parent.id] }
    default:
      return { ...value }
  }
}

const userMergeStrategy = (entityA, entityB) => ({
  ...entityA,
  ...entityB,
  posts: [...(entityA.posts || []), ...(entityB.posts || [])],
  comments: [...(entityA.comments || []), ...(entityB.comments || [])]
})

export const user = new schema.Entity(
  'users',
  {
    comments: [comment]
  },
  {
    mergeStrategy: userMergeStrategy,
    processStrategy: userProcessStrategy
  }
)

export const comment = new schema.Entity(
  'comments',
  {
    user: user
  },
  {
    processStrategy: (value, parent) => ({ ...value, post: parent.id })
  }
)

export const post = new schema.Entity('posts', {
  author: user,
  comments: [comment]
})
