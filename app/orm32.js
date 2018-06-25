import * as Schema from './schema'

// our final set of functions which take an id a state
// and return our smarter class

export function generateOrm(normalizrSchema) {
  const selectors = {}
  Object.keys(normalizrSchema).forEach(entityName => {
    const entity = normalizrSchema[entityName]
    const entityTableName = normalizrSchema[entityName]._key
    const associations = entity.schema

    selectors[entityName] = (state, id) => {
      // create a copy of the raw entities values
      let rawAttributes = Object.assign({}, state.entities[entityTableName][id])
      Object.keys(associations).forEach(key => {
        let id = rawAttributes[key]
        rawAttributes[key] = () => selectors[key](state, id)
      })
      return rawAttributes
    }

    selectors[entityTableName] = (state, ids) => ids.map(id => selectors[entityName](state, id))
  })
  return selectors
}

const selectors = generateOrm(Schema)
// debugger;
export default selectors
