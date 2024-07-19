/* eslint-disable */
export const Mode = {
  character: 0,
  tag: 1,
  whitespace: 2,
  entity: 3,
} as const;

export type ModeValue = typeof Mode[keyof typeof Mode];
