import * as THREE from 'three';

// 初始化场景
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x101010);

// 添加平行光
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(10, 100, 10);
// scene.add(light);

export default scene;
