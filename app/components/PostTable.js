import PropTypes from 'prop-types'
import { PropTypes as SelectPropTypes } from '../orm6'
import React from 'react'

// Stage 4/5
const Comment = ({ comment }) => (
  //<li style={{ color: comment.isSpam() ? 'red' : 'black' }}>
  <li>
    {comment.content} - {comment.user.name}
  </li>
)

Comment.propTypes = {
  name: PropTypes.string,
  value: PropTypes.string
}

const PostTable = ({ posts }) => {
  //console.log(posts)
  const rows = posts.map(post => {
    //const comments = post.comments.map(
    //comment =>
    //// console.log(comment);
    //// ehh things start to get gross here
    //// return <Comment key= name="test" value="body"/>;
    //null
    //)
    // Stage 4
    const comments = post.comments.map(comment => <Comment key={comment.id} comment={comment} />)
    return (
      <div key={post.id}>
        <h1>Title: {post.title}</h1>
        <div>
          <h2>Comments:</h2>
          <ul>{comments}</ul>
        </div>
      </div>
    )
  })
  return <div>{rows}</div>
}

PostTable.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object)
}

//// Stage 6
//PostTable.propTypes = {
//posts: PropTypes.arrayOf(SelectPropTypes.post)
//}

export default PostTable
