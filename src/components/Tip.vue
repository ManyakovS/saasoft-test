<template>
  <div class="tip bg-blue-lighten-5 w-100 d-flex align-center ga-2 pa-1">
    <slot name="icon">
      <v-icon size="large" :icon="icon"/>
    </slot>
    <slot name="default">{{ text }}</slot>
  </div>
</template>

<script setup lang="ts">
interface Props {
  text: string
  icon: string
}

defineProps<Props>()
</script>
