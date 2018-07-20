/**
 * @description
 * Generate handler functions for a specific Redux reducer
 * based on the "initialState" key names.
 *
 * @param  {Array} handlers
 * @return {Object}
 * @public
 */
export default function createHandlers (handlers) {
  return handlers.reduce((acc, handler) => ({
    ...acc,
    [handler]: (state, action) => ({ ...state, [handler]: { ...state[handler], ...action.payload } })
  }), {});
}
