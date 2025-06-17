const { spawn } = require('child_process');
const http = require('http');
const net = require('net');
const assert = require('assert');

async function getFreePort() {
  return new Promise((resolve, reject) => {
    const srv = net.createServer();
    srv.listen(0, () => {
      const { port } = srv.address();
      srv.close((err) => (err ? reject(err) : resolve(port)));
    });
  });
}

async function waitForReady(proc) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => reject(new Error('Server did not start')), 15000);
    const onData = (data) => {
      const text = data.toString();
      output += text;
      if (/Ready in|Local:/i.test(text)) {
        clearTimeout(timeout);
        proc.stdout.off('data', onData);
        proc.stderr.off('data', onData);
        resolve();
      }
    };
    proc.stdout.on('data', onData);
    proc.stderr.on('data', onData);
  });
}

let output = '';
async function main() {
  const port = await getFreePort();
  const proc = spawn('yarn', ['dev', '-p', String(port)], {
    env: { ...process.env, BROWSER: 'none' },
  });
  proc.stdout.on('data', (d) => (output += d.toString()));
  proc.stderr.on('data', (d) => (output += d.toString()));

  await waitForReady(proc);
  proc.kill();
  assert(!/warn/i.test(output), 'Expected no warnings, got:\n' + output);
}

main().catch((err) => {
  console.error(output);
  console.error(err);
  process.exit(1);
});
