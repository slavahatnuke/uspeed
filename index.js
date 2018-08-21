process.env.SPEED_EACH = process.env.SPEED_EACH || 1e3;
process.env.SPEED_SAMPLE = process.env.SPEED_SAMPLE || 500;

const debug = require('debug');

const Debug = (namespace) => {
  return debug(namespace)
};

const Index = (namespace, speedEach = null) => {
  const debug = Debug(namespace);

  const each = parseInt(speedEach || process.env.SPEED_EACH) || 1e3;
  const sampleSize = parseInt(speedEach || process.env.SPEED_SAMPLE) || 500;

  let counter = 1;
  let lastTime = Date.now();

  return (data = undefined) => {
    if (debug.enabled) {
      if (!(counter % each)) {
        const now = Date.now();
        const timeDiff = now - lastTime;

        let line = `Speed: ${each} / ${timeDiff} ms`;

        if (timeDiff > 0) {
          const speed = Math.floor((each / timeDiff) * 1e3);

          const speedMin = speed * 60;
          const speedHour = speedMin * 60;
          const speedDay = speedHour * 24;

          line += ` | ${speed} / s | ${speedMin} / m | ${speedHour} / h | ${speedDay} / day`;
        } else {
          line += ` | Infinity/s`;
        }

        if (data !== undefined) {
          let sample = JSON.stringify(data);
          const sampleLength = sample.length;

          if (sampleLength > sampleSize) {
            sample = sample.slice(0, sampleSize) + `...`
          }

          line += ` | ${sample} | ${sampleLength} B`;
        }

        debug(line);
        lastTime = Date.now();
        counter = 0;
      }

      counter++;
    }
  }
};

module.exports = {
  Speed: Index
};