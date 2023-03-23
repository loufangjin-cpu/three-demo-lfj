import * as THREE from 'three';
import scene from './scene';
// import camera from './camera';

const data = [{
  textures: require('@/assets/livingRoom.jpg'),
}]
export function createSphere(index = 0) {
  // 创建几何体球
  const sphereGeometry = new THREE.SphereBufferGeometry(16, 30, 30);
  sphereGeometry.scale(16, 16, -16);
  // 纹理加载
  const sphereTexture = new THREE.TextureLoader().load(data[index].textures);
  // 材质贴图 使用 平面贴图map
  const sphereMaterial = new THREE.MeshBasicMaterial({ map: sphereTexture });
  // 创建物体
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);
  return sphere;
}

