/** @link Based on https://github.com/appium/appium-safari-driver/blob/master/README.md */
export type SafariCapabilities = {
	/** safaridriver binary can only create WebDriver sessions for desktop or mobile Safari and can only run on macOS. Value of platformName could equal to 'Mac' or 'iOS' in order to start Safari driver session for the corresponding platform. Values of platformName are compared case-insensitively. **/
	"platformName": "Mac" | "iOS",
	/** Value of automationName must equal to 'Safari' in order to start Safari driver session. Values of automationName are compared case-insensitively. **/
	"appium:automationName": "Safari",
	/** safaridriver can only create WebDriver sessions for Safari. Any value passed to this capability will be changed to 'Safari'. **/
	"browserName": "Safari",
	/** safaridriver will only create a session using hosts whose Safari version matches the value of browserVersion. Browser version numbers are prefix-matched. For example, if the value of browserVersion is '12', this will allow hosts with a Safari version of '12.0.1' or '12.1'. **/
	"browserVersion"?: string,
	/** Makes the browser to ignore the appropriate security warning and thus allows navigation to web sites having invalid or expired TLS certificates. The capability is supported since safaridriver v15.4. **/
	"acceptInsecureCerts"?: boolean,
	/** safaridriver will only create a session using hosts whose OS version matches the value of safari:platformVersion. OS version numbers are prefix-matched. For example, if the value of safari:platformVersion is '12', this will allow hosts with an OS version of '12.0' or '12.1' but not '10.12'. */
	"safari:platformVersion"?: string,
	/** safaridriver will only create a session using hosts whose OS build version matches the value of safari:platformBuildVersion. example of a macOS build version is '18E193'. On macOS, the OS build version can be determined by running the sw_vers(1) utility. */
	"safari:platformBuildVersion"?: string,
	/** If the value of safari:useSimulator is true, safaridriver will only use iOS Simulator hosts. If the value of safari:useSimulator is false, safaridriver will not use iOS Simulator hosts. NOTE: An Xcode installation is required in order to run WebDriver tests on iOS Simulator hosts. */
	"safari:useSimulator"?: boolean,
	/** If the value of safari:deviceType is 'iPhone', safaridriver will only create a session using an iPhone device or iPhone simulator. If the value of safari:deviceType is 'iPad', safaridriver will only create a session using an iPad device or iPad simulator. Values of safari:deviceType are compared case-insensitively. */
	"safari:deviceType"?: "iPhone" | "iPad",
	/** safaridriver will only create a session using hosts whose device name matches the value of safari:deviceName. Device names are compared case-insensitively. NOTE: Device names for connected devices are shown in iTunes. If Xcode is installed, device names for connected devices are available via the output of instruments(1) and in the Devices and Simulators window (accessed in Xcode via "Window > Devices and Simulators"). */
	"safari:deviceName"?: string,
	/** safaridriver will only create a session using hosts whose device UDID matches the value of safari:deviceUDID. Device UDIDs are compared case-insensitively. NOTE: If Xcode is installed, UDIDs for connected devices are available via the output of instruments(1) and in the Devices and Simulators window (accessed in Xcode via "Window > Devices and Simulators"). */
	"safari:deviceUDID"?: string,
	/** This capability instructs Safari to preload the Web Inspector and JavaScript debugger in the background prior to returning a newly-created window. To pause the test's execution in JavaScript and bring up Web Inspector's Debugger tab, you can simply evaluate a debugger; statement in the test page. */
	"safari:automaticInspection"?: boolean,
	/** This capability instructs Safari to preload the Web Inspector and start a Timeline recording in the background prior to returning a newly-created window. To view the recording, open the Web Inspector through Safari's Develop menu. */
	"safari:automaticProfiling"?: boolean,
	/** This capability allows a test to temporarily change Safari's policies for WebRTC and Media Capture. The value of the webkit:WebRTC capability is a dictionary with the following sub-keys, all of which are optional: DisableInsecureMediaCapture - Normally, Safari refuses to allow media capture over insecure connections. This restriction is relaxed by default for WebDriver sessions for testing purposes (for example, a test web server not configured for HTTPS). When this capability is specified, Safari will revert to the normal behavior of preventing media capture over insecure connections. DisableICECandidateFiltering - To protect a user's privacy, Safari normally filters out WebRTC ICE candidates that correspond to internal network addresses when capture devices are not in use. This capability suppresses ICE candidate filtering so that both internal and external network addresses are always sent as ICE candidates. */
	"webkit:WebRTC"?: {
		DisableInsecureMediaCapture?: boolean,
		DisableICECandidateFiltering?: boolean,
	},
};
