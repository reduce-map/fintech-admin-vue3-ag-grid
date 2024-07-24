<template>
  <Spline :scene="scene" />
</template>

<script setup>
import Spline from 'spline-vue/v3'
import { ref } from 'vue'
const scene = ref('https://prod.spline.design/zFvv873zjsj5iJBU/scene.splinecode')
</script>
