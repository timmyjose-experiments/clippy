#!/usr/bin/env bash

set -euxo pipefail

ANDROID_DIR=android
IOS_DIR=ios

if [[ "$@" == *"--platform-clean"* ]];then
  (
    set +e
    echo "Cleaning android and ios directories..."
    rm -rf ${ANDROID_DIR} ${IOS_DIR}
  )
fi

if [[ "$@" == *"--clean"* ]]; then
  (
    set +e
    echo "Performing full clean build..."
    echo "Removing node_modules..."
    rm -rf node_modules
    echo "Removing android and ios directories..."
    rm -rf ${ANDROID_DIR} ${IOS_DIR}
  )
fi

yarn install
# prepare the user-defaults-suite-ios module
cd user-defaults-suite-ios && yarn && yarn clean && yarn prepare && cd ..

if [[ ! -d "${ANDROID_DIR}" || ! -d "${IOS_DIR}" ]]; then
  echo "Missing android and/or ios directories. Performing prebuild..."
  npx expo prebuild
fi
