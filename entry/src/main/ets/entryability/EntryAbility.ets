import { AbilityConstant, UIAbility, Want } from '@kit.AbilityKit';
import { hilog } from '@kit.PerformanceAnalysisKit';
import { window } from '@kit.ArkUI';
import { ScheduleStore } from '../utils/ScheduleStore';
import { syncCurrentTeachingWeek } from '../utils/DateUtils';

const DOMAIN = 0x0000;
const TAG = 'EntryAbility';

export default class EntryAbility extends UIAbility {
  onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
    hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onCreate');
    PersistentStorage.persistProp('avatarUri', '');
    AppStorage.setOrCreate('isLoggedIn', false);
    AppStorage.setOrCreate('studentId', '');
    AppStorage.setOrCreate('studentName', '同学');
    AppStorage.setOrCreate('avatarInitial', '');
    AppStorage.setOrCreate('profilePhone', '');
    AppStorage.setOrCreate('profileEmail', '');
    AppStorage.setOrCreate('profileAddress', '');
    AppStorage.setOrCreate('currentSemester', '');
    AppStorage.setOrCreate('currentScheduleKey', '');
    AppStorage.setOrCreate('currentWeek', 1);
    AppStorage.setOrCreate('mainTabIndex', 0);
    AppStorage.setOrCreate('scheduleTabToken', 0);
    ScheduleStore.initFromRawFile(this.context).then(() => {
      syncCurrentTeachingWeek();
    });
  }

  onDestroy(): void {
    hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onDestroy');
  }

  onWindowStageCreate(windowStage: window.WindowStage): void {
    hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onWindowStageCreate');
    windowStage.loadContent('pages/LoginPage', (err) => {
      if (err.code) {
        hilog.error(DOMAIN, TAG, 'Failed to load the content. Cause: %{public}s', JSON.stringify(err));
        return;
      }
      hilog.info(DOMAIN, TAG, 'Succeeded in loading the content.');
    });
  }

  onWindowStageDestroy(): void {
    hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onWindowStageDestroy');
  }

  onForeground(): void {
    hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onForeground');
  }

  onBackground(): void {
    hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onBackground');
  }
}
