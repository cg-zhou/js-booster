# js-booster

High-performance JavaScript utility library, providing components like virtual scrolling to optimize rendering performance for large datasets.

## Installation

```bash
npm install js-booster
```

## Usage

### Browser Direct Reference

```html
<script src="path/to/js-booster/src/index.js"></script>

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
      div.className = 'vs-table-row';
      div.innerHTML = `
        <div class="vs-table-cell">${item.id}</div>
        <div class="vs-table-cell">${item.name}</div>
      `;
      return div;
    },
    renderHeader: () => {
      const header = document.createElement('div');
      header.className = 'vs-table-header vs-header';
      header.innerHTML = `
        <div class="vs-table-header-cell">ID</div>
        <div class="vs-table-header-cell">Name</div>
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
