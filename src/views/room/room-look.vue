<template>
  <div class='scene' ref='sceneDiv'></div>
  <div class="tooltip-box" :style="tooltipPosition" ref="tooltipBox">
    <div class="container">
      <div class="title">标题：{{ tooltipContent.title }}</div>
      <div class="explain">说明：{{ tooltipContent.text }}</div>
    </div>
  </div>
  <p class="title-text" ref="titleBox" :style="titlePosition">
    {{ tooltipContent.title }}
  </p>
</template>

  <script setup>
  import { onMounted, ref } from 'vue'
  import * as THREE from 'three';
  import scene from './threeRoom/scene'
  import camera from './threeRoom/camera'
  // import controls from './threeRoom/controls'
  import renderer from './threeRoom/renderer'
  import {createSphere, addSprite, changeContentAndTips} from './threeRoom/mesh'
  import animate from './threeRoom/animate'
  import axesHelper from './threeRoom/axesHelper'
  import './threeRoom/init'
  const tooltipPosition = ref({
    top: '-100%',
    left: '-100%',
  });
  const titlePosition = ref({
      top: '-100%',
      left: '-100%',
  });
  const tooltipContent = ref({});
  const sceneDiv = ref()
  const tooltipBox = ref()
  
  // 添加相机
  scene.add(camera)
  // 添加辅助坐标
  scene.add(axesHelper)

  // 模型实体
  const sphere = createSphere();
  let spriteList = addSprite()

  // 光线投射用于进行鼠标拾取（在三维空间中计算出鼠标移过了什么物体）。
  const raycaster = new THREE.Raycaster();
  const mouse = new THREE.Vector2();

  let mouseMove = (event) => {
    event.preventDefault();
    mouse.x = (event.clientX / (sceneDiv.value).clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / (sceneDiv.value).clientHeight) * 2 + 1;
    raycaster.setFromCamera(mouse, camera);

    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(spriteList, true);
    if(intersects.length > 0) {
      const elementWidth = (sceneDiv.value).clientWidth / 2;
      const elementHeight = (sceneDiv.value).clientHeight / 2;
      const worldVector = new THREE.Vector3(
          intersects[0].object.position.x,
          intersects[0].object.position.y,
          intersects[0].object.position.z,
        );
        // 在投影中使用的摄像机
        const position = worldVector.project(camera);
        tooltipContent.value = intersects[0].object.content;
        if (intersects[0].object.content.showTip) {
            const left = Math.round(
              elementWidth * position.x
                + elementWidth
                - (tooltipBox.value).clientWidth / 2,
            );
            const top = Math.round(
              -elementHeight * position.y
                + elementHeight
                - (tooltipBox.value).clientHeight / 2,
            );
            tooltipPosition.value = {
              left: `${left}px`,
              top: `${top}px`,
            };
          } else if (intersects[0].object.content.showTitle) {
            const left = Math.round(
              elementWidth * position.x
                + elementWidth
                - (tooltipBox.value).clientWidth / 2,
            );
            const top = Math.round(-elementHeight * position.y + elementHeight);
            titlePosition.value = {
              left: `${left}px`,
              top: `${top}px`,
            };
        }
    } else {
      handleTooltipHide(event);
    }
  }
  const handleTooltipHide = (event) => {
      event.preventDefault();
      tooltipPosition.value = {
        top: '-100%',
        left: '-100%',
      };
      titlePosition.value = {
        top: '-100%',
        left: '-100%',
      };
      tooltipContent.value = {};
    };
  const mouseClick = (event) => {
    event.preventDefault();
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
    // 通过摄像机和鼠标位置更新射线
    raycaster.setFromCamera(mouse, camera);

    // 计算物体和射线的焦点
    const intersects = raycaster.intersectObjects(spriteList, true );
    if (intersects.length > 0 && intersects[0].object.content.showTitle) {
      spriteList = changeContentAndTips(sphere, intersects[0].object.content.image);
      handleTooltipHide(event)
    }
  }
  onMounted(() => {
    document.title = '3D看房'
    sceneDiv.value.appendChild(renderer.domElement)
    window.addEventListener('click', mouseClick, false);
    sceneDiv.value.addEventListener('mousemove', mouseMove, false);
    tooltipBox.value.addEventListener('mouseleave', handleTooltipHide, false);
    animate()
  })
  </script>
  <style lang='less' scoped>
  .title-text {
    position: absolute;
    width: 66px;
    color: #382129;
  }
  .tooltip-box {
    position: absolute;
    padding: 0px 0px 40px 0px;
    line-height: 30px;
    border-radius: 4px;
    color: #ffffff;
    z-index: 100;
    cursor: pointer;
    .container {
      position: relative;
      width: 240px;
      max-height: 200px;
      padding: 10px;
      background-color: rgba(0, 0, 0, 0.6);
      .title {
        width: 100%;
        padding: 6px 0;
      }
      .explain {
        width: 100%;
        max-height: 100px;
        font-size: 14px;
        overflow-y: auto;
        &::-webkit-scrollbar {
          width: 4px;
          height: 4px;
        }
        &::-webkit-scrollbar-track {
          background: #353535;
          border-radius: 2px;
        }
        &::-webkit-scrollbar-thumb {
          background: #cdcdcd;
          border-radius: 2px;
        }
        &::-webkit-scrollbar-thumb:hover {
          background: #9c9c9c;
        }
        &::-webkit-scrollbar-corner {
          background: #f6f6f6;
        }
      }
    }
  }
  </style>