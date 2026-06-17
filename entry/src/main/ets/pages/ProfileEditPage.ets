/**
 * 修改个人信息页面
 * 对应需求 4.4
 * 只读字段（学号/学院/专业/班级）+ 可编辑字段（手机号/邮箱/地址）
 * 支持头像更换，保存后数据持久化到本地 AppStorage
 */
import { router } from '@kit.ArkUI';
import { common } from '@kit.AbilityKit';
import { TopBar } from '../components/TopBar';
import { CommonButton } from '../components/CommonButton';
import { MOCK_STUDENT } from '../mock/MockData';
import { AvatarUtil } from '../utils/AvatarUtil';

@Entry
@Component
struct ProfileEditPage {
  @State phone: string = MOCK_STUDENT.phone;
  @State email: string = MOCK_STUDENT.email;
  @State address: string = MOCK_STUDENT.address;
  @State avatarUri: string = '';
  @State avatarInitial: string = MOCK_STUDENT.avatarInitial;
  @State avatarImageFailed: boolean = false;
  @State phoneError: string = '';
  @State emailError: string = '';
  @State isSubmitting: boolean = false;
  @State toastMsg: string = '';
  @State showToast: boolean = false;

  aboutToAppear(): void {
    // 加载已保存的个人信息，若无则使用默认值
    const savedPhone = AppStorage.get<string>('profilePhone');
    if (savedPhone && savedPhone.length > 0) {
      this.phone = savedPhone;
    }
    const savedEmail = AppStorage.get<string>('profileEmail');
    if (savedEmail && savedEmail.length > 0) {
      this.email = savedEmail;
    }
    const savedAddress = AppStorage.get<string>('profileAddress');
    if (savedAddress && savedAddress.length > 0) {
      this.address = savedAddress;
    }
    const savedAvatarInitial = AppStorage.get<string>('avatarInitial') ?? '';
    this.avatarInitial = this.resolveAvatarInitial(savedAvatarInitial);
  }

  onPageShow(): void {
    try {
      const storedUri = AppStorage.get<string>('avatarUri') ?? '';
      const resolvedUri = AvatarUtil.resolveDisplayAvatarUri(storedUri, this.getAbilityContext());
      this.avatarUri = resolvedUri;
      this.avatarImageFailed = false;
      if (storedUri.length > 0 && resolvedUri.length === 0) {
        AppStorage.setOrCreate('avatarUri', '');
      }
    } catch (err) {
      this.avatarUri = '';
      this.avatarImageFailed = true;
      console.error('load local avatar failed: ' + JSON.stringify(err));
    }
  }

  private resolveAvatarInitial(savedAvatarInitial: string): string {
    if (savedAvatarInitial.length > 0) {
      return savedAvatarInitial;
    }
    const storedName = AppStorage.get<string>('studentName');
    if (storedName && storedName.length > 0) {
      return storedName.substring(0, 1);
    }
    return MOCK_STUDENT.avatarInitial || '学';
  }

  private shouldShowAvatarImage(): boolean {
    return this.avatarUri.length > 0 && !this.avatarImageFailed;
  }

  private getAvatarInitial(): string {
    if (this.avatarInitial.length > 0) {
      return this.avatarInitial;
    }
    return MOCK_STUDENT.avatarInitial || '学';
  }

  private handleAvatarLoadError(): void {
    this.avatarImageFailed = true;
    this.avatarUri = '';
    AppStorage.setOrCreate('avatarUri', '');
  }

  build() {
    Stack() {
      Column() {
        TopBar({ title: '修改个人信息', showBack: true, onBack: () => router.back() })

        Scroll() {
          Column() {
            // 头像区域
            Column() {
              Stack() {
                if (this.shouldShowAvatarImage()) {
                  Image(this.avatarUri)
                    .width(80).height(80)
                    .borderRadius(20)
                    .objectFit(ImageFit.Cover)
                    .onError(() => {
                      this.handleAvatarLoadError();
                    })
                } else {
                  Column() {
                    Text(this.getAvatarInitial())
                      .fontSize(36).fontWeight(FontWeight.Bold).fontColor('#FFFFFF')
                  }
                  .width(80).height(80)
                  .borderRadius(20).backgroundColor('#1E40AF')
                  .justifyContent(FlexAlign.Center).alignItems(HorizontalAlign.Center)
                }
              }
              .width(80).height(80)
              .margin({ bottom: 8 })

              Text('点击更换头像')
                .fontSize(12).fontColor('#2563EB')
            }
            .width('100%').alignItems(HorizontalAlign.Center)
            .margin({ top: 20, bottom: 24 })
            .onClick(() => this.selectAvatar())

            // 只读字段
            Column() {
              Text('基本信息（不可编辑）').fontSize(11).fontWeight(700).fontColor('#64748B')
                .width('100%').margin({ bottom: 10 })

              ReadOnlyField({ label: '学号', value: MOCK_STUDENT.studentId })
              ReadOnlyField({ label: '学院', value: MOCK_STUDENT.college })
              ReadOnlyField({ label: '专业', value: MOCK_STUDENT.major })
              ReadOnlyField({ label: '班级', value: MOCK_STUDENT.className, isLast: true })
            }
            .width('100%').padding(18)
            .backgroundColor('#F8FAFC').borderRadius(12)
            .margin({ left: 14, right: 14, bottom: 14 })

            // 可编辑字段
            Column() {
              Text('联系信息').fontSize(11).fontWeight(700).fontColor('#64748B')
                .width('100%').margin({ bottom: 10 })

              EditableField({
                label: '手机号', value: this.phone, placeholder: '请输入手机号',
                errorMsg: this.phoneError,
                onChange: (val: string) => { this.phone = val; this.phoneError = ''; }
              })

              EditableField({
                label: '邮箱', value: this.email, placeholder: '请输入邮箱',
                errorMsg: this.emailError,
                onChange: (val: string) => { this.email = val; this.emailError = ''; }
              })

              EditableField({
                label: '通讯地址', value: this.address, placeholder: '请输入通讯地址',
                onChange: (val: string) => { this.address = val; }
              })
            }
            .width('100%').padding(18)
            .backgroundColor('#FFFFFF').borderRadius(12)
            .margin({ left: 14, right: 14, bottom: 20 })

            // 提交按钮
            CommonButton({
              label: this.isSubmitting ? '保存中...' : '保存修改',
              block: true,
              disabled: this.isSubmitting,
              loading: this.isSubmitting,
              onTap: () => this.handleSubmit()
            })

            Column().height(24)
          }
          .width('100%')
        }
        .width('100%').layoutWeight(1).scrollBar(BarState.Off)
      }
      .width('100%').height('100%').backgroundColor('#EEF2F8')

      if (this.showToast) {
        Text(this.toastMsg)
          .fontSize(13).fontWeight(500).fontColor('#FFFFFF')
          .padding({ left: 18, right: 18, top: 10, bottom: 10 })
          .borderRadius(999).backgroundColor('rgba(15, 23, 42, 0.88)')
          .position({ bottom: 100, left: '50%' }).translate({ x: '-50%' })
      }
    }
  }

