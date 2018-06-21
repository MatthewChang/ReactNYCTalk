import * as Schema from './schema'

// our final set of functions which take an id a state
// and return our smarter class

export function generateOrm(normalizrSchema) {
  // selectors is a map from object type name (including plurals for arrays)
  // to function which returns
  // the orm object for that object type
  const selectors = {}

  // entityClasses is a map from an object type name to the class of the orm object for that type
  const entityClasses = {}

  // SET CLASSES
  // Loops through schemas. Sets a class constructor function for each schema object.
  // Necessary to provide association functions in objects retrieved from entities state.
  Object.keys(normalizrSchema).forEach(entityName => {
    const entity = normalizrSchema[entityName]
    const entityTableName = normalizrSchema[entityName]._key

    // associations for the current object type
    const associations = entity.schema

    // array of names of associations
    const associationNames = Object.keys(associations || {})

    const entityClass = class {
      constructor(state, attrs) {
        this.__state__ = state
        this.__attrs__ = attrs
        // set attribue values on the class
        Object.keys(attrs).forEach(key => {
          // set the modified id names for the keys
          if (associationNames.includes(key)) {
            this[key] = function() {
              return selectors[key](state, attrs[key])
            }
          } else {
            this[key] = attrs[key]
          }
        })
      }
    }

    selectors[entityName] = (state, id) =>
      new entityClass(state, state.entities[entityTableName][id])

    selectors[entityTableName] = (state, ids) => ids.map(id => selectors[entityName](state, id))
  })
  return selectors
}

const selectors = generateOrm(Schema)
// debugger;
export default selectors
