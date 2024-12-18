PoC of trying to integrate an `iOS` app clip written in `Swift` with an `expo` React Native app (the full app).


## Generate App Clip Code

```
AppClipCodeGenerator generate \
    --url 'https://clippy-domain.com/appclip' \
    --type cam \
    --foreground E0FF31 \
    --background 000000 \
    --output clippy-code.svg

```


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

```

(Note: This is the default Native app clip that is configured in `main`).