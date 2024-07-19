const { parentPort, workerData } = require("worker_threads");

const { createChatting } = require("./generate-data");

async function main() {
  try {
    const result = await createChatting(workerData.users);
    parentPort.postMessage(result);
  } catch (error) {
    parentPort.postMessage({ error: error.message });
  }
}

main();
