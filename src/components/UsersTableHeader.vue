<template>
  <v-row class="mt-4">
    <v-col v-for="{ colSize, text } in cols" :cols="colSize">
      <p class="text-subtitle-2 text-grey-lighten-1" v-if="text">{{ text }}</p>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
const cols = [
  { text: "Метки", colSize: 3 },
  { text: "Тип записи", colSize: 2 },
  { text: "Логин", colSize: 3 },
  { text: "Пароль", colSize: 3 },
  { colSize: 1 },
];
</script>
