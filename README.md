## KingTable

支持大量数据显示，轻松显示1W+数据。

## 使用方式

### 安装

在浏览器引用
```
<script type="text/javascript" src="/build/index.js"></script>
```
或

```
npm install zsea-king-table
```

### 依赖项

jQuery

### API

#### 初始化

```javascript
var table=new KingTable(container, settings)
```

* container - 显示表格的容器，必须是一个jQuery对象。
* settings - 配置项。

### 接口

#### 添加数据

```javascript
table.push(items,isBatch);
```

* items - 要添加的数据。
* isBatch - 是否是批量添加。

**注！**若是批量添加，```items```必须是一个数组。

#### 修改数据

```javascript
table.set(index,item);
```

* index - 需要修改的元素位置。
* item - 修改后的元素值。

#### 获取数据

```javascript
table.get(index)
```

* index - 需要读取的元素的位置。

#### 获取数据总数

```javascript
var total=table.length;
```

#### 删除元素

```javascript
var items=table.remove(index,howmany);
```

* index - 删除数据的位置，使用负数可从结尾处规定位置。
* howmany - 要删除的数量。如果设置为 0，则不会删除。

#### 配置


* cols - 数组。显示的列的配置。
* rowHeight - 每行的高度。
* headerHeight - 表头的高度。
* size - 一次需要显示的数据量。
* class - 表格所应用的样式名称。
* props - Object。kv键值对，将添加到表格属性上。

##### 列配置

* title - 表头文字，支持html格式。
* width - 宽度。
* field - 必填。数据字段。
* render - 显示方法。方法接受三个参数(value, row, index)。

##### render方法

* value - 当前单元格的值。
* row - 当前行的值。
* index - 当前行的索引。

#### 配置示例

```javascript
{
        cols: [{
            title: "人物",
            width: 150,
            field: "name",
            render: function (value, row, index) {
                return value;
            }
        }, {
            title: "民族",
            width: 150,
            field: "mz",
            render: function (value, row, index) {
                return value;
            }
        }, {
            title: "出场时间",
            width: 200,
            field: "time",
            render: function (value, row, index) {
              return value;
            }
        }, {
            title: "格言",
            field: "lng"
        }],
        rowHeight: 40,
        headerHeight: 40,
        size: 20,
        class: "layui-table"
    }
```