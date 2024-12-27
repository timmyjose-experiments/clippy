import type { XcodeProject } from "@expo/config-plugins";
import util from "node:util";
import path from 'node:path';
import fs from 'node:fs';

const getSwiftFilesFromDir = (dirPath: string, commonPath: string): string[] => {
  const entries = fs.readdirSync(dirPath);
  const swiftFiles = [];

  for (const entry of entries) {
    const fullPath = path.join(dirPath, entry);
    if (fs.lstatSync(fullPath).isDirectory()) {
      swiftFiles.push(...getSwiftFilesFromDir(fullPath, commonPath));
    } else if (entry.endsWith('.swift'))  {
      swiftFiles.push(path.relative(commonPath, fullPath));
    }
  }

  return swiftFiles;
}


export function addBuildPhases(
  xcodeProject: XcodeProject,
  {
    targetUuid,
    groupName,
    productFile,
    targetName,
    platformProjectRoot
  }: {
    targetUuid: string;
    groupName: string;
    productFile: {
      uuid: string;
      target: string;
      basename: string;
      group: string;
    };
    targetName: string;
    platformProjectRoot: string;
  },
) {
  const buildPath = `"$(CONTENTS_FOLDER_PATH)/AppClips"`;
  const folderType = "watch2_app"; // "watch2_app" uses the same subfolder spec (16), app_clip does not exist in cordova-node-xcode yet

  // Copy the essential Native app clip files that need to be compiled 
  const targetPath = path.join(platformProjectRoot, targetName);
  const allSwiftFiles = getSwiftFilesFromDir(targetPath, platformProjectRoot)
  console.log(`[addBuildPhases] Adding Swift and storyboard files to Build Phase...`)
  for (const swiftFile of allSwiftFiles) {
    console.log(swiftFile)
  }

  // Sources build phase
  xcodeProject.addBuildPhase(
    allSwiftFiles,
    "PBXSourcesBuildPhase",
    groupName,
    targetUuid,
    folderType,
    buildPath,
  );

  // Copy files build phase
  xcodeProject.addBuildPhase(
    [],
    "PBXCopyFilesBuildPhase",
    groupName,
    xcodeProject.getFirstTarget().uuid,
    folderType,
    buildPath,
  );

  xcodeProject
    .buildPhaseObject("PBXCopyFilesBuildPhase", groupName, productFile.target)
    .files.push({
      value: productFile.uuid,
      comment: util.format("%s in %s", productFile.basename, productFile.group), // longComment(file);
    });
  xcodeProject.addToPbxBuildFileSection(productFile);

  // Frameworks build phase
  xcodeProject.addBuildPhase(
    [],
    "PBXFrameworksBuildPhase",
    groupName,
    targetUuid,
    folderType,
    buildPath,
  );

  xcodeProject.addBuildPhase(
    ["Preview Content", "Assets.xcassets", "LaunchScreen.storyboard"],
    "PBXResourcesBuildPhase",
    groupName,
    targetUuid,
    folderType,
    buildPath
  )
}
