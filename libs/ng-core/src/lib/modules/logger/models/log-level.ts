/* eslint-disable @typescript-eslint/naming-convention */
export const LogLevel = {
  DEBUG: 0,
  LOG: 1,
  INFO: 2,
  WARN: 3,
  ERROR: 4,
  NONE: 5,
};

// eslint-disable-next-line @typescript-eslint/no-redeclare
export type LogLevel = typeof LogLevel[keyof typeof LogLevel];
