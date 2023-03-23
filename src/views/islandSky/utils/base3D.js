import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
// 初始化天空
import initSkySphere from './skysphere';
// 初始化水面
import initWater from './water';
// 初始化小岛
import initIsland from './island'
class base3D {
    constructor(selector) {
        this.container = document.querySelector(selector);
        this.camera;
        this.scene;
        this.renderer;
        this.controls;
        this.light;
        this.init();
        this.animate();
    }
    init() {
        // 初始化场景
        this.initScene();
        // 初始化摄像头
        this.initCamera();
        // 初始化渲染器
        this.initRenderer();

        // 添加平行光
        this.initLight();

        // 创建天空
        initSkySphere(this.scene);
        // 创建水平面
        initWater(this.scene);
        // 创建小岛
        initIsland(this.scene);
    }
    initScene() {
        this.scene = new THREE.Scene();
    }
    initCamera() {
        // 初始化透视相机
        this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
        // 设置相机位置
        this.camera.position.set(-50, 50, 130);
        // 更新摄像头宽高比例
        this.camera.aspect = window.innerWidth / window.innerHeight;
        // 更新摄像头投影矩阵
        this.camera.updateProjectionMatrix();
    }
    initRenderer() {
        // 初始化渲染器
        this.renderer = new THREE.WebGLRenderer({
            // 设置抗锯齿
            antialias: true,
            // 对数深度缓冲区
            logarithmicDepthBuffer: true
        })
        this.renderer.outputEncoding = THREE.sRGBEncoding;
        // 渲染器像素比
        this.renderer.setPixelRatio(window.devicePixelRatio);
        // 渲染器宽高
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.container.appendChild(this.renderer.domElement);
        // 实例化控制器
        this.controls = new OrbitControls(this.camera, this.renderer.domElement)
    }
    initLight() {
        // 添加平行光
        this.light = new THREE.DirectionalLight(0xffffff, 1);
        this.light.position.set(-100, 100, 10);
        this.scene.add(this.light);
    }
    render() {
        this.renderer.render(this.scene, this.camera);
    }
    animate() {
        this.renderer.setAnimationLoop(this.render.bind(this));
         // 根据屏幕大小改变，修改渲染器宽高，摄像头的比例
        window.addEventListener('resize', () => {
            this.camera.aspect = window.innerWidth / window.innerHeight;
            this.camera.updateProjectionMatrix();
            this.renderer.setSize(window.innerWidth, window.innerHeight);
        })
    }
}

export default base3D;