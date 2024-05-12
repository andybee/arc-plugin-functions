const { isAbsolute, join } = require('node:path')

const pragmaName = 'functions' // which @pragma to look for in app.arc
const validationPattern = /^[a-zA-Z0-9/\-._]*$/ // regex for valid function name

/**
 * Asserts name string is valid
 *
 * @param {string} value - proposed name
 * @throws Error
 */
function assertValidName (value) {
  if (!validationPattern.test(value)) {
    throw new Error(`Invalid ${pragmaName} item: '${value}' must match ${validationPattern}`)
  }
}

/**
 * Builds default src path for a given function name.
 *
 * @param {string} name - function name
 * @returns {string}
 */
const buildPath = (name) => join(pragmaName, name)

module.exports = {
  set: {
    customLambdas: ({ arc, inventory }) => {
      // check the plugin is configured
      if (!Array.isArray(arc[pragmaName])) {
        return
      }
      // iterate config array and build customLambdas response
      const lambdas = arc[pragmaName].map((param) => {
        // // check for invalid config
        if (Array.isArray(param)) {
          throw new Error(`Invalid ${pragmaName} item: ${param}`)
        }
        // build the name/src from config
        let name
        let src
        // param can take one of two forms
        if (typeof param === 'string') {
          // string = name declaration only, build name-based path
          name = param
          assertValidName(name)
          src = buildPath(name)
        }
        else {
          // object = { name: params } - additional params supplied, parse those of interest
          [ name ] = Object.keys(param)
          assertValidName(name)
          src = param[name]?.src || buildPath(name) // name-based path as fallback if no src set
        }
        return {
          name,
          src: !isAbsolute(src) ? join(inventory.inv._project.src, src) : src,
        }
      })
      return lambdas
    },
  },
}
