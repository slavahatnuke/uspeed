const {Speed} = require('./index');
const speed = Speed('speed:date:now');

let i = 1e6;
while (i--) {
  speed(Date.now())
}
