/**
 * js-boost - High-performance frontend library
 * VirtualScroll - Virtual scrolling implementation
 * @version 1.0.0
 * @author js-boost team
 * @license MIT
 */

class VirtualScroll {
  /**
   * Create a virtual scroll instance
   * @param {Object} options Configuration options
   * @param {HTMLElement} options.container Scroll container element
   * @param {Array} options.items Data items to display
   * @param {number} [options.itemHeight=40] Height of each list item (pixels)
   * @param {number} [options.bufferSize=10] Number of buffer items outside the visible area
   * @param {Function} [options.renderItem] Custom item rendering function
   * @param {Function} [options.renderHeader] Custom header rendering function
   */
  constructor(options) {
    this.container = options.container;
    this.items = options.items || [];
    this.itemHeight = options.itemHeight || 40;
    this.bufferSize = options.bufferSize || 10;
    this.customRenderItem = options.renderItem;
    this.customRenderHeader = options.renderHeader;

    this.visibleStartIndex = 0;
    this.visibleEndIndex = 0;
    this.scrollContainer = null;
    this.contentWrapper = null;
    this.contentContainer = null;

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
        // Add necessary styles
        Object.assign(header.style, {
          position: 'sticky',
          top: '0',
          zIndex: '1',
          width: '100%',
          boxSizing: 'border-box',
          backgroundColor: '#f8f9fa', // 添加背景色，防止内容透过表头
          borderBottom: '2px solid #dee2e6' // 添加底部边框，增强视觉分隔
        });

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
    // 明确设置高度为像素值，确保测试能够通过
    this.contentWrapper.style.height = `${this.items.length * this.itemHeight}px`;

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
    this.renderVisibleItems(0, Math.min(50, this.items.length));
  }

  /**
   * Handle scroll event
   * @private
   */
  handleScroll() {
    const scrollTop = this.scrollContainer.scrollTop;
    const containerHeight = this.scrollContainer.clientHeight;

    // Calculate visible range
    const startIndex = Math.max(0, Math.floor(scrollTop / this.itemHeight) - this.bufferSize);
    const endIndex = Math.min(
      this.items.length,
      Math.ceil((scrollTop + containerHeight) / this.itemHeight) + this.bufferSize
    );

    // Only update when visible range changes
    if (startIndex !== this.visibleStartIndex || endIndex !== this.visibleEndIndex) {
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

    // Set content container position
    this.contentContainer.style.transform = `translateY(${startIndex * this.itemHeight}px)`;

    // Render visible items
    for (let i = startIndex; i < endIndex; i++) {
      const item = this.items[i];

      if (this.customRenderItem) {
        // Use custom render function
        const itemElement = this.customRenderItem(item, i);
        if (itemElement) {
          // Only set necessary height styles, other styles are determined by the caller
          itemElement.style.height = `${this.itemHeight}px`;
          itemElement.style.boxSizing = 'border-box';
          itemElement.style.width = '100%';

          this.contentContainer.appendChild(itemElement);
        }
      } else {
        // Use default rendering - very simple default implementation
        const row = document.createElement('div');
        Object.assign(row.style, {
          height: `${this.itemHeight}px`,
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

    // 确保高度设置正确，使用直接赋值而不是通过 Object.assign
    if (this.contentWrapper) {
      this.contentWrapper.style.height = `${this.items.length * this.itemHeight}px`;
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
      this.scrollContainer.scrollTop = index * this.itemHeight;
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

// 如果在 Node.js 环境中，导出模块
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { VirtualScroll };
}
