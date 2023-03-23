// 导入gltf载入库
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { DRACOLoader } from "three/examples/jsm/loaders/DRACOLoader";

// 导入小岛模型
export default function initIsland(scene) {
    // 导入载入库
    const loader = new GLTFLoader();
    // 导入解压库
    const dracoLoader = new DRACOLoader();
    // 设置载入库路径
    dracoLoader.setDecoderPath("./draco/");
    // 添加draco载入库
    loader.setDRACOLoader(dracoLoader);
    //最新版本此处会报错 目前使用"three": "^0.142.0",
    loader.load("./model/island.glb", (gltf) => {
        console.log(gltf);
        scene.add(gltf.scene);
    });
}