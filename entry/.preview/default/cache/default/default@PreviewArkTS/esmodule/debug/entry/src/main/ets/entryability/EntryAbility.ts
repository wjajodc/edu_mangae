import type AbilityConstant from "@ohos:app.ability.AbilityConstant";
import UIAbility from "@ohos:app.ability.UIAbility";
import type Want from "@ohos:app.ability.Want";
import hilog from "@ohos:hilog";
import type window from "@ohos:window";
import { ScheduleStore } from "@normalized:N&&&entry/src/main/ets/utils/ScheduleStore&";
import { syncCurrentTeachingWeek } from "@normalized:N&&&entry/src/main/ets/utils/DateUtils&";
const DOMAIN = 0x0000;
const TAG = 'EntryAbility';
export default class EntryAbility extends UIAbility {
    onCreate(want: Want, launchParam: AbilityConstant.LaunchParam): void {
        hilog.info(DOMAIN, TAG, '%{public}s', 'Ability onCreate');
        AppStorage.setOrCreate('isLoggedIn', false);
        AppStorage.setOrCreate('studentId', '');
        AppStorage.setOrCreate('studentName', '同学');
        AppStorage.setOrCreate('avatarInitial', '');
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
