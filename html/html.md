### 对html 语义化的理解
html 语义化就是指使用带有语义的标签来编写html结构，让html在没有css的情况也能很好的理解整个页面结构。
优点：
1. 有利于代码的可读性，维护性更好
2. 利于网站的seo，让爬虫爬取更多有效信息
3. 利于盲人阅读器，屏幕阅读器
4. 用户体验更好
少通篇使用div，span 标签

### 页面的重绘和重排
浏览器渲染页面步骤
1. 解析html文件，构建dom 节点树
2. 解析css文件，生成rule 树
3. 结合dom 树和css rule 树 生成渲染树
4. 布局渲染树，计算每个节点的尺寸 距离等 （重排过程）
5. 绘制渲染树，遍历渲染树使用ui后端层绘制每个节点


页面的重排（回流 reflow）是值改变页面布局，结构，尺寸会造成浏览器重新创建渲染树，然后重新绘制渲染树更新页面（重排肯定会触发重绘）
页面的重绘（repaint）是值在改变某些样式例如字体颜色 背景颜色等只有外观改变的操作，浏览器重新绘制（重绘不会触发重排）
重排的时机：
1. 修改dom
2. 修改尺寸
3. 内容改变
4. 页面首次渲染
等等
页面优化可以减少重排重绘，批量操作dom，多次获取的样式利用缓存。

### meta viewport
viewport 是指浏览器用来显示网页的区域，可能宽度会比可视区域大，也可能比可视区域小。一般情况下浏览器都有自己的默认宽度。
ppk 把移动设备上有3个viewport layout viewport、visual viewport、ideal viewport。ideal viewport最适合移动设备，不同设备的这个宽度不一样，
但是ideal viewport 的宽度会等于设备宽度。
1. layout viewport : viewport 宽度大于可视区域宽度
2. visual viewport： viewport 宽度等于可视区域宽度
3. ideal viewport：等于设备宽度

meta 设置viewport ，默认情况是layout viewport 需要设置为meat viewport 的width = device-width
viewport content 属性值：
1. width:viewport 宽度，一般移动设备为 device-width 也可以设置为正整数
2. inital-scale：默认缩放比例，一般设为1.0 可为小数
3. user-scalable：是否禁止用户缩放
4. height：viewport 的高度，一般不会设置
5. minimum-scale：允许用户缩放的最小缩放比例
6. maxmum-scale：允许用户缩放的最大比例

iphone 手机上设置width=device-width 无论横屏还是竖屏都是竖屏的宽度
ie 上设置inital-scale = 1 无论横屏还是竖屏都是竖屏的宽度

为了兼容性最佳实践：
<meta name="viewport" content="width=device-width, initial-scale=1.0">

