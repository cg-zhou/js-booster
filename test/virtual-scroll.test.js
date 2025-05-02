/**
 * VirtualScroll component tests
 */

// Mock DOM environment
document.body.innerHTML = '<div id="container" style="height: 500px;"></div>';

// Import Jest
import { jest } from '@jest/globals';

// Import the module being tested
import { VirtualScroll } from '../src/virtual-scroll';

// Test data
const testData = Array.from({ length: 1000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

describe('VirtualScroll', () => {
  let container;
  let virtualScroll;

  // Setup before each test
  beforeEach(() => {
    // Reset DOM
    document.body.innerHTML = '<div id="container" style="height: 500px;"></div>';
    container = document.getElementById('container');

    // Create VirtualScroll instance
    virtualScroll = new VirtualScroll({
      container: container,
      items: testData,
      itemHeight: 40,
      bufferSize: 10,
      renderItem: (item) => {
        const div = document.createElement('div');
        div.textContent = `${item.id}: ${item.name}`;
        return div;
      }
    });
  });

  // Cleanup after each test
  afterEach(() => {
    if (virtualScroll) {
      virtualScroll.destroy();
      virtualScroll = null;
    }
  });

  // Test initialization
  test('should initialize correctly', () => {
    // Check if scroll container was created inside the container
    const scrollContainer = container.querySelector('div');
    expect(scrollContainer).not.toBeNull();

    // Check if content wrapper was created
    const contentWrapper = scrollContainer.querySelector('div');
    expect(contentWrapper).not.toBeNull();

    // Check if content wrapper height is correct (1000 items * 40px)
    expect(contentWrapper.style.height).toBe('40000px');
  });

  // Test rendering visible items
  test('should render visible items', () => {
    // Get content container
    const contentContainer = container.querySelector('div > div > div');
    expect(contentContainer).not.toBeNull();

    // Check if initial visible items were rendered
    const items = contentContainer.querySelectorAll('div');
    expect(items.length).toBeGreaterThan(0);
  });

  // Test updating data
  test('should update items correctly', () => {
    // Update data
    const newData = Array.from({ length: 500 }, (_, i) => ({ id: i, name: `New Item ${i}` }));
    virtualScroll.updateItems(newData);

    // Check if content wrapper height was updated (500 items * 40px)
    // 直接访问 virtualScroll 实例的 contentWrapper
    const contentWrapper = virtualScroll.contentWrapper;
    expect(contentWrapper.style.height).toBe('20000px');
  });

  // Test scrolling to specified index
  test('should scroll to specified index', () => {
    // Simulate scrolling to index 50
    virtualScroll.scrollToIndex(50);

    // Check if scroll position is correct (50 * 40px = 2000px)
    const scrollContainer = container.querySelector('div');
    expect(scrollContainer.scrollTop).toBe(2000);
  });

  // Test destroy method
  test('should destroy correctly', () => {
    // Destroy instance
    virtualScroll.destroy();

    // Check if container was cleared
    expect(container.innerHTML).toBe('');

    // Check if instance properties were cleared
    expect(virtualScroll.container).toBeNull();
    expect(virtualScroll.items).toBeNull();
    expect(virtualScroll.scrollContainer).toBeNull();
    expect(virtualScroll.contentWrapper).toBeNull();
    expect(virtualScroll.contentContainer).toBeNull();
  });

  // Test refresh method
  test('should refresh correctly', () => {
    // Mock handleScroll method
    const handleScrollSpy = jest.spyOn(virtualScroll, 'handleScroll');

    // Call refresh method
    virtualScroll.refresh();

    // Check if handleScroll method was called
    expect(handleScrollSpy).toHaveBeenCalled();

    // Cleanup
    handleScrollSpy.mockRestore();
  });

  // Test getScrollContainer method
  test('should return scroll container', () => {
    // Get scroll container
    const scrollContainer = virtualScroll.getScrollContainer();

    // Check if it returns the correct element
    expect(scrollContainer).toBe(container.querySelector('div'));
  });
});
