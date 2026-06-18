/**
 * 系统设置页面
 * 消息通知开关、清除缓存、深色模式、关于
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { ListCard } from '../components/ListCard';
import { ConfirmDialog } from '../components/ConfirmDialog';

@Entry
@Component
struct SettingsPage {
  @State notifEnabled: boolean = true;
  @State darkMode: boolean = false;
  @State showClearCache: boolean = false;
  @State toastMsg: string = '';
  @State showToast: boolean = false;

  build() {
    Stack() {
      Column() {
        TopBar({ title: '系统设置', showBack: true, onBack: () => router.back() })

        Scroll() {
          Column() {
            // 通知设置
            Column() {
              Text('通知设置').fontSize(11).fontWeight(700).fontColor('#64748B')
                .padding({ left: 18, top: 16, bottom: 8 }).width('100%')

              Row() {
                Text('消息通知').fontSize(14).fontWeight(500).fontColor('#0F172A').layoutWeight(1)
                Toggle({ type: ToggleType.Switch, isOn: $$this.notifEnabled })
                  .selectedColor('#2563EB')
                  .onChange((val: boolean) => { this.notifEnabled = val; })
              }
              .width('100%').padding({ left: 18, right: 18, top: 14, bottom: 14 })
              .borderWidth({ top: 0.5 }).borderColor('#E2E8F0')
            }
            .width('100%').backgroundColor('#FFFFFF').borderRadius(14)
            .margin({ left: 14, right: 14, top: 14 })

            // 显示设置
            Column() {
              Text('显示设置').fontSize(11).fontWeight(700).fontColor('#64748B')
                .padding({ left: 18, top: 16, bottom: 8 }).width('100%')

              Row() {
                Text('深色模式').fontSize(14).fontWeight(500).fontColor('#0F172A').layoutWeight(1)
                Toggle({ type: ToggleType.Switch, isOn: $$this.darkMode })
                  .selectedColor('#2563EB')
                  .onChange((val: boolean) => {
                    this.darkMode = val;
                    this.showToastOnce(val ? '已切换深色模式' : '已切换浅色模式');
                  })
              }
              .width('100%').padding({ left: 18, right: 18, top: 14, bottom: 14 })
              .borderWidth({ bottom: 0.5 }).borderColor('#E2E8F0')

              Row() {
                Text('清除缓存').fontSize(14).fontWeight(500).fontColor('#0F172A').layoutWeight(1)
                Text('128.5MB ›')
                  .fontSize(12).fontColor('#64748B')
                  .onClick(() => { this.showClearCache = true; })
              }
              .width('100%').padding({ left: 18, right: 18, top: 14, bottom: 14 })
            }
            .width('100%').backgroundColor('#FFFFFF').borderRadius(14)
            .margin({ left: 14, right: 14, top: 14 })

            // 关于
            Column() {
              Row() {
                Text('关于').fontSize(14).fontWeight(500).fontColor('#0F172A').layoutWeight(1)
                Text('v1.0.0 ›')
                  .fontSize(12).fontColor('#64748B')
                  .onClick(() => this.showToastOnce('教学管理系统学生端 v1.0.0'))
              }
              .width('100%').padding({ left: 18, right: 18, top: 14, bottom: 14 })
            }
            .width('100%').backgroundColor('#FFFFFF').borderRadius(14)
            .margin({ left: 14, right: 14, top: 14 })

            Column().height(24)
          }.width('100%')
        }
        .width('100%').layoutWeight(1).scrollBar(BarState.Off)
      }
      .width('100%').height('100%').backgroundColor('#EEF2F8')

      ConfirmDialog({
        title: '清除缓存',
        content: '确定清除所有缓存数据？这不会影响您的个人数据。',
        visible: $showClearCache,
        onConfirm: () => {
          this.showToastOnce('缓存已清除');
        }
      })

      if (this.showToast) {
        Text(this.toastMsg)
          .fontSize(13).fontWeight(500).fontColor('#FFFFFF')
          .padding({ left: 18, right: 18, top: 10, bottom: 10 })
          .borderRadius(999).backgroundColor('rgba(15, 23, 42, 0.88)')
          .position({ bottom: 100, left: '50%' }).translate({ x: '-50%' })
      }
    }
  }

  private showToastOnce(msg: string): void {
    this.toastMsg = msg; this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 2000);
  }
}
