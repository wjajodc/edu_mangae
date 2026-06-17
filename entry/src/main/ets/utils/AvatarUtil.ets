import { common } from '@kit.AbilityKit';
import { fileIo, fileUri, picker } from '@kit.CoreFileKit';
import { photoAccessHelper } from '@kit.MediaLibraryKit';

const AVATAR_DIR_NAME: string = 'avatar';
const AVATAR_FILE_NAME: string = 'profile_avatar.jpg';
const AVATAR_TEMP_FILE_NAME: string = 'profile_avatar_tmp.jpg';

/**
 * 头像选取与本地持久化
 */
export class AvatarUtil {
  /** 优先从相册选取，失败时回退到文件管理器 */
  static async pickLocalImage(): Promise<string | null> {
    const galleryUri = await AvatarUtil.pickFromGallery();
    if (galleryUri) {
      return galleryUri;
    }
    return AvatarUtil.pickFromDocuments();
  }

  /** 将所选图片复制到应用私有目录，返回可用于 Image 的 URI */
  static saveToAppFiles(sourceUri: string, context: common.UIAbilityContext): string {
    const avatarDir = `${context.filesDir}/${AVATAR_DIR_NAME}`;
    AvatarUtil.ensureDir(avatarDir);
    const destPath = `${avatarDir}/${AVATAR_FILE_NAME}`;
    const tempPath = `${avatarDir}/${AVATAR_TEMP_FILE_NAME}`;

    AvatarUtil.removeIfExists(tempPath);
    AvatarUtil.copyUriToFile(sourceUri, tempPath);
    AvatarUtil.removeIfExists(destPath);
    fileIo.copyFileSync(tempPath, destPath);
    AvatarUtil.removeIfExists(tempPath);
    return AvatarUtil.toDisplayUri(destPath);
  }

  /** 读取已保存的头像 URI（应用重启后仍可用） */
  static getSavedAvatarUri(context: common.UIAbilityContext): string {
    const destPath = `${context.filesDir}/${AVATAR_DIR_NAME}/${AVATAR_FILE_NAME}`;
    try {
      fileIo.accessSync(destPath);
      return AvatarUtil.toDisplayUri(destPath);
    } catch {
      return '';
    }
  }

  /** 解析可展示的头像 URI，无效时返回空字符串 */
  static resolveDisplayAvatarUri(storedUri: string, context: common.UIAbilityContext): string {
    if (storedUri.length > 0 && AvatarUtil.isReadableUri(storedUri)) {
      return storedUri;
    }
    const localUri = AvatarUtil.getSavedAvatarUri(context);
    if (localUri.length > 0) {
      return localUri;
    }
    return '';
  }

  /** 判断 URI 对应文件是否可读 */
  static isReadableUri(uri: string): boolean {
    if (!uri || uri.length === 0) {
      return false;
    }
    try {
      const file = fileIo.openSync(uri, fileIo.OpenMode.READ_ONLY);
      fileIo.closeSync(file);
      return true;
    } catch {
      try {
        fileIo.accessSync(AvatarUtil.toLocalPath(uri));
        return true;
      } catch {
        return false;
      }
    }
  }

  static toDisplayUri(path: string): string {
    if (path.startsWith('file://')) {
      return path;
    }
    return fileUri.getUriFromPath(path);
  }

  private static toLocalPath(uri: string): string {
    if (uri.startsWith('file://')) {
      return uri.substring(7);
    }
    return uri;
  }

  private static async pickFromGallery(): Promise<string | null> {
    try {
      const options = new photoAccessHelper.PhotoSelectOptions();
      options.MIMEType = photoAccessHelper.PhotoViewMIMETypes.IMAGE_TYPE;
      options.maxSelectNumber = 1;
      const photoPicker = new photoAccessHelper.PhotoViewPicker();
      const result = await photoPicker.select(options);
      if (result && result.photoUris && result.photoUris.length > 0) {
        return result.photoUris[0];
      }
    } catch (err) {
      console.error('pickFromGallery failed: ' + JSON.stringify(err));
    }
    return null;
  }

  private static async pickFromDocuments(): Promise<string | null> {
    try {
      const documentPicker = new picker.DocumentViewPicker();
      const uris = await documentPicker.select({
        maxSelectNumber: 1,
      });
      if (uris && uris.length > 0) {
        return uris[0];
      }
    } catch (err) {
      console.error('pickFromDocuments failed: ' + JSON.stringify(err));
      throw new Error('pick document failed');
    }
    return null;
  }

  private static copyUriToFile(sourceUri: string, destPath: string): void {
    const srcFile = fileIo.openSync(sourceUri, fileIo.OpenMode.READ_ONLY);
    try {
      const stat = fileIo.statSync(srcFile.fd);
      if (!stat || stat.size <= 0) {
        throw new Error('image file is empty');
      }
      const buffer = new ArrayBuffer(stat.size);
      fileIo.readSync(srcFile.fd, buffer);
      const destFile = fileIo.openSync(
        destPath,
        fileIo.OpenMode.READ_WRITE | fileIo.OpenMode.CREATE | fileIo.OpenMode.TRUNC
      );
      try {
        fileIo.writeSync(destFile.fd, buffer);
      } finally {
        fileIo.closeSync(destFile);
      }
    } finally {
      fileIo.closeSync(srcFile);
    }
  }

  private static ensureDir(dir: string): void {
    try {
      fileIo.accessSync(dir);
    } catch {
      fileIo.mkdirSync(dir);
    }
  }

  private static removeIfExists(path: string): void {
    try {
      fileIo.unlinkSync(path);
    } catch {
      // 文件不存在时忽略
    }
  }
}
