import * as THREE from 'three';

export default function initSkySphere(scene) {
    // 创建天空球
    // src\assets\textures\sky.jpg
    let texture = new THREE.TextureLoader().load("./textures/sky.jpg");
    const skyGeometry = new THREE.SphereGeometry(1000, 60, 60);
    const skyMaterial = new THREE.MeshBasicMaterial({
        map: texture,
    });
    skyGeometry.scale(1, 1, -1);
    const skySphere = new THREE.Mesh(skyGeometry, skyMaterial);
    scene.add(skySphere);
    
    // 视频纹理
    const video = document.createElement("video");
    video.src = "./textures/sky.mp4";
    video.loop = true;
    window.addEventListener("click", () => {
        // 当鼠标移动的时候播放视频
        //   判断视频是否处于播放状态
        if (video.paused) {
            video.play();
            let texture = new THREE.VideoTexture(video);
            skyMaterial.map = texture;
            skyMaterial.map.needsUpdate = true;
        }
    });

}