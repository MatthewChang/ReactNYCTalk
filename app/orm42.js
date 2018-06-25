import * as Schema from './schema'

// our final set of functions which take an id a state
// and return our smarter class

export function generateOrm(normalizrSchema) {
  const selectors = {}
  Object.keys(normalizrSchema).forEach(entityName => {
    const entity = normalizrSchema[entityName]
    const entityTableName = normalizrSchema[entityName]._key
    const associations = entity.schema

    const associationNames = Object.keys(associations)
    const associationNamesToEntityNames = {}
    associationNames.forEach(name => {
      if (associations[name] instanceof Array) {
        const assocSchemaArrayName = associations[name][0]._key
        associationNamesToEntityNames[name] = assocSchemaArrayName
      } else {
        const assocSchemaName = _.findKey(normalizrSchema, obj => obj === associations[name])
        associationNamesToEntityNames[name] = assocSchemaName
      }
    })

    selectors[entityName] = (state, id) => {
      // create a copy of the raw entities values
      let rawAttributes = Object.assign({}, state.entities[entityTableName][id])
      Object.keys(associations).forEach(key => {
        let id = rawAttributes[key]
        rawAttributes[key] = () => selectors[associationNamesToEntityNames[key]](state, id)
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
