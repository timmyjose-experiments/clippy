PoC of trying to integrate an `iOS` app clip written in `Swift` with an `expo` React Native app (the full app).


## Generate App Clip Code (Local)

```
AppClipCodeGenerator generate \
    --url 'https://fullsheepcareful.loca.lt' \
    --type cam \
    --foreground E0FF31 \
    --background 000000 \
    --output clippy-code.svg
```


## Generate QR Code

Use a QR code instead: https://www.qr-code-generator.com/ with the invocation url: `https://fullsheepcareful.loca.lt`.


## Build & Run

Currently, using `Xcode`:

1. Select target in `Xcode` (`clippy`, `clippyClip`), choose "Edit Scheme" and choose the `Release` scheme.
2. Also set the correct account under "Signing and Capabilities".


## Choosing different Native app clips for testing

There are two bundled Native app clips:

1. clippyClip (Deprecated)

This is in the `<repo-root>/clippClip` directory. It is a simple "Activity Recommender" app clip adapted from: https://www.swift.org/getting-started/swiftui/

To run this as the Native app clip, change the configuration in `app.json` to:

````
"plugins": [
  "expo-build-properties",
  [
    "react-native-app-clip",
    {
      "name": "ClippyClip",
      "nativeClipSrcRootDir": "clippyClip",
      "bundleIdSuffix": "Clip",
      "targetSuffix": "Clip",
      "groupIdentifier": "group.com.timmyjose.clippy",
      "deploymentTarget": "15.0",
      "appleSignin": true
    }
  ]
]
````

2. clippyCalcClip

This is located in `<project-root>/clippyCalcClip` and is a more comprehensive Native app clip - a clone of the `iOS`/`macOS` `Calculator` app
adaoted from: https://betterprogramming.pub/build-the-apple-calculator-in-swiftui-2fad61285dc8.

To run this as the Native app clip, change the configuration in `app.json` to:

```
"plugins": [
  "expo-build-properties",
  [
    "react-native-app-clip",
    {
      "name": "ClippyCalcClip",
      "nativeClipSrcRootDir": "clippyCalcClip",
      "bundleIdSuffix": "Clip",
      "targetSuffix": "Clip",
      "groupIdentifier": "group.com.timmyjose.clippy",
      "deploymentTarget": "15.0",
      "appleSignin": true
    }
  ]
]

```

(Note: This is the default Native app clip that is configured in `main`).

## Testing in TestFlight

There is an [AASA](https://developer.apple.com/documentation/xcode/supporting-associated-domains) file in the `<project-root>/aasa/.well-known` directory. Note the `Apple Team ID` in the `appID` field.

```
$ cd aasa
$ python3 -m http.server 8080
```

Install `LocalTunnel`:

```
$ npm install -g localtunnel
```

Ensure that we have a persistent subdomain (static) by passing the `--subdomain` flag:

```
 lt --port 9999 --subdomain fullsheepcareful
 ```

 Running it should show:

 ```
$ lt --port 9999 --subdomain fullsheepcareful
your url is: https://fullsheepcareful.loca.lt
 ```

Generate the App Clip Code (optional - can use the one generated in `AppStore Connect`):

 ```
AppClipCodeGenerator generate \
    --url 'https://fullsheepcareful.loca.lt' \
    --type cam \
    --foreground E0FF31 \
    --background 000000 \
    --output clippy-code.svg
```

Validate the `AASA` and Associated Domains linking:

* Check that the `Apple` CDN can pick up the `AASA` file by opening https://app-site-association.cdn-apple.com/a/v1/fullsheepcareful.loca.lt in a browser.
* Also check using this validator: https://branch.io/resources/aasa-validator/
  (Use the main app bundle id: `com.timmyjose.clippy`)

Finally, register this URL in `AppStore Connect`, in the `Associated Domains` for the project as well.