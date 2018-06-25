import { connect } from 'react-redux'
import PostTable from '../components/PostTable'
import Select from '../orm_proxy'
import { denormalize } from 'normalizr'
import { user } from '../schema'

const mapStateToProps = state => {
  console.log('Selecting nested')
  console.log(Select.comment(state, 249))
  console.log(Select.comment(state, 249).user)
  console.log(Select.post(state, 1).author)

  return {
    posts: Select.posts(state, Object.keys(state.entities.posts))
  }
}

export default connect(
  mapStateToProps,
  null
)(PostTable)
