#!/usr/bin/env bash

set -euxo pipefail

# Determines if we are building using `yarn` or `eas` cli
EAS_BUILD=${EAS_BUILD:-""}

echo "EAS_BUILD = ${EAS_BUILD}"

ANDROID_DIR=android
IOS_DIR=ios

if [[ -z "$EAS_BUILD" ]]; then
  if [[ "$@" == *"--clean"* ]]; then
    (
      set +e
      echo "Performing full clean build..."
      echo "Removing node_modules..."
      rm -rf node_modules
      echo "Removing app/node_modules"
      rm -rf ../../node_modules
      echo "Removing android and ios directories..."
      rm -rf ${ANDROID_DIR} ${IOS_DIR}
    )
  fi
yarn install
fi

# prepare the user-defaults-suite-ios module
echo "Preparing the UserDefaults native module..."
yarn workspace user-defaults-suite-ios clean
yarn workspace user-defaults-suite-ios prepare


if [[ -z "$EAS_BUILD" ]]; then
    # run `prebuild` iff the `android` and `iOS` directories do not exist
    if [[ ! -d ${ANDROID_DIR} ]] || [[ ! -d ${IOS_DIR} ]]
    then
        echo "Missing android and/or iOS directories, running expo prebuild..."
        npx expo prebuild
    fi
fi
