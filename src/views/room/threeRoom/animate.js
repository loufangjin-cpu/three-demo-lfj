// import * as THREE from 'three';
import camera from './camera';
import renderer from './renderer';
import controls from './controls';
import scene from './scene';

function animate() {
  controls.update();
  requestAnimationFrame(animate);
  // 使用渲染器渲染相机看这个场景的内容渲染出来
  renderer.render(scene, camera);
}

export default animate;
