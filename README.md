# is-plugged-in

> Check if the device is plugged into a power source

Works in Node.js and browsers.

**[Live Demo](https://cbcruk.github.io/is-plugged-in/)**

## Install

```sh
npm install is-plugged-in
```

## Usage

```js
import isPluggedIn from 'is-plugged-in'

console.log(await isPluggedIn())
//=> true
```

## API

### isPluggedIn(options?)

Returns a `Promise<boolean>` that resolves to `true` if the device is plugged into a power source, otherwise `false`.

#### options

Type: `object`

##### timeout

Type: `number`\
Default: `5000`

The time in milliseconds to wait for a response.

##### signal

Type: [`AbortSignal`](https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal)

You can abort the request using an `AbortSignal`.

```js
import isPluggedIn from 'is-plugged-in'

const controller = new AbortController()

setTimeout(() => controller.abort(), 3000)

console.log(await isPluggedIn({ signal: controller.signal }))
```

## How it works

### Node.js

Uses [systeminformation](https://github.com/sebhildebrandt/systeminformation) to get power status.

### Browser

Uses the [Battery Status API](https://developer.mozilla.org/en-US/docs/Web/API/Battery_Status_API) (`navigator.getBattery()`).

> **Note:** The Battery Status API has limited browser support and may not be available in all browsers.

## License

MIT
