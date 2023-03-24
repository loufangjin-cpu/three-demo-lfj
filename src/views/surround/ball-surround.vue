<template>
    <div ref="earthAndMoon"></div>
</template>
<script setup>
import { onMounted, ref } from "vue";
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer'
const earthAndMoon = ref()
// 声明全局变量
let camera, scene, renderer, labelRenderer;
let moon, earth;
// 时钟对象
let clock = new THREE.Clock();

// 实例化纹理加载器
const textureLoader = new THREE.TextureLoader();
// 地球和月球半径大小
const EARTH_RADIUS = 2.5;
const MOON_RADIUS = 0.27;

// 实例化相机
camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 200);
camera.position.set(10, 5, 20);

// 实例化场景
scene = new THREE.Scene();


// 创建聚光灯光源创建添加
const dirLight = new THREE.SpotLight(0xffffff);
dirLight.position.set(0, 0, 10);
// 光照强度
dirLight.intensity = 2;
// 投射阴影
dirLight.castShadow = true;
scene.add(dirLight)

// 环境光不能用来投射阴影，因为它没有方向
const aLight = new THREE.AmbientLight(0xffffff)
// 光照强度
aLight.intensity = 0.3
scene.add(aLight)

// 创建月球
const moonGeometry = new THREE.SphereGeometry(MOON_RADIUS, 16, 16);
// 高光材质
const moonMaterial = new THREE.MeshPhongMaterial({
    map: textureLoader.load('./moon/planets/moon_1024.jpg')
})
moon = new THREE.Mesh(moonGeometry, moonMaterial)
moon.receiveShadow = true;
moon.castShadow = true;
scene.add(moon)

// 创建地球
const earthGeometry = new THREE.SphereGeometry(EARTH_RADIUS, 16, 16);
const earthMaterial = new THREE.MeshPhongMaterial({
    // 高亮的程度
    shininess: 5,
    // 贴图
    map: textureLoader.load('./moon/planets/earth_atmos_2048.jpg'),
    // 高光度
    specularMap: textureLoader.load('./moon/planets/earth_specular_2048.jpg'),
    // 法线贴图
    normalMap: textureLoader.load('./moon/planets/earth_normal_2048.jpg')
})

earth = new THREE.Mesh(earthGeometry, earthMaterial);
// 接受阴影
earth.receiveShadow = true;
earth.castShadow = true;
scene.add(earth)

// 创建地球标签
const earthDiv = document.createElement('div');
earthDiv.className = 'label';
earthDiv.textContent = 'Earch';
// 设置2D 标签
const eartchLabel = new CSS2DObject(earthDiv)
eartchLabel.position.set(0, EARTH_RADIUS + 0.5, 0);
earth.add(eartchLabel)

// 创建月球标签
const moonDiv = document.createElement('div');
moonDiv.className = 'label';
moonDiv.textContent = 'Moon';
const moonLabel = new CSS2DObject(moonDiv)
moonLabel.position.set(0, MOON_RADIUS + 0.5, 0);
moon.add(moonLabel)

// 创建3D渲染器
renderer = new THREE.WebGLRenderer({
    // 清除渲染器自带背景
    alpha: true
});
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
// 渲染阴影
renderer.shadowMap.enabled = true;


// 标签2D渲染器
labelRenderer = new CSS2DRenderer();
labelRenderer.setSize(window.innerWidth, window.innerHeight)
labelRenderer.domElement.style.position = 'absolute';
labelRenderer.domElement.style.top = '0px';

const initSize = () => {
    // 调整尺寸
    window.onresize = function () {
        // 摄像头尺寸自适应
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight)
        labelRenderer.setSize(window.innerWidth, window.innerHeight)
    }
}
const initControl = () => {
    // 绑定控制和摄像头
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.update();
}
let oldtime = 0
const animate = () => {
  // 自时钟启动后的秒数
    const elapsed = clock.getElapsedTime();
    // Math.sin(x) //x 的正玄值。返回值在 -1.0 到 1.0 之间；
    // Math.cos(x) //x 的余弦值。返回的是 -1.0 到 1.0 之间的数；
    moon.position.set(Math.sin(elapsed) * 5, 0, Math.cos(elapsed) * 5);

    // 地球自转
    var axis = new THREE.Vector3(0, 1, 0);
    // 久的时间 - 当前时间， 绕着该物体的轴来旋转一个物体
    earth.rotateOnAxis(axis, (elapsed - oldtime) * Math.PI / 10);
    renderer.render(scene, camera)
    labelRenderer.render(scene, camera)
    oldtime = elapsed;
    requestAnimationFrame(animate)
};
onMounted(() => {
    earthAndMoon.value.appendChild(renderer.domElement)
    earthAndMoon.value.appendChild(labelRenderer.domElement)
    // 开启渲染
    animate();
    // 添加控制器
    initControl()
    initSize()
})
</script>
<style>
* {
    margin: 0;
    padding: 0;
}

canvas {
    background-image: url(./imgs/star.jpg);
    background-size: cover;
}

.label {
    color: #fff;
    font-size: 16px;
}
</style>