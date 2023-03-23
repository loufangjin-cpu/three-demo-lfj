<template>
    <div class="scene" id="scene">
    </div>
</template>

<script setup>
import Base3D from './utils/base3D'
import {onMounted, reactive } from 'vue'
const data = reactive({})
onMounted(() => {
    document.title = '水天一色小岛'
    data.Base3D = new Base3D('#scene')
})

</script>

<style>

</style>