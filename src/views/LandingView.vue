<script setup lang="ts">
import { ref, computed } from 'vue';

import ParticipantsList from '@/containers/ParticipantsList.vue';
import NameSelector from '@/containers/NameSelector.vue';

import type { Participant } from '@/types';

const step = ref(1);
const items = ['Participants', 'Name selector'];
const participants = ref<Participant[]>([]);
const prevDisabled = computed(() => step.value === 1);
const nextDisabled = computed(() => !participants.value.length || step.value === 2);
</script>

<template>
  <v-stepper v-model="step" :items="items">
    <template v-slot:item.1>
      <ParticipantsList @participants="(emitValue: Participant[]) => (participants = emitValue)" />
    </template>

    <template v-slot:item.2>
      <NameSelector />
    </template>

    <template v-slot:actions>
      <div class="d-flex justify-space-between pa-3">
        <v-btn variant="tonal" :disabled="prevDisabled" @click="step--">Back</v-btn>
        <v-btn variant="tonal" :disabled="nextDisabled" @click="step++">Next</v-btn>
      </div>
    </template>
  </v-stepper>
</template>
