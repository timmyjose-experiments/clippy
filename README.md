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