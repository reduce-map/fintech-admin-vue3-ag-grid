<template>
  <img :src="params.value" alt="Crypto Image" class="w-5 h-5" />
</template>

<script lang="ts" setup>
defineProps<{
  params: {
    value: string;
  };
}>();
</script>
