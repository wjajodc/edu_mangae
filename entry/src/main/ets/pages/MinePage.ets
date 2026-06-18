/**
 * 我的（个人中心）页面
 * 分组列表样式，保留原有功能入口
 */
import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { MOCK_STUDENT } from '../mock/MockData';
import { syncCurrentTeachingWeek } from '../utils/DateUtils';
import { AvatarUtil } from '../utils/AvatarUtil';

interface MineMenuItem {
  title: string;
  onTap: () => void;
}

@Component
export struct MinePage {
  @StorageLink('studentName') studentName: string = '同学';
  @StorageLink('studentId') studentId: string = '';
  @StorageLink('avatarUri') avatarUri: string = '';
  @StorageLink('avatarInitial') avatarInitial: string = '';
  @State avatarImageFailed: boolean = false;
  @State showLogoutConfirm: boolean = false;

  aboutToAppear(): void {
    if (!this.studentId || this.studentId.length === 0) {
      const storedId = AppStorage.get<string>('studentId');
      if (storedId) {
        this.studentId = storedId;
      } else {
        this.studentId = MOCK_STUDENT.studentId;
      }
    }
    this.refreshAvatarUri();
  }

  private refreshAvatarUri(): void {
    try {
      const context = this.getUIContext().getHostContext() as common.UIAbilityContext;
      const resolvedUri = AvatarUtil.resolveDisplayAvatarUri(this.avatarUri, context);
      this.avatarImageFailed = false;
      if (this.avatarUri.length > 0 && resolvedUri.length === 0) {
        this.avatarUri = '';
        AppStorage.setOrCreate('avatarUri', '');
      } else if (resolvedUri.length > 0 && resolvedUri !== this.avatarUri) {
        this.avatarUri = resolvedUri;
      }
    } catch (err) {
      this.avatarImageFailed = true;
      console.error('refreshAvatarUri failed: ' + JSON.stringify(err));
    }
  }

  private shouldShowAvatarImage(): boolean {
    return this.avatarUri.length > 0 && !this.avatarImageFailed;
  }

  private handleAvatarLoadError(): void {
    this.avatarImageFailed = true;
    this.avatarUri = '';
    AppStorage.setOrCreate('avatarUri', '');
  }

  /** 跳转到底部课表 Tab 并定位到当前教学周 */
  private openCurrentWeekSchedule(): void {
    syncCurrentTeachingWeek();
    AppStorage.setOrCreate('mainTabIndex', 1);
    const token = AppStorage.get<number>('scheduleTabToken') ?? 0;
    AppStorage.setOrCreate('scheduleTabToken', token + 1);
  }

  private getAvatarInitial(): string {
    if (this.avatarInitial && this.avatarInitial.length > 0) {
      return this.avatarInitial;
    }
    if (this.studentName && this.studentName.length > 0) {
      return this.studentName.substring(0, 1);
    }
    return MOCK_STUDENT.avatarInitial || '学';
  }

