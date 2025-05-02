# js-booster

High-performance JavaScript utility library, providing components like virtual scrolling to optimize rendering performance for large datasets.

## Installation

### NPM

```bash
npm install js-booster
```

### CDN

```html
<!-- Production (minified) -->
<script src="https://unpkg.com/js-booster@1.0.1/dist/js-booster.min.js"></script>

<!-- Development (unminified) -->
<script src="https://unpkg.com/js-booster@1.0.1/dist/js-booster.js"></script>
```

## Usage

### Browser Direct Reference

```html
<!-- Using CDN -->
<script src="https://unpkg.com/js-booster@1.0.1/dist/js-booster.min.js"></script>

<div id="container" style="height: 500px;"></div>

<script>
  const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

  const virtualScroll = new JsBooster.VirtualScroll({
    container: document.getElementById('container'),
    items: data,
    itemHeight: 40,
    bufferSize: 10,
    renderItem: (item, index) => {
      const div = document.createElement('div');
      div.style.display = 'flex';
      div.style.borderBottom = '1px solid #eee';
      div.innerHTML = `
        <div style="width: 80px; padding: 10px;">${item.id}</div>
        <div style="flex: 1; padding: 10px;">${item.name}</div>
      `;
      return div;
    },
    renderHeader: () => {
      const header = document.createElement('div');
      header.style.display = 'flex';
      header.style.fontWeight = 'bold';
      header.style.backgroundColor = '#f8f9fa';
      header.style.borderBottom = '2px solid #dee2e6';
      header.innerHTML = `
        <div style="width: 80px; padding: 10px;">ID</div>
        <div style="flex: 1; padding: 10px;">Name</div>
      `;
      return header;
    }
  });
</script>
```

### NPM Module Import

```javascript
import { VirtualScroll } from 'js-booster';

const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

const virtualScroll = new VirtualScroll({
  container: document.getElementById('container'),
  items: data,
  itemHeight: 40,
  renderItem: (item) => {
    // Custom rendering logic
  }
});

// Update data
function updateData(newData) {
  virtualScroll.updateItems(newData);
}

// Scroll to specific position
function scrollToItem(index) {
  virtualScroll.scrollToIndex(index);
}
```

## API Reference

### VirtualScroll

#### Constructor Options

| Option | Type | Default | Description |
|-----|------|-------|------|
| container | HTMLElement | Required | Scroll container element |
| items | Array | [] | Data items array to render |
| itemHeight | Number | 40 | Height of each list item (pixels) |
| bufferSize | Number | 10 | Number of buffer items outside the visible area |
| renderItem | Function | - | Custom item rendering function |
| renderHeader | Function | - | Custom header rendering function |

#### Methods

| Method | Parameters | Return | Description |
|-----|------|-------|------|
| updateItems | (items: Array) | void | Update data items and re-render |
| scrollToIndex | (index: Number) | void | Scroll to specified index position |
| refresh | () | void | Refresh current view |
| destroy | () | void | Destroy component and release resources |

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
