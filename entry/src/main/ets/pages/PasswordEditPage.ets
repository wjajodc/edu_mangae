/**
 * 修改密码页面
 * 对应需求 4.5
 * 通过用户名和原密码验证后修改密码
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { CommonButton } from '../components/CommonButton';
import { validatePassword, getStudentById } from '../mock/MockData';

@Entry
@Component
struct PasswordEditPage {
  @State username: string = '';
  @State oldPassword: string = '';
  @State newPassword: string = '';
  @State confirmPassword: string = '';
  @State usernameError: string = '';
  @State oldError: string = '';
  @State newError: string = '';
  @State confirmError: string = '';
  @State isSubmitting: boolean = false;
  @State toastMsg: string = '';
  @State showToast: boolean = false;

  build() {
    Stack() {
      Column() {
        TopBar({ title: '修改密码', showBack: true, onBack: () => router.back() })

        Scroll() {
          Column() {
            // 安全提示
            Column() {
              Text('🔐').fontSize(24).margin({ bottom: 6 })
              Text('请妥善保管密码，勿泄露他人')
                .fontSize(13).fontColor('#64748B')
            }
            .width('100%').alignItems(HorizontalAlign.Center)
            .margin({ top: 24, bottom: 24 })

            // 表单
            Column() {
              // 用户名输入框
              Column() {
                Text('用户名')
                  .fontSize(13).fontWeight(600).fontColor('#0F172A').margin({ bottom: 6 })
                TextInput({ text: this.username, placeholder: '请输入用户名/学号' })
                  .fontSize(14).height(46).width('100%')
                  .backgroundColor('#F8FAFC').borderRadius(10)
                  .borderWidth(1).borderColor(this.usernameError ? '#DC2626' : '#E2E8F0')
                  .padding({ left: 14 })
                  .onChange((val: string) => { this.username = val; this.usernameError = ''; })
                if (this.usernameError) {
                  Text(this.usernameError).fontSize(11).fontColor('#DC2626').margin({ top: 4 })
                }
              }
              .width('100%').margin({ bottom: 18 })

              PasswordField({
                label: '原密码', value: $oldPassword, placeholder: '请输入原密码',
                errorMsg: this.oldError, onChange: () => { this.oldError = ''; }
              })
              PasswordField({
                label: '新密码', value: $newPassword, placeholder: '6-20位字母与数字组合',
                errorMsg: this.newError, onChange: () => { this.newError = ''; }
              })
              PasswordField({
                label: '确认新密码', value: $confirmPassword, placeholder: '请再次输入新密码',
                errorMsg: this.confirmError, onChange: () => { this.confirmError = ''; }
              })
            }
            .width('100%').padding(18)
            .backgroundColor('#FFFFFF').borderRadius(12)
            .margin({ left: 14, right: 14, bottom: 20 })

            CommonButton({
              label: this.isSubmitting ? '修改中...' : '确认修改',
              block: true, disabled: this.isSubmitting, loading: this.isSubmitting,
              onTap: () => this.handleSubmit()
            })

            Column().height(24)
          }.width('100%')
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

  private handleSubmit(): void {
    // 校验用户名
    if (!this.username || this.username.trim().length === 0) {
      this.usernameError = '请输入用户名/学号';
      return;
    }
    // 检查用户是否存在
    const student = getStudentById(this.username.trim());
    if (!student) {
      this.usernameError = '用户名/学号不存在';
      return;
    }

    // 校验原密码
    if (!this.oldPassword) {
      this.oldError = '请输入原密码';
      return;
    }
    if (!validatePassword(this.username.trim(), this.oldPassword)) {
      this.oldError = '原密码错误';
      return;
    }

    // 校验新密码
    if (!this.newPassword || this.newPassword.length < 6) {
      this.newError = '新密码至少 6 位';
      return;
    }
    if (!/^(?=.*[a-zA-Z])(?=.*\d)/.test(this.newPassword)) {
      this.newError = '密码需包含字母和数字';
      return;
    }

    // 校验确认密码
    if (this.newPassword !== this.confirmPassword) {
      this.confirmError = '两次密码不一致';
      return;
    }

    this.isSubmitting = true;
    setTimeout(() => {
      // 更新内存中的密码
      student.password = this.newPassword;
      this.isSubmitting = false;
      this.showToastOnce('密码修改成功');
      setTimeout(() => router.back(), 600);
    }, 800);
  }

  private showToastOnce(msg: string): void {
    this.toastMsg = msg; this.showToast = true;
    setTimeout(() => { this.showToast = false; }, 2000);
  }
}

@Component
struct PasswordField {
  @Prop label: string = '';
  @Prop placeholder: string = '';
  @Prop errorMsg: string = '';
  @Link value: string;
  onChange?: () => void;

  build() {
    Column() {
      Text(this.label).fontSize(13).fontWeight(600).fontColor('#0F172A').margin({ bottom: 6 })
      TextInput({ text: this.value, placeholder: this.placeholder })
        .type(InputType.Password)
        .fontSize(14).height(46).width('100%')
        .backgroundColor('#F8FAFC').borderRadius(10)
        .borderWidth(1).borderColor(this.errorMsg ? '#DC2626' : '#E2E8F0')
        .padding({ left: 14 })
        .onChange((val: string) => { this.value = val; if (this.onChange) this.onChange(); })
      if (this.errorMsg) {
        Text(this.errorMsg).fontSize(11).fontColor('#DC2626').margin({ top: 4 })
      }
    }
    .width('100%').margin({ bottom: 18 })
  }
}
