const net = require('net');
const { spawn } = require('child_process');

const PORT = 5000;
const HOST = '127.0.0.1';

function isPortInUse(port, host) {
  return new Promise((resolve) => {
    const socket = new net.Socket();
    let settled = false;

    const finish = (value) => {
      if (settled) return;
      settled = true;
      socket.destroy();
      resolve(value);
    };

    socket.setTimeout(800);
    socket.once('connect', () => finish(true));
    socket.once('timeout', () => finish(false));
    socket.once('error', () => finish(false));
    socket.connect(port, host);
  });
}

async function run() {
  const inUse = await isPortInUse(PORT, HOST);

  if (inUse) {
    console.log('Port 5000 is already in use. Backend appears to be running, skipping new backend process.');
    process.exit(0);
  }

  const child = spawn('npm --prefix backend run dev', {
    stdio: 'inherit',
    shell: true,
  });

  child.on('exit', (code) => {
    process.exit(code ?? 0);
  });
}

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
