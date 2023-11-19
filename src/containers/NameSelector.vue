<script lang="ts" setup>
import { ref, watchEffect } from 'vue';

import type { PropType } from 'vue';
import type { Participant } from '@/types';

import { shuffle } from '@/utils';
import { onMounted } from 'vue';

const props = defineProps({
  participants: {
    type: Array as PropType<Participant[]>,
    required: true,
  },
});

const initialParticipants = ref<Participant[]>(props.participants);
const assignedSantas = ref<Map<string, Participant>>(new Map());
const secretSantaIndex = ref<number>(0);
const showName = ref(false);

const assignSecretSantas = () => {
  const participants = shuffle([...initialParticipants.value]);
  for (let i = 0; i < participants.length; i++) {
    const participant = participants[i];
    const nextParticipant = participants[i + 1] || participants[0];
    assignedSantas.value.set(participant.id, nextParticipant);
  }
};

watchEffect(() => {
  initialParticipants.value = props.participants;
  assignSecretSantas();
});

onMounted(() => {
  assignSecretSantas();
});
</script>

<template>
  <v-sheet class="name-selector-container">
    <header>
      <v-label class="text-h4">Secret Santa</v-label>
    </header>

    <v-window
      v-model="secretSantaIndex"
      show-arrows
      class="window"
      @update:modelValue="showName = false"
    >
      <template v-slot:prev="{ props }">
        <v-btn icon="mdi-arrow-left" variant="tonal" @click="props.onClick" />
      </template>
      <template v-slot:next="{ props }">
        <v-btn icon="mdi-arrow-right" variant="tonal" @click="props.onClick" />
      </template>
      <v-window-item v-for="(santa, index) in initialParticipants" :key="index">
        <v-card height="200px" class="d-flex justify-center align-center">
          <div class="content">
            <v-label class="text-h5">{{ santa.name }}</v-label>
            <v-label class="text-h5">is gifting to</v-label>
            <v-label class="text-h5" v-if="showName">{{
              assignedSantas.get(santa.id)?.name
            }}</v-label>
            <v-label v-else>*******</v-label>
          </div>
        </v-card>
      </v-window-item>
    </v-window>

    <div class="actions">
      <v-btn
        :text="`${showName ? 'Hide name' : 'Show name'}`"
        variant="tonal"
        @click="showName = !showName"
      />
    </div>
  </v-sheet>
</template>

<style lang="scss" scoped>
.name-selector-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 1rem;

  header {
    display: flex;
    gap: 1rem;
  }
}

.window {
  width: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
}

.row {
  display: flex;
  flex-direction: row;
  gap: 1rem;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
