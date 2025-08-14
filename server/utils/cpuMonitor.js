const os = require('os');
const pm2 = require('pm2');

function getCpuUsage() {
    const cpus = os.cpus();
    let idle = 0, total = 0;
    for (const cpu of cpus) {
        for (const type in cpu.times) {
            total += cpu.times[type];
        }
        idle += cpu.times.idle;
    }
    return 100 - Math.round(100 * idle / total);
}

setInterval(() => {
    const usage = getCpuUsage();
    if (usage > 70) {
        console.warn(`High CPU usage detected: ${usage}%. Restarting server with PM2...`);
        pm2.connect(err => {
            if (err) return console.error('PM2 connect error:', err);
            pm2.restart('backend', err2 => {
                if (err2) console.error('PM2 restart error:', err2);
                pm2.disconnect();
            });
        });
    }
}, 10000); // check every 10 seconds
