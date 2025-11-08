console.debug('Start app3.js...');

setTimeout(() => {
    console.debug('Timeout 01...');
}, 4000);

setTimeout(() => {
    console.debug('Timeout 02...');
}, 1);

setTimeout(() => {
    console.debug('Timeout 03...');
}, 0);

console.debug('End app3.js...');