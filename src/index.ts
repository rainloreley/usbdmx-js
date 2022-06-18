import HID from "node-hid";

const DMX_INTERFACE_VENDOR_ID = 0x4B4
const DMX_INTERFACE_PRODUCT_ID = 0xF1F
const DMX_INTERFACE_VENDOR_ID_2 = 0x16C0
const DMX_INTERFACE_PRODUCT_ID_2 = 0x88B

const getConnectedInterfaces = (): {vid: number, pid: number, path: string}[] => {
    var _interfaces: {vid: number, pid: number, path: string}[] = [];
    const _connectedHIDDevices = HID.devices();
    for (var _device of _connectedHIDDevices) {
        // check for first VID + PID combo
        if (_device.vendorId === DMX_INTERFACE_VENDOR_ID && _device.productId === DMX_INTERFACE_PRODUCT_ID) {
            _interfaces.push({
                vid: _device.vendorId,
                pid: _device.productId,
                path: _device.path!
            })
        }

        // check for second VID + PID combo
        else if (_device.vendorId === DMX_INTERFACE_VENDOR_ID_2 && _device.productId === DMX_INTERFACE_PRODUCT_ID_2) {
            _interfaces.push({
                vid: _device.vendorId,
                pid: _device.productId,
                path: _device.path!
            })
        }
        continue;
    }
    return _interfaces;
}
export * from "./DMXInterface";
export {getConnectedInterfaces}