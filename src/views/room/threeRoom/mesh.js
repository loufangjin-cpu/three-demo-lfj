import * as THREE from 'three';
import scene from './scene';
import data from '../data';
import camera from './camera';
import gsap from 'gsap';
// import camera from './camera';

export function createSphere(index = 0) {
  // 创建几何体球
  const sphereGeometry = new THREE.SphereBufferGeometry(16, 30, 30);
  sphereGeometry.scale(16, 16, -16);
  // 纹理加载
  const sphereTexture = new THREE.TextureLoader().load(data[index].textures);
  // 材质贴图 使用 平面贴图map
  const sphereMaterial = new THREE.MeshBasicMaterial({ 
    map: sphereTexture,
  });
  // 创建物体
  const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
  scene.add(sphere);
  return sphere;
}

export function addSprite(index = 0) {
  const tipTexture = new THREE.TextureLoader().load(
    require('@/assets/tip.png'),
  );
  const material = new THREE.SpriteMaterial({ map: tipTexture });
  const spriteList = [];
  data[index].tipsList.forEach((item) => {
    const sprite = new THREE.Sprite(material);
    sprite.scale.set(10, 10, 10);
    sprite.position.set(item.position.x, item.position.y, item.position.z);
    sprite.content = item.content;
    spriteList.push(sprite);
    scene.add(sprite);
  });
  return spriteList;
}

export function changeContentAndTips (sphere, index ) {
  scene.children = scene.children.filter((item) => String(item.type) !== 'Sprite');
  const texture = new THREE.TextureLoader().load(data[index].textures);
  const sphereMaterial = new THREE.MeshBasicMaterial({
    map: texture,
    transparent: true,
    opacity: 0,
  });
  sphere.material = sphereMaterial;
  // 动画过度
  gsap.to(sphereMaterial, { transparent: true, opacity: 1, duration: 2 });
  //   更新摄像机的投影矩阵
  camera.updateProjectionMatrix();
  return addSprite(index);
}

