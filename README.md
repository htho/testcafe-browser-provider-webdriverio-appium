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
    port: 4723
};
const macServer = {
    hostname: process.env["APPIUM_WIN_HOST"] ?? "localhost",
    port: 4723
};

/** @type {import("testcafe-browser-provider-webdriverio-appium").TcWdioAppiumConfig} */
export default {
    "macOS:safari": {
        ...macServer,
        capabilities: {
            "platformName": "Mac",
            "appium:automationName": "Safari",
            "browserName": "Safari",
        }
    },
    "iPhoneSE3:safari": {
        ...macServer,
        capabilities: {
            "platformName": "iOS",
            "appium:automationName": "Safari",
            "browserName": "Safari",
            "safari:useSimulator": true,
            "safari:deviceName": "iPhone SE (3rd generation)",
        }
    },
    "win:chrome": {
        ...winServer,
        capabilities: {
            "platformName": "windows",
            "browserName": "chrome",
            "appium:automationName": "Chromium",
        }
    },
};
```

## Usage

You can list the browsers available. (These are the keys defined in the default export of `tcwdioappium.config.mjs`):

```txt
% testcafe -b appium
"appium:macOS:safari"
"appium:iPhoneSE3:safari"
"appium:win:chrome"
```

From the command line run for example:

```txt
% testcafe appium:win:chrome path/to/test/file.js
```

When you use the API, pass the alias to the `browsers()` method:

```js
testCafe
    .createRunner()
    .src('path/to/test/file.js')
    .browsers('appium:win:chrome')
    .run();
```

## Supported/Tested Platforms

testcafe-browser-provider-webdriverio-appium is known to work with:

* Windows
  * Chrome
* macOS
  * Safari
* iOS (Simulator)
  * Safari

Other devices platforms will probably work, but I did not test them yet.

## Resize

For iOS (when `platformName` is `iOS`), testcafe-browser-provider-webdriverio-appium skips resizing and tries to [rotate](https://webdriver.io/docs/api/appium/#rotatedevice) the device instead, if the height becomes greater/smaller then width.

Anyway, I only tested this with the [Safari Plugin](https://github.com/appium/appium-safari-driver) and a simulated iPhone. **It had no effect there**.

## Known Issues

1. Unfortunately for some Browsers, screenshots are 1px smaller than the size set by `t.resize()`.

2. [Rotation instead of resizing](#resize) does not work yet.

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
    "appium": "^2.5.1",
    "appium-chromium-driver": "^1.3.20",
    "appium-safari-driver": "^3.5.11"
  },
  "scripts": {
    "start": "appium"
  }
}
```
