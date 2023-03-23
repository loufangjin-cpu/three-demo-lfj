import * as THREE from 'three';
import scene from './scene';
// 创建透视相机
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerHeight / window.innerHeight,
  0.1,
  1000,
);
// 设置相机位置
camera.position.set(0, 0, 10);
// 相机对象指向坐标原点，scene.position的默认是new THREE.Vector3(0,0,0)
camera.lookAt(scene.position);

export default camera;
