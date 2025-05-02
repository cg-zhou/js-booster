# js-booster

高性能 JavaScript 工具库，提供虚拟滚动等组件，用于优化大数据量渲染性能。

## 安装

### NPM

```bash
npm install js-booster
```

### CDN

```html
<!-- 生产环境（压缩版） -->
<script src="https://unpkg.com/js-booster/dist/js-booster.min.js"></script>

<!-- 开发环境（未压缩） -->
<script src="https://unpkg.com/js-booster/dist/js-booster.js"></script>
```

## 使用方法

### 浏览器直接引用

```html
<!-- 使用 CDN -->
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

### NPM 模块引入

```javascript
import { VirtualScroll } from 'js-booster';

const data = Array.from({ length: 10000 }, (_, i) => ({ id: i, name: `Item ${i}` }));

const virtualScroll = new VirtualScroll({
  container: document.getElementById('container'),
  items: data,
  itemHeight: 40,
  renderItem: (item) => {
    // 自定义渲染逻辑
  }
});

// 更新数据
function updateData(newData) {
  virtualScroll.updateItems(newData);
}

// 滚动到指定位置
function scrollToItem(index) {
  virtualScroll.scrollToIndex(index);
}
```

## API 参考

### VirtualScroll

#### 构造函数选项

| 选项 | 类型 | 默认值 | 描述 |
|-----|------|-------|------|
| container | HTMLElement | 必填 | 滚动容器元素 |
| items | Array | [] | 要渲染的数据项数组 |
| itemHeight | Number | 40 | 每个列表项的高度（像素） |
| bufferSize | Number | 10 | 可视区域外的缓冲项数量 |
| renderItem | Function | - | 自定义项目渲染函数 |
| renderHeader | Function | - | 自定义头部渲染函数 |

#### 方法

| 方法 | 参数 | 返回值 | 描述 |
|-----|------|-------|------|
| updateItems | (items: Array) | void | 更新数据项并重新渲染 |
| scrollToIndex | (index: Number) | void | 滚动到指定索引位置 |
| refresh | () | void | 刷新当前视图 |
| destroy | () | void | 销毁组件，释放资源 |

## 许可证

本项目采用 MIT 许可证。详情请查看 [LICENSE](LICENSE) 文件。
