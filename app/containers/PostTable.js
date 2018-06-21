import { connect } from 'react-redux'
import PostTable from '../components/PostTable'
import Select from '../orm0'
import { denormalize } from 'normalizr'
import { user } from '../schema'

const mapStateToProps = state => ({
  posts: Object.values(state.entities.posts)
})

//const mapStateToProps = state => {
////// Stage 2
//console.log(Select.post(state, 1))
//console.log(Select.posts(state, [1, 2]))
//console.log(Select.comment(state, 249))

////// Stage 3
////console.log('Selecting nested')
////console.log(Select.comment(state, 249))
////console.log(Select.comment(state, 249).user())
////console.log(Select.post(state, 1).author())

//// Stage 2
//return {
//posts: Select.posts(state, Object.keys(state.entities.posts))
//}
//}

export default connect(
  mapStateToProps,
  null
)(PostTable)
