<template>
  <v-text-field
    v-model="model"
    :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
    :type="visible ? 'text' : 'password'"
    placeholder="Пароль"
    prepend-inner-icon="mdi-lock-outline"
    @click:append-inner="visible = !visible"
  />
</template>

<script setup lang="ts">
import { ref } from "vue";

const model = defineModel();
const visible = ref(false);
</script>

<style scoped></style>
