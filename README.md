# usbdmx-js

[![npm version](https://badge.fury.io/js/usbdmx-js.svg)](https://badge.fury.io/js/usbdmx-js)

Node.js library for the FX5 DMX and Digital Enlightenment USB Interface.<br/>
Code based on the [FX5 usbdmx driver](https://github.com/fx5/usbdmx) (uses [node-hid](https://github.com/node-hid/node-hid) for USB/HID communication)

## Installation

The package is available on npm and can be installed like this:

```
npm install usbdmx-js
```

## Usage

### Get connected DMX interfaces

```ts
import { getConnectedInterfaces } from "usbdmx-js";
var interfaces = getConnectedInterfaces();
```

This will return an array of objects, which looks like this:

```json
{
  "vid": "[Vendor ID (number)]",
  "pid": "[Product ID (number)]",
  "path": "[System Path to HID device (string)]"
}
```

### Initialize and open interface

There are two ways to open the interface, which basically to the same thing. You need the `path` key from `getConnectedInterfaces` for this step.

```ts
import { DMXInterface } from "usbdmx-js";

const path = "foo"
const fx5 = new DMXInterface(path);
// OR
const fx5 = DMXInterface.open(path);
```

### Set Interface IO-mode
The FX5/Digital Enlightenment Interface provides multiple modes for operation:


- 0: Do nothing - Standby
- 1: DMX In -> DMX Out
- 2: PC Out -> DMX Out
- 3: DMX In + PC Out -> DMX Out
- 4: DMX In -> PC In
- 5: DMX In -> DMX Out & DMX In -> PC In
- 6: PC Out -> DMX Out & DMX In -> PC In
- 7: DMX In + PC Out -> DMX Out & DMX In -> PC In

In standby mode, the status indicator LED on the device is turned off. Upon setting a different mode, it will turn on

```ts
import { DMXInterface } from "usbdmx-js"

const mode = 6;

// Create USBDMX Interface
const path = "foo";
const fx5 = new DMXInterface(path);

// Set mode to value inside the variable
fx5.setMode(mode);
```

### Write data

To write data, the `DMXInterface` class provides a `write` function. It takes an array of `DMXCommand` as its only argument

#### DMXCommand

```json
{
  "channel": "[DMX channel (1-512; number)]",
  "value": "[DMX value (0-255; number)]"
}
```

Example:

```ts
// variable fx5 already defined

const data = [{channel: 0, value: 255}]
fx5.write(data);
```

### Read data

The USB Interface also has a DMX Input. If the corresponding mode is selected, you can read that data input. The callback function provides the `DMXCommand` object.

```ts
// variable fx5 already defined
fx5.dataCallback = (data: DMXCommand) => {
    // handle data
}
```

### Close Interface

To close the interface, call the `close` function on an `DMXInterface` object.
This will set the DMX mode to `0` and closes the HID connection. Any attempts to write to the device will fail.

```ts
// variable fx5 already defined
fx5.close();
```

## Full API

#### `getConnectedInterfaces = (): {vid: number, pid: number, path: string}[]`

- Gets all connected USB interfaces and returns an array of objects containing the vendor ID, product ID and path

### `DMXInterface` object

#### `device = new DMXInterface(path: string)`

- Initializes an `DMXInterface` object and opens the HID device

#### `device = DMXInterface.open(path: string)`

- Does the same as the command above

#### `setMode = (mode: number): number`

- Sets the Interface mode to the provided mode number

#### `write = (data: DMXCommand[]): number`

- Writes the provided data array to the dmx output

#### `dataCallback: (value: DMXCommand) => void`

- Can be used to listen to the DMX input of the device when the correct mode is set

#### `close = ()`

- Sets the Interface mode to 0 and closes the HID connection

## License

This project is licensed unter the MIT-license. More information can be found in the [LICENSE](LICENSE) file.
