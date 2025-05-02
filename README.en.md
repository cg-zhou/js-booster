# js-booster

High-performance JavaScript utility library, providing components like virtual scrolling to optimize rendering performance for large datasets.

<p align="center">
  <a href="https://www.npmjs.com/package/js-booster"><img src="https://img.shields.io/npm/v/js-booster.svg" alt="Version"></a>
  <a href="https://www.npmjs.com/package/js-booster"><img src="https://img.shields.io/npm/dm/js-booster.svg" alt="Downloads"></a>
  <a href="https://github.com/cg-zhou/js-booster/blob/main/LICENSE"><img src="https://img.shields.io/npm/l/js-booster.svg" alt="License"></a>
</p>

English | [简体中文](./README.md)

## Features

- 🚀 **High-performance Virtual Scrolling** - Easily render millions of records while maintaining smooth scrolling
- 🔄 **Dynamic Height Adaptation** - Automatically handles extremely large datasets to prevent DOM height overflow
- 🎯 **Simple API** - Intuitive interface design for quick integration into any project
- 📦 **Lightweight** - Zero dependencies, small footprint, fast loading
- 🔧 **Highly Customizable** - Support for custom rendering functions to meet various UI requirements

## Installation

### NPM

```bash
npm install js-booster
```

### CDN

```html
<!-- Production (minified) -->
<script src="https://unpkg.com/js-booster/dist/js-booster.min.js"></script>

<!-- Development (unminified) -->
<script src="https://unpkg.com/js-booster/dist/js-booster.js"></script>
```

## Usage

### Browser Direct Reference

```html
<!-- Using CDN -->
<script src="https://unpkg.com/js-booster/dist/js-booster.min.js"></script>

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

## Examples

Check out the [live examples](https://cg-zhou.github.io/js-booster/examples) or [example code](https://github.com/cg-zhou/js-booster/tree/main/examples).

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
| maxHeight | Number | 26840000 | Maximum height in pixels for the content wrapper |

#### Methods

| Method | Parameters | Return | Description |
|-----|------|-------|------|
| updateItems | (items: Array) | void | Update data items and re-render |
| scrollToIndex | (index: Number) | void | Scroll to specified index position |
| refresh | () | void | Refresh current view |
| destroy | () | void | Destroy component and release resources |

## Performance Benchmarks

js-booster virtual scrolling component maintains smooth performance even with millions of records:

- 1 million items: Initialization time < 50ms
- Scrolling performance: Stable at 60fps
- Memory usage: 90%+ reduction compared to traditional rendering


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

