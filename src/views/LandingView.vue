<script setup lang="ts">
import { ref, computed } from 'vue';

import ParticipantsList from '@/containers/ParticipantsList.vue';
import NameSelector from '@/containers/NameSelector.vue';

import type { Participant } from '@/types';

const step = ref(1);
const steps = ['Participants', 'Name selector'];
const participants = ref<Participant[]>([
  {
    id: '1',
    firstName: 'Philip',
  },
  {
    id: '2',
    firstName: 'Emma',
  },
  {
    id: '3',
    firstName: 'Johan',
  },
  {
    id: '4',
    firstName: 'Pernilla',
  },
  {
    id: '5',
    firstName: 'Haley',
  },
  {
    id: '6',
    firstName: 'Curt',
  },
]);
const prevDisabled = computed(() => step.value === 1);
const nextDisabled = computed(() => !participants.value.length || step.value === 2);
</script>

<template>
  <v-stepper v-model="step" :items="steps">
    <template v-slot:item.1>
      <ParticipantsList @participants="(emitValue: Participant[]) => (participants = emitValue)" />
    </template>

    <template v-slot:item.2>
      <NameSelector :participants="participants" />
    </template>

    <template v-slot:actions>
      <div class="d-flex justify-space-between pa-3">
        <v-btn variant="tonal" :disabled="prevDisabled" @click="step--">Back</v-btn>
        <v-btn variant="tonal" :disabled="nextDisabled" @click="step++">Next</v-btn>
      </div>
    </template>
  </v-stepper>
</template>