  build() {
    Stack() {
      Column() {
        this.buildHeader()

        Scroll() {
          Column() {
            this.buildProfileRow()
            this.buildMenuGroup([
              {
                title: '个人信息',
                onTap: () => { router.pushUrl({ url: 'pages/ProfileEditPage' }); },
              },
              {
                title: '修改密码',
                onTap: () => { router.pushUrl({ url: 'pages/PasswordEditPage' }); },
              },
            ])
            this.buildMenuGroup([
              {
                title: '学籍信息',
                onTap: () => { router.pushUrl({ url: 'pages/StatusPage' }); },
              },
              {
                title: '我的课表',
                onTap: () => { this.openCurrentWeekSchedule(); },
              },
              {
                title: '系统设置',
                onTap: () => { router.pushUrl({ url: 'pages/SettingsPage' }); },
              },
              {
                title: '意见反馈',
                onTap: () => { router.pushUrl({ url: 'pages/FeedbackPage' }); },
              },
            ])
            this.buildMenuGroup([
              {
                title: '退出登录',
                onTap: () => { this.showLogoutConfirm = true; },
              },
            ])
            this.buildFooter()
            Column().height(24)
          }
          .width('100%')
        }
        .width('100%')
        .layoutWeight(1)
        .scrollBar(BarState.Off)
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#F2F2F2')

      ConfirmDialog({
        title: '退出登录',
        content: '确定要退出登录吗？退出后需要重新输入学号和密码。',
        confirmText: '退出',
        cancelText: '取消',
        visible: $showLogoutConfirm,
        onConfirm: () => this.handleLogout(),
      })
    }
  }

  @Builder
  buildHeader(): void {
    Row() {
      Row().width(40).height(40)
      Text('我的')
        .fontSize(17)
        .fontWeight(FontWeight.Medium)
        .fontColor('#1A1A1A')
        .layoutWeight(1)
        .textAlign(TextAlign.Center)
      Text('⊞')
        .fontSize(18)
        .fontColor('#BBBBBB')
        .width(40)
        .height(40)
        .textAlign(TextAlign.Center)
    }
    .width('100%')
    .height(48)
    .padding({ left: 8, right: 8 })
    .backgroundColor('#FFFFFF')
  }

  @Builder
  buildProfileRow(): void {
    Row() {
      Stack() {
        if (this.shouldShowAvatarImage()) {
          Image(this.avatarUri)
            .width(52)
            .height(52)
            .borderRadius(26)
            .objectFit(ImageFit.Cover)
            .onError(() => {
              this.handleAvatarLoadError();
            })
        } else {
          Column() {
            Text(this.getAvatarInitial())
              .fontSize(22)
              .fontWeight(FontWeight.Medium)
              .fontColor('#FFFFFF')
          }
          .width(52)
          .height(52)
          .borderRadius(26)
          .backgroundColor('#4A90E2')
          .justifyContent(FlexAlign.Center)
          .alignItems(HorizontalAlign.Center)
        }
      }
      .width(52)
      .height(52)

      Text(this.studentName || '同学')
        .fontSize(16)
        .fontColor('#1A1A1A')
        .layoutWeight(1)
        .margin({ left: 14 })

      Text('›')
        .fontSize(20)
        .fontColor('#CCCCCC')
    }
    .width('100%')
    .padding({ left: 16, right: 16, top: 18, bottom: 18 })
    .backgroundColor('#FFFFFF')
    .margin({ top: 10 })
    .onClick(() => {
      router.pushUrl({ url: 'pages/ProfileEditPage' });
    })
  }

  @Builder
  buildMenuGroup(items: MineMenuItem[]): void {
    Column() {
      ForEach(items, (item: MineMenuItem, index: number) => {
        MineMenuRow({
          title: item.title,
          showDivider: index < items.length - 1,
          onTap: item.onTap,
        })
      }, (item: MineMenuItem, index: number) => `${item.title}_${index}`)
    }
    .width('100%')
    .backgroundColor('#FFFFFF')
    .margin({ top: 10 })
  }

  @Builder
  buildFooter(): void {
    Column() {
      Text('教学管理系统 · 学生端')
        .fontSize(11)
        .fontColor('#BBBBBB')
        .margin({ bottom: 4 })
      Text(`学号 ${this.studentId || '—'}`)
        .fontSize(11)
        .fontColor('#CCCCCC')
    }
    .width('100%')
    .padding({ top: 20, bottom: 8 })
    .alignItems(HorizontalAlign.Center)
  }

  private handleLogout(): void {
    AppStorage.setOrCreate('isLoggedIn', false);
    AppStorage.setOrCreate('studentId', '');
    AppStorage.setOrCreate('studentName', '');
    router.replaceUrl({ url: 'pages/LoginPage' });
  }
}

@Component
struct MineMenuRow {
  @Prop title: string = '';
  @Prop showDivider: boolean = true;
  onTap?: () => void;

  build() {
    Column() {
      Row() {
        Text(this.title)
          .fontSize(15)
          .fontColor(this.title === '退出登录' ? '#E53935' : '#1A1A1A')
          .layoutWeight(1)
          .margin({ left: 16 })

        Text('›')
          .fontSize(20)
          .fontColor('#CCCCCC')
      }
      .width('100%')
      .padding({ left: 16, right: 16, top: 14, bottom: 14 })

      if (this.showDivider) {
        Row()
          .width('100%')
          .height(0.5)
          .backgroundColor('#F0F0F0')
          .margin({ left: 16 })
      }
    }
    .width('100%')
    .onClick(() => {
      if (this.onTap) {
        this.onTap();
      }
    })
  }
}
