<script lang="ts" setup>
import { ref, watch } from 'vue';

import { generateID } from '@/utils';

import type { Participant } from '@/types';

const participants = ref<Participant[]>([]);
const name = ref('');

const emit = defineEmits(['participants']);

const addParticipant = () => {
  if (!name.value) return;
  participants.value.push({
    id: generateID(),
    name: name.value,
  });
  name.value = '';
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
    <div class="new-participant align-end">
      <v-text-field
        v-model="name"
        clearable
        label="Name"
        variant="underlined"
        required
        hide-details
      ></v-text-field>
      <v-btn variant="outlined" size="small" color="green" @click="addParticipant" :disabled="!name"
        >Add participant</v-btn
      >
    </div>
    <v-list-header inset class="list-header">
      <label class="text-h5">Participants</label>
    </v-list-header>
    <v-divider></v-divider>
    <v-list-item
      v-for="(participant, index) in participants"
      :key="index"
      :title="participant.name"
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

  .new-participant {
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
