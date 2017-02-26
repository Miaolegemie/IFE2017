WebGL No. 3 - 材质与纹理

## 简介

为上一个任务中的小车的车厢的六个面设置贴图，并为小车的轮胎和地板设置合适的材质

[任务地址](http://ife.baidu.com/course/detail/id/32?t=1488086932949)

[实现效果](https://miaolegemie.github.io/IFE2017/WebGL/task03/task03.html)

## 一些有用的东西

### API 更新

rc83 版本很多 api 已修改

``` javascript
for (let i = 1; i <= 6; i++) {
  materials.push(new THREE.MeshLambertMaterial({
    map: loader.load('./car' + i +'.jpg', function(texture) {
        renderer.render(scene, camera)
        return texture
      })
  }))
}
const cube = new THREE.Mesh(new THREE.BoxGeometry(2, 1, 1, 20, 10, 10),
  new THREE.MultiMaterial(materials)
)
```

### MultiMaterial 的顺序

right, left, top, bottom, back, front

### 材质

  1. 基础线条材料（LineBasicMaterial）

    用于绘制线框样式几何的材料

  2. 虚线材料（LineDashedMaterial）

    用虚线绘制线框样式几何的材料

  3. 基础网孔材料（MeshBasicMaterial）

    用于以简单的阴影（平面或线框）方式绘制几何的材料。 这种材料不受灯光的影响。

  4. 深度网孔材料（MeshDepthMaterial）

    用于通过深度绘制几何的材料。深度基于相机的近和远平面。白色最近，黑色最远。

  5. Lambert网孔材料（MeshLambertMaterial）

    用于非光泽表面的材料，无高光。 使用基于非物理的Lambert模型来计算反射率。 这可以很好地模拟一些表面（例如未处理的木材或石头），但不能模拟具有镜面高光的光亮表面（例如清漆木材）。

  6. Phong网孔材料（MeshPhongMaterial）

    用于具有镜面高光的光泽表面的材料, 这可以模拟具有镜面高光的光泽表面（例如清漆木）

  7. 法向量网孔材料（MeshNormalMaterial）

    一种把法向量映射到RGB颜色的材料。

  8. 标准网孔材料（MeshStandardMaterial）

    标准的，基于物理的材料。这提供了比 Lambert 网孔材料（MeshLambertMaterial）或 Phong 网孔材料（MeshPhongMaterial）更准确和更逼真的观察结果，代价是需要使用更高的计算能力

    **请注意，为了获得最佳效果，应始终在使用此材料时指定环境贴图。**

  9. 物理网孔材料（MeshPhysicalMaterial）

    标准网孔材料（MeshStandardMaterial）的扩展，允许更好地控制反射率。

    **请注意，为了获得最佳效果，应始终在使用此材料时指定环境贴图。**

  10. 卡通网孔材料（MeshToonMaterial）

    带有卡通阴影的 Phong 网孔材料（MeshPhongMaterial）的扩展

  11. 多种材料（MultiMaterial）

    一种用于定义相同几何模型的多个材料的材料。 模型使用 faces materialindex 来决定哪个面使用哪个材料。 其中materialindex对应于材料数组中的材料索引值。

  12. 点材料（PointsMaterial）

  13. 原始着色器材料（RawShaderMaterial）

    该类和 着色器材料（ShaderMaterial） 类似，除了内置的 uniforms 和 attributes 定义不会自动添加到GLSL着色器代码。

  14. 着色器材料（ShaderMaterial）

    使用自定义着色器渲染的材料。着色器（shader）是一段使用 GLSL 语言编写的可在GPU上直接运行的程序。 你可能想使用一个自定义着色器，如果你要：

      - 要实现内置 materials 之外的效果。
      - 把很多对象组合为一个 几何模型(Geometry) 或 缓存几何模型(BufferGeometry)，以提高性能。

    记住使用 ShaderMaterial 时，有以下的注意事项：

      - ShaderMaterial 只有使用 WebGL渲染器(WebGLRenderer) 才可以绘制正常，因为 vertexShader 和 fragmentShader 属性中GLSL代码必须使用WebGL来编译并运行在GPU中。
      - 在THREE r72中，不再支持直接在 ShaderMaterial 中对属性赋值。必须使用 缓存几何模型(BufferGeometry) 实例 (而不是 几何模型(Geometry) 实例)，使用 缓存属性(BufferAttribute) 实例来定义自定义属性。
      - 在THREE r77中，WebGL渲染器目标(WebGLRenderTarget) 或 WebGL渲染器目标(WebGLRenderTarget)Cube 实例不再被用作uniforms。相反该使用 texture 属性。
      - 内置属性 uniforms 会与你的代码一起传递到着色器。如果不希望WebGLProgram向您的着色器代码中添加任何内容，则可以使用RawShaderMaterial代替此类。

  15. 阴影材质（ShadowMaterial）

    这种材料可以接收阴影，但是是完全透明的。

  16. SpriteMaterial
