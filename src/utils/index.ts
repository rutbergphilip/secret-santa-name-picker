import type { Participant } from '@/types';

export const generateID = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const displayName = (participant: Participant) => {
  return participant.lastName
    ? `${participant.firstName} ${participant.lastName}`
    : participant.firstName;
};
