import { RemoteOptions } from "webdriverio";
import { SafariCapabilities } from "./safari";

export type ResizeStrategies = "setWindowSize" | "rotateDevice" | "setOrientation";
export type TcWdioAppiumOptions = {
	/**
	 * On mobile devices, there is no window to resize.
	 * If width >= height, the window/device is in landscape mode, portait otherwise.
	 *
	 * * `"auto"` use best guesses based on the driver and device (default)
	 * * `"setWindowSize"` will use https://webdriver.io/docs/api/browser/setWindowSize/
	 * * `"rotateDevice"` will use https://webdriver.io/docs/api/appium/#rotatedevice
	 * * `"setOrientation"` will use https://webdriver.io/docs/api/jsonwp/#setorientation
	 */
	"tcwdioappium:resizeStrategy"?: "auto" | ResizeStrategies,
};

type SafariRemoteOptions = RemoteOptions & {capabilities: SafariCapabilities};

export type TcWdioAppiumConfig = {
	[name: string]: TcWdioAppiumOptions & (RemoteOptions | SafariRemoteOptions),
};
