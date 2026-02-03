<template>
  <v-form ref="form" validate-on="input" v-model="isFormValid">
    <v-row class="mt-2">
      <v-col cols="3">
        <v-text-field
          :model-value="localUser.marks"
          label="Метки (через ;)"
          :rules="[rules.maxLength(50, 'Максимальная длина 50 символов')]"
          clearable
          @update:model-value="(val: string) => localUser.marks = val.trim()"
          @blur="handleSave"
        />
      </v-col>

      <v-col cols="2">
        <v-select
          v-model="localUser.type"
          label="Тип записи"
          :items="userTypes"
          :rules="[rules.required('Поле тип записи обязательно')]"
          @update:model-value="handleSave"
        />
      </v-col>

      <v-col>
        <v-text-field
          :model-value="localUser.login"
          :rules="[rules.required('Поле логин обязательно'), rules.maxLength(100, 'Максимальная длина 100 символов')]"
          label="Логин"
          clearable
          @update:model-value="(val: string) => localUser.login = val.trim()"
          @blur="handleSave"
        />
      </v-col>

      <v-col cols="3" v-if="localUser.type !== 'LDAP'">
        <PasswordInput
          :model-value="localUser.password"
          :rules="[rules.required('Поле пароль обязательно'), rules.maxLength(100, 'Максимальная длина 100 символов')]"
          clearable
          @update:model-value="(val: string) => localUser.password = val.trim()"
          @blur="handleSave"
        />
      </v-col>

      <v-col cols="1">
        <v-btn icon="mdi-delete" @click="$emit('delete')" />
      </v-col>
    </v-row>
  </v-form>
</template>

<script setup lang="ts">
import { ref, reactive, watch, nextTick } from 'vue'
import { useRules } from 'vuetify/labs/rules'

import type { User, Mark } from '@/types'

interface Props {
  user: User
}

const props = defineProps<Props>()

const emit = defineEmits<{
  (e: 'save', user: User): void
  (e: 'delete'): void
}>()

const rules = useRules()
const form = ref()
const isFormValid = ref(false)

const userTypes = ['LDAP', 'Локальная']

const localUser = reactive({
  tempId: props.user?.tempId,
  login: props.user?.login || '',
  password: props.user?.password || '',
  type: props.user?.type || '',
  marks: props.user?.marks.map(m => m.text).join(';') || ''
})

const parseMarks = (str: string): Mark[] => {
  if (!str) return []
  return str
    .split(';')
    .map(item => item.trim())
    .filter(item => item !== '')
    .map(text => ({ text }))
}

const handleSave = async () => {
  await nextTick() /* Ожидание рендера поля Пароль для валидации */
  if (isFormValid.value) {
    const finalUser: User = {
      ...localUser,
      password: localUser.type === 'LDAP' ? null : localUser.password,
      marks: parseMarks(localUser.marks)
    }
    emit('save', finalUser)
  }
}
</script>
