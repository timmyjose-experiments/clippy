import { IOSConfig, withPlugins, type ConfigPlugin } from "@expo/config-plugins";

import { withConfig } from "./withConfig";
import { withEntitlements } from "./withEntitlements";
import { withXcode } from "./withXcode";
import { withParentEntitlements } from "./withParentEntitlements";

const withAppClip: ConfigPlugin<{
  name?: string;
  nativeClipSrcRootDir?: string;
  bundleIdSuffix?: string;
  targetSuffix?: string;
  groupIdentifier?: string;
  deploymentTarget?: string;
  appleSignin?: boolean;
  applePayMerchantIds?: string[];
}> = (
  config,
  {
    name,
    nativeClipSrcRootDir,
    bundleIdSuffix,
    targetSuffix,
    groupIdentifier,
    deploymentTarget,
    appleSignin,
    applePayMerchantIds
  } = {},
) => {
  name ??= "Clip";
  bundleIdSuffix ??= "Clip";
  targetSuffix ??= "Clip";
  deploymentTarget ??= "14.0";
  appleSignin ??= false;

  if (!config.ios?.bundleIdentifier) {
    throw new Error("No bundle identifier specified in app config");
  }

  const bundleIdentifier = `${config.ios.bundleIdentifier}.${bundleIdSuffix}`;
  const targetName = `${IOSConfig.XcodeUtils.sanitizedName(config.name)}${targetSuffix}`;

  const modifiedConfig = withPlugins(config, [
    [
      withConfig,
      { targetName, bundleIdentifier, appleSignin, applePayMerchantIds },
    ],
    [
      withEntitlements,
      { targetName, groupIdentifier, appleSignin, applePayMerchantIds },
    ],
    [
      withParentEntitlements,
      { groupIdentifier }
    ],
    [
      withXcode,
      {
        name,
        nativeClipSrcRootDir,
        targetName,
        bundleIdentifier,
        deploymentTarget,
      },
    ],
  ]);

  return modifiedConfig;
};

export default withAppClip;
