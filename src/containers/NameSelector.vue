<script lang="ts" setup>
import { ref, computed } from 'vue';

import type { PropType } from 'vue';
import type { Participant } from '@/types';

import { displayName, shuffle } from '@/utils';
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
const isLastSanta = computed(() => secretSantaIndex.value === initialParticipants.value.length - 1);

const assignSecretSantas = () => {
  const participants = shuffle([...initialParticipants.value]);
  for (let i = 0; i < participants.length; i++) {
    const participant = participants[i];
    const nextParticipant = participants[i + 1] || participants[0];
    assignedSantas.value.set(participant.id, nextParticipant);
  }
};

const nextSanta = () => {
  secretSantaIndex.value++;
  showName.value = false;
};

onMounted(() => {
  assignSecretSantas();
});
</script>

<template>
  <v-sheet class="name-selector-container">
    <header>
      <v-label class="text-h4">Secret Santa</v-label>
    </header>

    <div class="content">
      <v-label class="text-h5">{{ displayName(initialParticipants[secretSantaIndex]) }}</v-label>
      <v-label class="text-h5">is gifting to</v-label>
      <v-label class="text-h5" v-if="showName">{{
        displayName(assignedSantas.get(initialParticipants[secretSantaIndex].id))
      }}</v-label>
    </div>

    <div class="actions">
      <div class="selected">
        <v-btn
          :text="`${showName ? 'Hide my secret name' : 'Show my secret name'}`"
          variant="tonal"
          @click="showName = !showName"
        />
      </div>
      <v-btn variant="tonal" @click="nextSanta" :disabled="isLastSanta">Next Santa</v-btn>
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

.actions,
.selected {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}
</style>
