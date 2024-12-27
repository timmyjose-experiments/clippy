import { type ConfigPlugin, withXcodeProject } from "@expo/config-plugins";

import { addBuildPhases } from "./xcode/addBuildPhases";
import { addPbxGroup } from "./xcode/addPbxGroup";
import { addProductFile } from "./xcode/addProductFile";
import { addTargetDependency } from "./xcode/addTargetDependency";
import { addToPbxNativeTargetSection } from "./xcode/addToPbxNativeTargetSection";
import { addToPbxProjectSection } from "./xcode/addToPbxProjectSection";
import { addXCConfigurationList } from "./xcode/addXCConfigurationList";

export const withXcode: ConfigPlugin<{
  name: string;
  nativeClipSrcRootDir: string;
  targetName: string;
  bundleIdentifier: string;
  deploymentTarget: string;
}> = (config, { name, nativeClipSrcRootDir, targetName, bundleIdentifier, deploymentTarget }) => {
  return withXcodeProject(config, (config) => {
    const xcodeProject = config.modResults;

    const targetUuid = xcodeProject.generateUuid();
    const groupName = "Embed App Clips";
    const { projectName, platformProjectRoot } = config.modRequest;

    const xCConfigurationList = addXCConfigurationList(xcodeProject, {
      name,
      targetName,
      currentProjectVersion: config.ios?.buildNumber || "1",
      bundleIdentifier,
      deploymentTarget,
    });

    const productFile = addProductFile(xcodeProject, {
      targetName,
      groupName,
    });

    const target = addToPbxNativeTargetSection(xcodeProject, {
      targetName,
      targetUuid,
      productFile,
      xCConfigurationList,
    });

    addToPbxProjectSection(xcodeProject, target);

    addTargetDependency(xcodeProject, target);

    addPbxGroup(xcodeProject, {
      projectName: projectName as string,
      nativeClipSrcRootDir,
      targetName,
      platformProjectRoot,
    });

    addBuildPhases(xcodeProject, {
      targetUuid,
      groupName,
      productFile,
      targetName,
      platformProjectRoot,
    });

    return config;
  });
};
