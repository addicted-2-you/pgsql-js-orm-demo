import { formatDuration, intervalToDuration } from 'date-fns';

export const formatMs = (ms: number) => {
  const durationObject = intervalToDuration({ start: 0, end: ms });
  return formatDuration(durationObject) || `${ms.toFixed(2)}ms`;
};
