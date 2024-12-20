PoC of trying to integrate an `iOS` app clip written in `Swift` with an `expo` React Native app (the full app).


## Generate App Clip Code

```
AppClipCodeGenerator generate \
    --url 'https://full-sheep-careful.ngrok-free.app' \
    --type cam \
    --foreground E0FF31 \
    --background 000000 \
    --output clippy-code.svg
```

UPDATE:

Sadly, `https://full-sheep-careful.ngrok-free.app` is apparently too big a URL for app clip codes:

```
Compressed URL too large: The compressed URL byte size exceeds supported payload size of the App Clip Code.
```

Use a QR code instead: https://www.qr-code-generator.com/


## Build & Run

Currently, using `Xcode`:

1. Select target in `Xcode` (`clippy`, `clippyClip`), choose "Edit Scheme" and choose the `Release` scheme.
2. Also set the correct account under "Signing and Capabilities".


## Choosing different Native app clips for testing

There are two bundled Native app clips:

1. clippyClip

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

Expose the local server with `nrgok` (note the use of `--domain` which uses the one free static domain that `ngrok` allows free users):

```
$ ngrok http --domain=full-sheep-careful.ngrok-free.app 8080
```

Sample output from `ngrok`:

```
Session Status                online
Account                       zoltan.jose@gmail.com (Plan: Free)
Update                        update available (version 3.18.4, Ctrl-U to update)
Version                       3.15.1
Region                        India (in)
Web Interface                 http://127.0.0.1:4040
Forwarding                    https://full-sheep-careful.ngrok-free.app -> http://localhost:8080
```

Test that the `AASA` file has been set up correctly using this tool: https://branch.io/resources/aasa-validator/