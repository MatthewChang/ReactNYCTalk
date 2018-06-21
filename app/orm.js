import * as Schema from './schema'
import _ from 'lodash'
import comment from './Comment'
import './styles/posts.scss'

// our final set of functions which take an id a state
// and return our smarter class

export function generateOrm(normalizrSchema, classExtensions) {
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

    const assiciationType = key => {
      switch (associations[key].constructor.name) {
        case 'EntitySchema':
          return 'Entity'
        case 'Array':
          return 'Array'
        default:
          return null
      }
    }

    const associationNamesToEntityNames = {}

    // Set association functions
    associationNames.forEach(name => {
      // If this association refers to another single object type
      if (assiciationType(name) === 'Entity') {
        // Find the entity name of the association
        // since name may not use same string as entity name
        const assocSchemaName = _.findKey(normalizrSchema, obj => obj === associations[name])
        associationNamesToEntityNames[name] = assocSchemaName
      } else if (assiciationType(name) === 'Array') {
        // Find assocSchemaArrayName since name may not use same string as entities name
        const assocSchemaArrayName = associations[name][0]._key
        associationNamesToEntityNames[name] = assocSchemaArrayName
      } // Ignoring objects or other schema types
    })

    const entityClass = class {
      constructor(state, attrs) {
        this.__state__ = state
        this.__attrs__ = attrs
        // set attribue values on the class
        Object.keys(attrs).forEach(key => {
          // set the modified id names for the keys
          if (!associationNames.includes(key)) {
            this[key] = attrs[key]
          }
        })
      }
    }

    Object.defineProperty(entityClass, 'name', { value: entityName })
    entityClass.prototype = Object.create(_.get(classExtensions, [entityName, 'prototype'], {}))
    entityClass.prototype.constructor = entityClass

    // set association functions
    associationNames.forEach(name => {
      function selectObject() {
        return selectors[associationNamesToEntityNames[name]](this.__state__, this.__attrs__[name])
      }
      entityClass.prototype[name] = selectObject
    })

    // Assign to the entityClasses map
    entityClasses[entityName] = entityClass

    selectors[entityName] = (state, id) =>
      new entityClass(state, state.entities[entityTableName][id])

    selectors[entityTableName] = (state, ids) => ids.map(id => selectors[entityName](state, id))
  })
  return { selectors, entityClasses }
}

const { selectors, entityClasses } = generateOrm(Schema, { comment })

function proptypesFor(classes) {
  return _.mapValues(classes, klass => (props, propName, componentName) => {
    if (!(props[propName] instanceof klass)) {
      return new Error(
        `Invalid prop \`${propName}\` supplied to \`${componentName}\`. Must be an ORM class of type '${
          klass.name
        }' Validation failed.`
      )
    }
    return undefined
  })
}
export const PropTypes = proptypesFor(entityClasses)
export default selectors
