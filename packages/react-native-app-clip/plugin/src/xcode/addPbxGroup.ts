import type { XcodeProject } from "@expo/config-plugins";
import fs from "node:fs";
import path from "node:path";

export function addPbxGroup(
  xcodeProject: XcodeProject,
  {
    projectName,
    nativeClipSrcRootDir,
    targetName,
    platformProjectRoot,
  }: { projectName: string; nativeClipSrcRootDir: string; targetName: string; platformProjectRoot: string },
) {
  const targetPath = path.join(platformProjectRoot, targetName);

  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  // Copy the Native app clip files over to the newly created app clip
  const nativeClipSrcRootDirPath = path.join(path.join(platformProjectRoot, ".."), nativeClipSrcRootDir)
  const filesToCopy = fs.readdirSync(nativeClipSrcRootDirPath)

  for (const file of filesToCopy) {
    const source = path.join(nativeClipSrcRootDirPath, file);
    if (fs.lstatSync(source).isDirectory()) {
      console.log(`[addPbxGroup] Copying directory: ${source} to ${targetPath}`)
      copyFolderRecursiveSync(source, targetPath)
    } else {
      console.log(`[addPbxGroup] Copying file: ${source} to ${targetPath}`)
      copyFileSync(source, targetPath);
    }
  }

  // Copy Images.xcassets
  const imagesXcassetsSource = path.join(
    platformProjectRoot,
    projectName,
    "Images.xcassets",
  );
  copyFolderRecursiveSync(imagesXcassetsSource, targetPath);

  console.log(`[addPbxGroup] adding to PBX group`)
  const { uuid: pbxGroupUuid } = xcodeProject.addPbxGroup(filesToCopy, targetName, targetName)

  // Add PBXGroup to top level group
  const groups = xcodeProject.hash.project.objects.PBXGroup;
  if (pbxGroupUuid) {
    for (const key of Object.keys(groups)) {
      if (groups[key].name === undefined && groups[key].path === undefined) {
        xcodeProject.addToPbxGroup(pbxGroupUuid, key);
      }
    }
  }
}

function copyFileSync(source: string, target: string) {
  let targetFile = target;

  if (fs.existsSync(target) && fs.lstatSync(target).isDirectory()) {
    targetFile = path.join(target, path.basename(source));
  }

  fs.writeFileSync(targetFile, fs.readFileSync(source));
}

function copyFolderRecursiveSync(source: string, target: string) {
  const targetPath = path.join(target, path.basename(source));
  if (!fs.existsSync(targetPath)) {
    fs.mkdirSync(targetPath, { recursive: true });
  }

  if (fs.lstatSync(source).isDirectory()) {
    const files = fs.readdirSync(source);
    for (const file of files) {
      const currentPath = path.join(source, file);
      if (fs.lstatSync(currentPath).isDirectory()) {
        copyFolderRecursiveSync(currentPath, targetPath);
      } else {
        copyFileSync(currentPath, targetPath);
      }
    }
  }
}
