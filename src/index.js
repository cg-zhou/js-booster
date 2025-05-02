/**
 * js-boost - High-performance frontend library
 * @version 1.0.0
 * @author js-boost team
 * @license MIT
 */

const { VirtualScroll } = require('./virtual-scroll');

// Export all components
module.exports = {
  VirtualScroll
};

// If in browser environment, add to global object
if (typeof window !== 'undefined') {
  window.JsBoost = {
    VirtualScroll
  };
}
