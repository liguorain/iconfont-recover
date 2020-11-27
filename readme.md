>[阿里巴巴矢量图标库](https://www.iconfont.cn/) （以下称[iconfont](https://www.iconfont.cn/)）提供了方便的图标分享和管理功能，但是由于其图标项目独立于代码仓库，往往导致**同一项目更换开发人员之后，接任者不能继续管理原来的图标库**，给开发带来各种不便。

由于 [iconfont](https://www.iconfont.cn/) 生成的 `svg` 文件含有图标路径以及图标名数据，因此 (对于保留了此 svg 文件的项目)可以从此 `svg` 文件中提取出所有图标，然后上传至图标库，重新构建原来的项目。对于大部分以 `font-class`方式引用的图标库而言，新的项目基本可以代替老的项目直接部署到代码中；但对于使用 `unicode`方式引用的图标库而言，还需要修改 `unicode` 才可以部署。

### 使用方式
#### 1. 环境要求
  建议使用 `windows` ，安装支持 ES6+ 的 ```nodeJs``` 即可，`Linux` 下可能需要修改路径的分隔符；
#### 2. 目录结构
  ```plaintext
  |-- slice-svg.js
  |-- iconfont.svg
  |-- /output
      |-
  ```
#### 3. 修改脚本常量
   `svgPath`为需要处理的 `svg`文件路径；`svgTransform`为图表的形变参数，该参数需要在首次生成图标后，对图标进行调整得到。
  
#### 4. 启动脚本
  ```javascript
  node slice-svg.js
  ```

如脚本运行无误，则运行完毕自动退出运行，此时输出的图标文件在 /output 目录下。

在浏览器中打开任一 `svg` 查看处理结果，由于 ***图标项目的形变参数可能与脚本中的不一致*** ，需要在浏览器控制台或者其他 `svg` 编辑器中对图标进行调整，然后将调整时用到的形变参数赋给脚本中的 `svgTransform` 常量，清空 `/output` 目录再次运行脚本。

`/output` 目录下还会生成一个 `unicode-map.js` 文件，用于映射项目原来的 `unicode` 与 `font-class` ，对于使用 `unicode` 引入图标的项目，这个文件会起到很大作用。

### 一些需要注意的点
* 恢复出来的部分有多条路径的图标在本地显示没有问题，但是上传至 [iconfont](https://www.iconfont.cn/) 之后样式错乱，由于作者对 `svg` 研究不深，所以暂未能解决此问题，只得手工从公共图标库中搜索相近的图标进行替换；

* [iconfont](https://www.iconfont.cn/)  会给带序号的图标重新编号，导致这些图标的名称和 `font-class` 与原项目对不上，导致个别图标不能正常引用，需要进行修改，例如 `schedule1`、`schedule2` 上传之后可能被重命名为 `schedule`、`schedule1`；

* [iconfont](https://www.iconfont.cn/)  会自主分配图标的 `unicode`，对于使用 `unicode` 的老项目也有得改。
