<template>
    <div ref="sceneDiv"></div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  // import * as THREE from 'three';
  import scene from './threeRoom/scene'
  import camera from './threeRoom/camera'
  // import controls from './threeRoom/controls'
  import renderer from './threeRoom/renderer'
  import {createSphere} from './threeRoom/mesh'
  import animate from './threeRoom/animate'
  import axesHelper from './threeRoom/axesHelper'
  import './threeRoom/init'
  const sceneDiv = ref()
  // 添加相机
  scene.add(camera)
  // 添加辅助坐标
  scene.add(axesHelper)
  createSphere();
  onMounted(() => {
    document.title = '3D看房'
    sceneDiv.value.appendChild(renderer.domElement)
    animate()
  })
  </script>
  
  <style>
  
  </style>