import { ExpoConfig, ConfigContext } from 'expo/config'
import versions from './versions.json'

export default ({ config } : ConfigContext ): ExpoConfig => ({
  ...config,
    name: "clippy",
    slug: "clippy",
    version: versions.version,
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    splash: {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#ffffff"
    },
    ios: {
      supportsTablet: true,
      bundleIdentifier: "com.timmyjose.clippy",
      associatedDomains: [
        "applinks:fullsheepcareful.loca.lt",
        "appclips:fullsheepcareful.loca.lt"
      ],
      entitlements: {
        "com.apple.developer.associated-appclip-app-identifiers": [
          "$(AppIdentifierPrefix)com.timmyjose.clippy.Clip"
        ]
      }
    },
    android: {
      adaptiveIcon: {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#ffffff"
      },
      package: "com.timmyjose.clippy"
    },
    web: {
      "favicon": "./assets/favicon.png"
    },
    extra: {
      "eas": {
        "projectId": "885a0837-e970-414d-b5fa-1ba7d5d6ec54"
      }
    },
    plugins: [
      [
        "expo-build-properties",
        {
          "android": {
            "minSdkVersion": 26,
            "compileSdkVersion": 34,
            "targetSdkVersion": 34,
            "buildToolsVersion": "34.0.0",
            "enableProguardInReleaseBuilds": true,
            "enableShrinkResourcesInReleaseBuilds": true,
          }, 
          "ios": {
            "useFrameworks": "static",
            "deploymentTarget": "15.0"
          }
        }
      ],
      [
        "react-native-app-clip",
        {
          "name": "ClippyCalcClip",
          "nativeClipSrcRootDir": "clippyCalcClip/clippyCalcClip",
          "bundleIdSuffix": "Clip",
          "targetSuffix": "Clip",
          "groupIdentifier": "group.com.timmyjose.clippy",
          "deploymentTarget": "15.0",
          "appleSignin": false
        }
      ]
    ],
    runtimeVersion: {
      "policy": "appVersion"
    },
    updates: {
      "url": "https://u.expo.dev/885a0837-e970-414d-b5fa-1ba7d5d6ec54"
    }
  })
