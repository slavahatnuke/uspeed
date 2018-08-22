## USpeed

Your speed meter inline. [debug](https://www.npmjs.com/package/debug) based

### Example
```javascript
const {Speed} = require('uspeed');
const speed = Speed('speed:date:now');

let i = 1e6;
while (i--) {
  speed(Date.now())
}

```

![uspeed](./demo-uspeed.gif)

#### Usage
```
export DEBUG=speed:*
node demo.js
```

### Output
```
speed:date:now Speed: 100000 / 18 ms | 5555555 / s | 333333300 / m | 19999998000 / h | 479999952000 / day | 1534876464877 | 13 B +0ms
...
```

### Optional ENV
```
export SPEED_EACH=100000 ## optional, print result each 100000 iteration
export SPEED_SAMPLE=500 ## optional, print max size of result
```