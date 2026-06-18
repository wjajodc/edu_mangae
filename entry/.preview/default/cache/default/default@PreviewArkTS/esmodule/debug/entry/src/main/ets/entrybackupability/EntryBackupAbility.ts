import BackupExtensionAbility from "@ohos:application.BackupExtensionAbility";
import type { BundleVersion as BundleVersion } from "@ohos:application.BackupExtensionAbility";
import hilog from "@ohos:hilog";
const DOMAIN = 0x0000;
export default class EntryBackupAbility extends BackupExtensionAbility {
    async onBackup(): Promise<void> {
        hilog.info(DOMAIN, 'testTag', 'onBackup ok');
    }
    async onRestore(bundleVersion: BundleVersion): Promise<void> {
        hilog.info(DOMAIN, 'testTag', 'onRestore ok %{public}s', JSON.stringify(bundleVersion));
    }
}
