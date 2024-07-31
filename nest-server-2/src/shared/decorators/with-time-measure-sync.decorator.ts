import { performance } from 'node:perf_hooks';

import { formatMs } from '../utils/time.utils';

export function WithTimeMeasureSync(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor,
) {
  const originalMethod = descriptor.value;

  descriptor.value = function (...args: any[]) {
    try {
      const startTs = performance.now();

      this.logger.log(`${target.constructor.name}.${propertyKey} started`);

      const result = originalMethod.apply(this, args);

      const finishTs = performance.now();
      const formattedDuration = formatMs(finishTs - startTs);

      this.logger.log(
        `${target.constructor.name}.${propertyKey} finished (execution took ${formattedDuration})`,
      );

      return result;
    } catch (err) {
      this.logger.error(`${target.constructor.name}.${propertyKey}`, err);
      throw err;
    }
  };

  return descriptor;
}
