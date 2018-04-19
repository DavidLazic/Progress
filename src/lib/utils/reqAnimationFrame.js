/**
 * @description
 * Polyfill for request animation frame fn.
 *
 * @return {Function}
 * @public
 */
export default function reqAnimationFrame () {
  turn window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame ||
        function (callback) {
          ndow.setTimeout(callback, 1000 / 60);
        };
}
