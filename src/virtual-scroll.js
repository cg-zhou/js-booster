/**
 * js-booster - High-performance frontend library
 * VirtualScroll - Virtual scrolling implementation
 * @version __VERSION__
 * @author https://cg-zhou.top/
 * @license MIT
 */

class VirtualScroll {
  /**
   * Create a virtual scroll instance
   * @param {Object} options Configuration options
   * @param {HTMLElement} options.container Scroll container element
   * @param {Array} options.items Data items to display
   * @param {number} [options.itemHeight=20] Height of each list item (pixels)
   * @param {number} [options.bufferSize=10] Number of buffer items outside the visible area
   * @param {Function} [options.renderItem] Custom item rendering function
   * @param {Function} [options.renderHeader] Custom header rendering function
   * @param {number} [options.maxHeight=26840000] Maximum height in pixels for the content wrapper
   */
  constructor(options) {
    this.container = options.container;
    this.items = options.items || [];
    this.itemHeight = options.itemHeight || 20;
    this.bufferSize = options.bufferSize || 10;
    this.customRenderItem = options.renderItem;
    this.customRenderHeader = options.renderHeader;
    this.maxHeight = options.maxHeight || 26840000; // Add maximum height limit to prevent DOM height overflow

    this.visibleStartIndex = 0;
    this.visibleEndIndex = 0;
    this.scrollContainer = null;
    this.contentWrapper = null;
    this.contentContainer = null;
    this.totalHeight = this.items.length * this.itemHeight;
    this.heightScale = 1; // Height scaling factor

    // If total height exceeds maximum height, calculate scaling factor
    if (this.totalHeight > this.maxHeight) {
      this.heightScale = this.maxHeight / this.totalHeight;
    }

    this.initialize();
  }

  /**
   * Initialize virtual scroll component
   * @private
   */
  initialize() {
    // Clear container
    this.container.innerHTML = '';

    // Create scroll container
    this.scrollContainer = document.createElement('div');
    // Add inline styles
    Object.assign(this.scrollContainer.style, {
      flex: '1',
      overflow: 'auto',
      position: 'relative',
      minHeight: '0',
      height: '100%',
      boxSizing: 'border-box'
    });

    // If there's a custom header render function, render the header
    if (this.customRenderHeader) {
      const header = this.customRenderHeader();
      if (header) {
        this.scrollContainer.appendChild(header);
      }
    }

    // Create content wrapper
    this.contentWrapper = document.createElement('div');
    // Add inline styles
    Object.assign(this.contentWrapper.style, {
      position: 'relative',
      width: '100%'
    });

    // Use scaled height to ensure it doesn't exceed browser limits
    const scaledHeight = this.totalHeight * this.heightScale;
    this.contentWrapper.style.height = `${scaledHeight}px`;

    // Create content container
    this.contentContainer = document.createElement('div');
    // Add inline styles
    Object.assign(this.contentContainer.style, {
      position: 'absolute',
      width: '100%',
      left: '0'
    });

    // Add scroll event listener
    this.scrollContainer.addEventListener('scroll', this.handleScroll.bind(this));

    // Assemble DOM
    this.contentWrapper.appendChild(this.contentContainer);
    this.scrollContainer.appendChild(this.contentWrapper);
    this.container.appendChild(this.scrollContainer);

    // Render initial visible items
    this.renderVisibleItems(0, Math.min(100, this.items.length));
  }

  /**
   * Handle scroll event
   * @private
   */
  handleScroll() {
    const scrollTop = this.scrollContainer.scrollTop;
    const containerHeight = this.scrollContainer.clientHeight;

    // Consider scaling factor in calculations
    const realScrollTop = scrollTop / this.heightScale;

    // Calculate visible range
    const startIndex = Math.max(0, Math.floor(realScrollTop / this.itemHeight) - this.bufferSize);
    const endIndex = Math.min(
      this.items.length,
      Math.ceil((realScrollTop + containerHeight / this.heightScale) / this.itemHeight) + this.bufferSize
    );

    // Only update when visible range changes
    if (startIndex !== this.visibleStartIndex
       || endIndex !== this.visibleEndIndex
       || endIndex === 0) {
      this.renderVisibleItems(startIndex, endIndex);

      this.visibleStartIndex = startIndex;
      this.visibleEndIndex = endIndex;
    }
  }

  /**
   * Render visible items
   * @param {number} startIndex Start index
   * @param {number} endIndex End index
   * @private
   */
  renderVisibleItems(startIndex, endIndex) {
    // Clear content container
    this.contentContainer.innerHTML = '';

    // Set position considering scaling factor
    this.contentContainer.style.transform = `translateY(${startIndex * this.itemHeight * this.heightScale}px)`;

    // Render visible items
    for (let i = startIndex; i < endIndex; i++) {
      const item = this.items[i];

      if (this.customRenderItem) {
        // Use custom render function
        const itemElement = this.customRenderItem(item, i);
        if (itemElement) {
          // Only set necessary height styles, other styles are determined by the caller
          itemElement.style.height = `${this.itemHeight * this.heightScale}px`;
          itemElement.style.boxSizing = 'border-box';
          itemElement.style.width = '100%';

          this.contentContainer.appendChild(itemElement);
        }
      } else {
        // Use default rendering - very simple default implementation
        const row = document.createElement('div');
        Object.assign(row.style, {
          height: `${this.itemHeight * this.heightScale}px`,
          width: '100%',
          boxSizing: 'border-box',
          padding: '8px',
          borderBottom: '1px solid #eee'
        });
        row.textContent = JSON.stringify(item);
        this.contentContainer.appendChild(row);
      }
    }
  }

  /**
   * Update data items and re-render
   * @param {Array} items New data items array
   * @public
   */
  updateItems(items) {
    this.items = items || [];
    this.totalHeight = this.items.length * this.itemHeight;

    // Recalculate scaling factor
    this.heightScale = 1;
    if (this.totalHeight > this.maxHeight) {
      this.heightScale = this.maxHeight / this.totalHeight;
    }

    // Ensure height is set correctly
    if (this.contentWrapper) {
      this.contentWrapper.style.height = `${this.totalHeight * this.heightScale}px`;
    }

    this.visibleStartIndex = 0;
    this.visibleEndIndex = 0;

    // Force recalculation of visible items
    this.handleScroll();
  }

  /**
   * Scroll to specified index
   * @param {number} index Index of the item to scroll to
   * @public
   */
  scrollToIndex(index) {
    if (index >= 0 && index < this.items.length) {
      // Apply scaling factor when scrolling
      this.scrollContainer.scrollTop = index * this.itemHeight * this.heightScale;
    }
  }

  /**
   * Destroy component, remove event listeners, etc.
   * @public
   */
  destroy() {
    if (this.scrollContainer) {
      this.scrollContainer.removeEventListener('scroll', this.handleScroll);
    }
    if (this.container) {
      this.container.innerHTML = '';
    }
    this.items = null;
    this.container = null;
    this.scrollContainer = null;
    this.contentWrapper = null;
    this.contentContainer = null;
  }

  /**
   * Refresh virtual scroll, re-render current visible items
   * @public
   */
  refresh() {
    this.handleScroll();
  }

  /**
   * Get scroll container element
   * @returns {HTMLElement} Scroll container element
   * @public
   */
  getScrollContainer() {
    return this.scrollContainer;
  }
}

// Export VirtualScroll class
export { VirtualScroll };
