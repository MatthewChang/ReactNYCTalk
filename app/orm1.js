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

    console.log(entity)
    console.log(entityTableName)
    console.log(associations)
    // selectors[entityName] = ...
  })
}

const selectors = generateOrm(Schema)
// debugger;
export default selectors
