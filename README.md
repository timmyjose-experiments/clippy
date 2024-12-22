PoC of an `iOS` app clip written in `Swift` with an `expo` React Native parent app (the full app).

## Configuring the Native app clip

This is located in `<project-root>/clippyCalcClip` - a clone of the `iOS`/`macOS` `Calculator` app
adaoted from: https://betterprogramming.pub/build-the-apple-calculator-in-swiftui-2fad61285dc8.

Update `app.json` to:

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


## Build & Run

### Using `Xcode`

* Select target in `Xcode` (`clippy`, `clippyClip`), choose "Edit Scheme" and choose the `Release` scheme.
* Also set the correct account under "Signing and Capabilities".
* Launch on device (or simulator).


## Testing 

### Using Local Experience

In the `iOS` device:

* Go to `Settings` -> `Developer` -> `App Clips Testing`
* Tap `Local Experiences` -> `Register Local Experience`, and then:
  * Enter `https://fullsheepcareful.loca.lt` for the `URL Prefix`
  * For the` Bundle Id`: `com.timmyjose.clippy.Clip`
  * Enter suitable values for the `App Clip Card`, and save

Scan the generated `App Clip Code`, `QR Code`, and it *should* launch the Native app clip.


### Using TestFlight

There is an [AASA](https://developer.apple.com/documentation/xcode/supporting-associated-domains) file in the `<project-root>/aasa/.well-known` directory. Note the `Apple Team ID` in the `appID` field:

```
{
  "applinks": {
    "apps": [],
    "details": [
      {
        "appID": "N8XNN99644.com.timmyjose.clippy",
        "paths": ["*"]
      }
    ]
  },
  "appclips": {
    "apps": [
      "N8XNN99644.com.timmyjose.clippy.Clip"
    ]
  }
}
```

Serve this using the bundled `localServer` `Python` script:

```
$ cd aasa
$ python3 localServer.py
```

Install `LocalTunnel` (if not already available):

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

Generate a `QR` Code using https://www.qr-code-generator.com/ (or any other suitable resources) with the invocation url: `https://fullsheepcareful.loca.lt`.

#### Validate the `AASA` and Associated Domains linking

* Check that the `Apple` CDN can pick up the `AASA` file by opening https://app-site-association.cdn-apple.com/a/v1/fullsheepcareful.loca.lt in a browser.
* Also check using this validator: https://branch.io/resources/aasa-validator/
  (Use the main app bundle id: `com.timmyjose.clippy`)
* Finally, register this URL in `AppStore Connect`, in the `Associated Domains` for the project as well.


**Note**: Testing end-to-end in `TestFlight` is apparently not fully possible till the (main) app is live (i.e., published in the `App Store`).
          Use a [Local Experience](#using-local-experience) to test locally.
