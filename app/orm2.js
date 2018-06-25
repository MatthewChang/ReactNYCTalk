import * as Schema from './schema'

// our final set of functions which take an id a state
// and return our smarter class

  export function generateOrm(normalizrSchema) {
    const selectors = {}
    Object.keys(normalizrSchema).forEach(entityName => {
      const entity = normalizrSchema[entityName]
      const entityTableName = normalizrSchema[entityName]._key
      const associations = entity.schema

      selectors[entityName] = (state, id) => state.entities[entityTableName][id]
      selectors[entityTableName] = (state, ids) => ids.map(id => selectors[entityName](state, id))
    })
    return selectors
  }

const selectors = generateOrm(Schema)
// debugger;
export default selectors
