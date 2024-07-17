const { parentPort, workerData } = require("worker_threads");

const { createChatting } = require("./generate-data");
const { withTimeMeasureAsync } = require("./utils");

async function main() {
  try {
    const result = await withTimeMeasureAsync(createChatting)(workerData.users);
    parentPort.postMessage(result);
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
}

main();
