## Css 相关问题
### 两种盒子模型
1.标准盒模型：content +  padding + border + margin ; width = content
2.IE 盒模型：width = content + padding + border
设置代码: 
box-sizing:border-box;// IE 盒模型
box-sizing:content-box;// 标准盒模型（默认）

js 如何设置获取盒模型对应的宽和高：
通过dom的样式获取只能取出内联样式的宽高（dom.style.width）
通过dom的样式获取，dom.currentStyle.width ie浏览器，window.getComputedStyle(dom).width chorme,firefox
dom.getBoundingClientRect().width

根据盒模型边距重叠（margin 塌陷）:
父子元素边距重叠，相邻元素边距重叠，取最大值。
bfc 和 ifc

### 如何垂直居中？
1.定高元素使用line-height：高度
2.flex 【align-items:center;】
3.absolute (top:50%;绝对定位居中可以用负边距(定高元素)，transform:translate,)
4.table-cell 

### flex 怎么用，常用属性有哪些？
flex 是弹性布局，用于各种灵活布局 <br/>
常用属性有：<br/>
容器上的属性：<br/>
flex-direction flex的方向，有row row-reverse column column-reverse（垂直排列倒序）<br/>
flex-wrap nowrap wrap wrap-reverse 是否要换行 换行反序<br/>
flex-flow 是flex-direction 和 flex-wrap 的简写  <flex-direction> || <flex-wrap>
justify-content 主轴（横向方向）上的排列方式 space-between space-around center <br/>
align-items 交叉轴（竖向）上的排列方式 center baseline stretch <br/>
align-content<br/>

项目上的属性：<br/>
flex-basis 默认值是auto 如果设置为主轴方向的宽度或者高度 则为固定宽度或者高度<br/>
flex-grow 缩大比例<br/>
flex-shrink 放小比例<br/>
flex flex-basis flex-grow flex-shrink 的简写 浏览器会自动匹配各项值<br/>

### BFC 是什么
block formatting context 块级格式上下文 是块级元素的渲染区域，规定内部的块级元素的布局方式，与外部隔离。<br/>

BFC 的布局规则（原理）：<br/>
内部块级元素垂直往下排列<br/>
内部的块级元素垂直方向的距离由magrin 决定，同一个BFC的相邻box 垂直方向的margin 会发生塌陷<br/>
bfc的区域不会跟float 元素发生重叠 <br/>
计算bfc 高度时候 float的高度也会算进去<br/>
bfc 就是一个隔离区域，内部的元素不会影响外部，外部也不能影响里面。<br/>
每个元素的左外边缘（margin-left)， 与包含块的左边（contain box left）相接触(对于从左往右的格式化，否则相反)。即使存在浮动也是如此。除非这个元素自己形成了一个新的BFC。<br/>


BFC 的创建：
根元素<br/>
浮动 不为none<br/>
position 为absolute 或者 fixed<br/>
display为inline-block, table-cell, table-caption, flex, inline-flex<br/>
块级元素有overflow不为visible<br/>

BFC常用用途：
1. 自适应两栏布局，利用bfc 区域不会跟float 发生重叠<br/>
2. 防止margin 塌陷，将其中一个元素添加一个标签设置为bfc，利用bfc 隔离性质<br/>
3. 清除浮动，利用bfc 区域计算高度 float的高度也会算进去<br/>

### 清除浮动的方法与原理
清除浮动的原因：<br/>
内部子元素浮动之后，父元素的高度会塌陷，不会计算进浮动元素的高度。<br/>

清楚浮动的方法：<br/>
1. 父元素添加overflow：hidden 利用BFC特性， 会把float 计算进高度，缺点超过父元素区域的元素会被隐藏<br/>
2. 父元素添加伪类 ：跟第三条原理相同，用伪类代替空元素 （常用方法）<br/>
3. 添加一个空div 设置clear：both 缺点 需要添加很多空div<br/>
4. 给定父元素高度 

### CSS 选择器优先级

### sass，less 

两者都是css 预编译器，最后编译成css
sass 变量前缀是@ ，less 变量前缀是$ 支持嵌套写法，函数 mixin 等强大功能，能在工作中提高工作效率。

