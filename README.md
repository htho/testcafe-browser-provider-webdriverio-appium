# testcafe-browser-provider-webdriverio-appium

This is the **[WebDriverIO](https://webdriver.io/)** browser provider plugin for [TestCafe](https://devexpress.github.io/testcafe) with a focus on **[Appium](https://appium.io)**.

This should have been the Appium TestCafe browser provider plugin. But [Appium recommends WebDriverIO](https://appium.io/docs/en/latest/quickstart/test-js/) as *the* JS-Client library. The simplest solution to configure WebdriverIO to connect to an Appium server, also makes it possible configure WebDriverIO in any other way. This makes it the WebdriverIO plugin. Anyway, the focus is on Appium - hence the name.

## Install

```cmd
npm install testcafe-browser-provider-webdriverio-appium
```

## Prerequisites

### Appium Server

An [Appium Server](https://appium.io/docs/en/latest/quickstart/install/) with the desired [drivers](https://appium.io/docs/en/latest/ecosystem/drivers/) up and running. [See below](#appium-server-setup) for a simple setup.

### Client Configuration

You need a `tcwdioappium.config.mjs` in your `cwd`.

The default export is an object that has the browser-alias as keys and the configuration that is passed to [`webdriverio.remote()`](https://webdriver.io/docs/api/modules/#remoteoptions-modifier).

`tcwdioappium.config.mjs`

```js
// @ts-check
const winServer = {
	hostname: process.env["APPIUM_MACOS_HOST"] ?? "localhost",
	port: 4723,
};
const macServer = {
	hostname: process.env["APPIUM_WIN_HOST"] ?? "localhost",
	port: 4723,
};

/** @type {import("testcafe-browser-provider-webdriverio-appium").TcWdioAppiumConfig} */
export default {
		"Mac:safari": {
		...macServer,
		capabilities: {
			"appium:automationName": "Safari",

			"platformName": "Mac",
			"browserName": "Safari",
		},
	},

	"iPhoneSE3:safari": {
		...macServer,
		capabilities: {
			"appium:automationName": "xcuitest",

			"platformName": "ios",
			"browserName": "safari",
			
			"appium:deviceName": "iPhone SE (3rd generation)",
		},
	},

	"iPhoneSE3:safari:safari-driver": {
		...macServer,
		capabilities: {
			"appium:automationName": "Safari",
			
			"platformName": "iOS",
			"browserName": "Safari",
			
			"safari:useSimulator": true,
			"safari:deviceName": "iPhone SE (3rd generation)",
		}
	},

	"iPad6:safari": {
		...macServer,
		capabilities: {
			"appium:automationName": "xcuitest",
			
			"platformName": "ios",
			"browserName": "safari",

			"appium:deviceName": "iPad (6th generation)",
		},
	},

	"iPad6:safari:safari-driver": {
		...macServer,
		capabilities: {
			"appium:automationName": "Safari",
			
			"platformName": "iOS",
			"browserName": "Safari",
			
			"safari:useSimulator": true,
			"safari:deviceName": "iPad (6th generation)",
		},
		"tcwdioappium:resizeStrategy": "rotateDevice"
	},

	"iPadRealDevice:safari:safari-driver": {
		...macServer,
		capabilities: {
			"appium:automationName": "Safari",
			
			"platformName": "iOS",
			"browserName": "Safari",
			
			"safari:useSimulator": false,
			"safari:deviceName": "my-ipad",
		},
	},

	"win:chrome": {
		...winServer,
		capabilities: {
			"appium:automationName": "Chromium",

			"platformName": "windows",
			"browserName": "chrome",
		},
	},

	/** does not use Appium */
	"local:chrome": {
		capabilities: {
			browserName: "chrome",
		},
	},
	/** does not use Appium */
	"local:chrome:headless": {
		capabilities: {
			"browserName": "chrome",
			"goog:chromeOptions": {
				args: ["headless"],
			},
		},
	},
};
```

### Firewall

Depending on your firewall settings you need to [configure TestCafe](https://testcafe.io/documentation/403937/faq/working-with-testcafe?search#i-installed-testcafe-but-i-cannot-run-it-what-should-i-do)
and your Firewall to open the needed ports.

## Usage

### List

You can list the browsers available. (These are the keys defined in the default export of `tcwdioappium.config.mjs`):

```txt
% testcafe -b webdriverio-appium
"webdriverio-appium:Mac:safari"
"webdriverio-appium:iPhoneSE3:safari"
"webdriverio-appium:iPhoneSE3:safari:safari-driver"
"webdriverio-appium:iPad6:safari"
"webdriverio-appium:iPad6:safari:safari-driver"
"webdriverio-appium:iPadRealDevice:safari"
"webdriverio-appium:win:chrome"
"webdriverio-appium:local:chrome"
"webdriverio-appium:local:chrome:headless"
```

### Command Line Usage

From the command line run for example:

```txt
% testcafe webdriverio-appium:win:chrome path/to/test/file.js
```

### API Usage

When you use the API, pass the alias to the `browsers()` method:

```js
testCafe
	.createRunner()
	.src("path/to/test/file.js")
	.browsers("webdriverio-appium:win:chrome")
	.run();
```

## Resize

Naturally browser windows on phones and tablets can not be resized.

For mobile platforms (when `platformName` is `ios` or `android` -  case-insensitive), testcafe-browser-provider-webdriverio-appium skips resizing and tries to rotate the device instead, if the height becomes greater/smaller then width.

There are two API functions in appiums documentation that should work.
[`rotateDevice`](https://webdriver.io/docs/api/appium/#rotatedevice) is the official method, but it does not work (with `xcuitest-driver`, `safari-driver`).
[`setOrientation`](https://webdriver.io/docs/api/jsonwp/#setorientation) is deprecated but it works (with `xcuitest-driver`, `safari-driver`).

In case the default strategy does not work, the strategy can be configured
on a per-browser basis with the `tcwdioappium:resizeStrategy` key.

## Supported/Tested Platforms

These features are known to work on these [platforms using these drivers](https://appium.io/docs/en/latest/ecosystem/drivers/).

|                       | basic functions    | resizeWindow | (setOrientation) | (rotateDevice) |
| --------------------- | ------------------ | ------------ | ---------------- | -------------- |
| Windows (local)       | Chromium           | Chromium     | ?                | ?              |
| Windows               | Chromium           | Chromium     | ?                | ?              |
| macOS (local)         | ?                  | ?            | ?                | ?              |
| macOS                 | Safari             | Safari       | ?                | ?              |
| iOS 17 (Simulator)    | Safari,XCUITest    | -            | XCUITest         | -              |
| iOS 17 (Real Device)  | Safari,(XCUITest?) | -            | ?                | ?              |
| Android (Simulator)   | ?                  | ?            | ?                | ?              |
| Android (Real Device) | ?                  | ?            | ?                | ?              |

* `?`: Not tried
* XCUITest on real iOS devices: I was not able to make it work.
  [Should be possible](https://appium.github.io/appium-xcuitest-driver/latest/preparation/real-device-config/#) with sufficient time.
Other devices/platforms will probably work, but I did not test them yet.

## Known Issues

Unfortunately full-screen screenshots are 1px smaller than the size set by `t.resize()`.

<details>
	<summary>This is just how TestCafe creates screenshots.</summary>

A screenshot may include the whole desktop or the complete browser window.
TestCafe puts a "screenshot mark" in the bottom-right corner of the window
and then takes the screenshot.
The screenshot mark is an image with a height of 1px and a random pattern
of a certain width.
TestCafe searches for this mark in the screenshot and crops the image according. [TestCafe crops the bottom-row to remove the mark](https://github.com/DevExpress/testcafe/blob/a9f9764b0c624258f40478491d5a9a0f06f3229f/src/screenshots/crop.js#L115).

</details>

## Author

Hauke T.

## Appendix

### Appium Server Setup

One way to setup an Appium server is to use a local npm package.
Remember that for [Safari you still need to activate the WebDriver in macOS](https://github.com/appium/appium-safari-driver).

`package.json`

```json
{
  "dependencies": {
    "appium": "^2.11.2",
    "appium-chromium-driver": "^1.3.28",
    "appium-safari-driver": "^3.5.16",
		"appium-xcuitest-driver": "^7.24.2"
  },
  "scripts": {
    "start": "appium",
    "start-for-inspect": "appium --allow-cors",
    "list": "appium driver list --installed"
  }
}
```
