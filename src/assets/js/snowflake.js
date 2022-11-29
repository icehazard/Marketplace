// Declare snowflakey
import snowflakey from 'snowflakey';
// Create the worker instance
const snowflake = new snowflakey.Worker({
    name: 'starling',
    epoch: 1420070400000,
    workerId: process.env.CLUSTER_ID || 31,
    processId: process.pid || undefined,
    workerBits: 8,
    processBits: 0,
    incrementBits: 14
});

export {snowflake}