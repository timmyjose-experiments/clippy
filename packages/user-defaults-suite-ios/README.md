# android-kv-backup-agent

This is an `expo` [Native module](https://docs.expo.dev/modules/overview/) which implements an Android Key-Value Backup Agent, allowing `Payy` to save key-value `SharedPreferences` 
using Android's Key-Value backup service by extending [BackupAgentHelper](https://developer.android.com/identity/data/keyvaluebackup#BackupAgentHelper).

Refer to the [Android Key-Value Backup Service](https://developer.android.com/identity/data/keyvaluebackup) docs for more details.

## Setup

This plugin is intended to be built and used by [Payy](../payy/README.md) as part of the app build process. 

To build directly:

```bash
$ yarn clean && yarn prepare
```