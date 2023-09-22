


/**
 * Generate a dynamic regular expression based off of a replaceable and possibly filtered value.
 *
 * @param {string} filter The base filter to use. May be extended by `extras`.
 * @param {string} query The value to use in the regular expression
 * @param {object} extras An object of regular expressions to replace and filter the query
 */
export const generateDynamicRegExp = (
  filter,
  query = '',
  extras = {}
) => {
  const escapeRegExp = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, '\\$&')
  }

  let find = filter.replace(/{{(.*?)}}/g, (_m, $1) => {
    const key = $1.trim()
    const queryFilter = extras[key]
    if (key !== 'query' && queryFilter) {
      const matcher = new RegExp(queryFilter, 'i')
      const matches = query.match(matcher)

      if (matches) {
        return escapeRegExp(matches[1])
      }

      return ''
    }
    return escapeRegExp(query)
  })

  find = '^(?:' + find + ')$'

  return new RegExp(find, 'i')
}
