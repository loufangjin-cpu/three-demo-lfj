import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import camera from './camera';
import renderer from './renderer';

// 创建相机控制器
const controls = new OrbitControls(camera, renderer.domElement);

// 你能够将相机向内移动多少，其默认值为*0*。
controls.minDistance = 1;
// 你能够将相机向外移动多少，其默认值为*Infinity*。
controls.maxDistance = 100;
controls.enablePan = true;



export default controls;
