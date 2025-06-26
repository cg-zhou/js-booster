/**
 * js-booster - High-performance frontend library
 * @version __VERSION__
 * @author https://cg-zhou.top/
 * @license MIT
 */

import { VirtualScroll } from './virtual-scroll';

// Export all components
export { VirtualScroll };

// If in browser environment, add to global object
if (typeof window !== 'undefined') {
  window.JsBooster = {
    VirtualScroll
  };
}
