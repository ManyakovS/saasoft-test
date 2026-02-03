<template>
  <UsersTableHeader/>

  <template v-if="users.length > 0">
    <UsersTableRow
      v-for="user in users"
      :key="user.tempId"
      :user="user"
      @save="(data: User) => updateUser(user.tempId, data)"
      @delete="deleteUser(user.tempId)"
    />
  </template>

  <v-row v-else justify="center" class="pa-4 text-h6">
    Список пуст. Добавьте учетную запись
  </v-row>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useUserStore } from "../stores/user-store";
import type { User } from "@/types"

const { users } = storeToRefs(useUserStore());
const { updateUser, deleteUser } = useUserStore();
</script>

<style scoped></style>
