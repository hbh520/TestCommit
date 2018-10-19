## 小程序学习课程  

### 第三方资源   
* 微信官方weui wxss文件库：https://github.com/Tencent/weui-wxss

### 细节经验总结

#### 13节
Hidden是通过opacity，visibility还是display方式，其实前两者虽然不可见但是都会占用页面布局，
这里的Hidden可以认为是该节点对象已经生成，只是未添加到父节点中。   

#### 15节
在选择使用if与hidden时，首先Hidden在初始化时消耗较高，if在有切换时消耗较高。所以在选择时如果存在经常
切换则可以选择hidden。

#### 16节
两种引用模板的方式：include和template
区别：include只会引用除template内容外的内容，
inport只会引用template内的的内容，动态的传入数据，is表示引用的模板名称，data表示传入模板的数据

#### 17节
* rpx单位是微信小程序中css的尺寸单位，rpx可以根据屏幕宽度进行自适应。规定屏幕宽为750rpx。如在 iPhone6 上，屏幕宽度为375px，共有750个物理像素，则750rpx = 375px = 750物理像素，1rpx = 0.5px = 1物理像素。   
* rem（font size of the root element）是指相对于根元素的字体大小的单位。简单的说它就是一个相对单位。看到rem大家一定会想起em单位，em（font size of the element）是指相对于父元素的字体大小的单位。它们之间其实很相似，只不过一个计算的规则是依赖根元素一个是依赖父元素计算。   

#### 30节   
* 无论`hover-stop-propagation`属性为任何值，均会父类试图组件无法接受到点击事件。   

#### 39节   
* 当按钮指定`Type`为`default`后通过属性`hover-class`指定的背景色将无法体现。   

#### 51节   
* 1.6.0 版本开始，该组件不再维护。建议使用能力更强的 wx.createInnerAudioContext 接口