  /**
   * 选取本机图片并设置为头像
   */
  private async selectAvatar(): Promise<void> {
    const previousUri = this.avatarUri;
    const previousFailed = this.avatarImageFailed;
    try {
      const sourceUri = await AvatarUtil.pickLocalImage();
      if (!sourceUri) {
        this.avatarUri = previousUri;
        this.avatarImageFailed = previousFailed;
        return;
      }
      const savedUri = AvatarUtil.saveToAppFiles(sourceUri, this.getAbilityContext());
      this.avatarUri = savedUri;
      this.avatarImageFailed = false;
      this.showToastOnce('头像已更新，请点击保存修改');
    } catch (err) {
      this.avatarUri = previousUri;
      this.avatarImageFailed = previousFailed;
      console.error('selectAvatar failed: ' + JSON.stringify(err));
      this.showToastOnce('选择图片失败，已保留原头像');
    }
  }

  private getAbilityContext(): common.UIAbilityContext {
    return this.getUIContext().getHostContext() as common.UIAbilityContext;
  }

  /**
   * 提交保存
   * 校验表单数据，保存到 AppStorage 本地持久化
   */
  private handleSubmit(): void {
    // 校验手机号
    if (!/^1[3-9]\d{9}$/.test(this.phone)) {
      this.phoneError = '请输入正确的手机号';
      return;
    }
    // 校验邮箱（可选字段，有值时校验格式）
    if (this.email && !/^[\w.-]+@[\w.-]+\.\w+$/.test(this.email)) {
      this.emailError = '请输入正确的邮箱格式';
      return;
    }

    this.isSubmitting = true;

    // 模拟异步保存
    setTimeout(() => {
      // 保存个人信息到本地 AppStorage
      AppStorage.setOrCreate('profilePhone', this.phone);
      AppStorage.setOrCreate('profileEmail', this.email);
      AppStorage.setOrCreate('profileAddress', this.address);

      // 保存头像信息
      if (this.avatarUri.length > 0) {
        AppStorage.setOrCreate('avatarUri', this.avatarUri);
      }
      AppStorage.setOrCreate('avatarInitial', this.avatarInitial);

      this.isSubmitting = false;
      this.showToastOnce('保存成功');
    }, 800);
  }

  private showToastOnce(msg: string): void {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 2000);
  }
}

/**
 * 只读字段组件
 */
@Component
struct ReadOnlyField {
  @Prop label: string = '';
  @Prop value: string = '';
  @Prop isLast: boolean = false;

  build() {
    Row() {
      Text(this.label).fontSize(13).fontColor('#64748B').width(80)
      Text(this.value).fontSize(13).fontWeight(500).fontColor('#475569').layoutWeight(1)
    }
    .width('100%')
    .padding({ top: 10, bottom: 10 })
    .borderWidth({ bottom: this.isLast ? 0 : 0.5 })
    .borderColor('#E2E8F0')
  }
}

/**
 * 可编辑字段组件
 */
@Component
struct EditableField {
  @Prop label: string = '';
  @Prop placeholder: string = '';
  @Prop errorMsg: string = '';
  @Link value: string;
  onChange?: (val: string) => void;

  build() {
    Column() {
      Row() {
        Text(this.label).fontSize(13).fontColor('#64748B').width(80)

        TextInput({ text: this.value, placeholder: this.placeholder })
          .fontSize(13).height(38).layoutWeight(1).backgroundColor('#F8FAFC')
          .borderRadius(8).padding({ left: 10 }).maxLength(50)
          .borderWidth(1).borderColor(this.errorMsg ? '#DC2626' : '#E2E8F0')
          .onChange((val: string) => {
            this.value = val;
            if (this.onChange) this.onChange(val);
          })
      }
      .width('100%')

      if (this.errorMsg) {
        Text(this.errorMsg).fontSize(11).fontColor('#DC2626').margin({ top: 4 }).width('100%')
      }
    }
    .width('100%').margin({ bottom: 14 })
  }
}
