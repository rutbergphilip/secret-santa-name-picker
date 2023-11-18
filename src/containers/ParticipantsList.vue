<script lang="ts" setup>
import { ref, watch } from 'vue';

import { generateID, displayName } from '@/utils';

import type { Participant } from '@/types';

const participants = ref<Participant[]>([]);
const firstName = ref('');
const lastName = ref('');

const emit = defineEmits(['participants']);

const addParticipant = () => {
  if (!firstName.value) return;
  participants.value.push({
    id: generateID(),
    firstName: firstName.value,
    lastName: lastName.value,
  });
  firstName.value = '';
  lastName.value = '';
};

const removeParticipant = (id: string) => {
  participants.value = participants.value.filter((participant) => participant.id !== id);
};

watch(
  participants,
  () => {
    emit('participants', participants.value);
  },
  { deep: true },
);
</script>

<template>
  <v-list lines="one" class="list">
    <v-label>Add more participants</v-label>
    <form action="submit">
      <v-text-field
        v-model="firstName"
        clearable
        label="First name*"
        variant="underlined"
        required
      ></v-text-field>
      <v-text-field
        v-model="lastName"
        clearable
        label="Last name"
        variant="underlined"
      ></v-text-field>
    </form>
    <v-list-header inset class="list-header">
      <label class="text-h5">Participants</label>
      <v-btn
        variant="outlined"
        size="small"
        color="green"
        @click="addParticipant"
        :disabled="!firstName"
        >Add participant</v-btn
      >
    </v-list-header>
    <v-divider></v-divider>
    <v-list-item
      v-for="(participant, index) in participants"
      :key="index"
      :title="displayName(participant)"
    >
      <template v-slot:prepend>
        <v-avatar color="grey-lighten-1">
          <v-icon color="white">mdi-account</v-icon>
        </v-avatar>
      </template>
      <template v-slot:append>
        <v-btn size="small" color="red" @click="removeParticipant(participant.id)"> Remove </v-btn>
      </template>
    </v-list-item>
  </v-list>
</template>

<style lang="scss" scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  form {
    display: flex;
    flex-grow: 1 1 auto;
    gap: 1rem;
  }
}
.list-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
}
</style>
