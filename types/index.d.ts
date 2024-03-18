import { RemoteOptions } from "webdriverio";
import { SafariCapabilities } from "./safari";
type SafariRemoteOptions = RemoteOptions & {capabilities: SafariCapabilities};

export type TcWdioAppiumConfig = {
	[name: string]: RemoteOptions | SafariRemoteOptions;
}