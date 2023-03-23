import * as THREE from 'three';
// 导入水面设置
import { Water } from 'three/examples/jsm/objects/Water2'

export default function initWater(scene) {
    // 创建水面几何体圆形缓冲几何体
    const waterGeometry = new THREE.CircleGeometry(500, 64);
    const water = new Water(waterGeometry, {
        textureHeight: 1024,
        textureWidth: 1024,
        color: 0xddddff,
        // 水流方向
        flowDirection: new THREE.Vector2(1, 1),
        scale: 1
    });
    water.rotation.x = - Math.PI / 2;
    water.position.y = 5;
    scene.add(water);
}