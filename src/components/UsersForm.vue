<template>
  <v-container>
    <v-row justify="start">
      <v-col cols="auto">
        <h1>Учетные записи</h1>
      </v-col>

      <v-col cols="auto">
        <v-btn icon="mdi-plus" @click="addEmptyUser" />
      </v-col>
    </v-row>

    <v-row>
      <v-col>
        <Tip
          icon="mdi-help-circle-outline"
          text="Для указания меток для одной пары логин/пароль используйте разделитель;"
        />
      </v-col>
    </v-row>

    <UsersTable />
  </v-container>
</template>

<script setup lang="ts">
import { useUserStore } from "@/stores/user-store";

const { addEmptyUser } = useUserStore();
</script>
