import { ExportedConfigWithProps, InfoPlist, withEntitlementsPlist, type ConfigPlugin } from "@expo/config-plugins";

const updateParentAppAppGroupEntitlement = (iosConfig: ExportedConfigWithProps<InfoPlist>, groupIdentifier: string) => {
  if (!groupIdentifier) {
    throw new Error("App group group identifier is required")
  }

  const entitlements = iosConfig.modResults["com.apple.security.application-groups"];
  if (entitlements) {
    console.log('[updateParentAppAppGroupEntitlements] App group entitlement already exists for parent app')
    return iosConfig
  }

  console.log(`[updateParentAppAppGroupEntitlements] Setting App group entitlement for parent app to: ${groupIdentifier}`)
  iosConfig.modResults["com.apple.security.application-groups"] = [groupIdentifier];
  return iosConfig
}

export const withParentEntitlements: ConfigPlugin<{
  groupIdentifier: string;
}> = (
  config,
  { groupIdentifier },
) => {
  return withEntitlementsPlist(config, (config) => {
    if (config.ios === undefined) {
      throw new Error("Missing iOS config");
    }

    // update parent app's entitlements with the same app group information
    config = updateParentAppAppGroupEntitlement(config, groupIdentifier)

    return config;
  });
};
