/**
 * @description
 * Polyfill for request animation frame fn.
 *
 * @return {Function}
 * @public
 */
export default function reqAnimationFrame () {
  return window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          window.setTimeout(callback, 1000 / 60);
        };
}
