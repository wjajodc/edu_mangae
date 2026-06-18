/**
 * 登录页面 — 参考友好型移动端登录视觉
 */
import { router } from '@kit.ArkUI';
import { isValidStudentId, validatePassword, getStudentById } from '../mock/MockData';
import { syncCurrentTeachingWeek } from '../utils/DateUtils';

/** 截图风格色值（与 login_bg 背景协调） */
const INPUT_BG: string = '#F0F4FF';
const TITLE_COLOR: string = '#333654';
const SUBTITLE_COLOR: string = '#A0AEC0';
const PLACEHOLDER_COLOR: string = '#B0B8C8';
const PRIMARY_BTN: string = '#5E61E6';
const LINK_COLOR: string = '#A0AEC0';

@Entry
@Component
struct LoginPage {
  @State studentId: string = '';
  @State password: string = '';
  @State studentIdError: string = '';
  @State passwordError: string = '';
  @State isLoading: boolean = false;
  @State toastMsg: string = '';
  @State showToast: boolean = false;

  build() {
    Stack() {
      Image($r('app.media.login_bg'))
        .width('100%')
        .height('100%')
        .objectFit(ImageFit.Cover)

      Scroll() {
        Column() {
          this.buildGreeting()

          this.buildPillInput('学号', this.studentId, this.studentIdError, InputType.Number, 15,
            (value: string) => { this.studentId = value; this.studentIdError = ''; })

          Column() {
            this.buildPillInput('密码', this.password, this.passwordError, InputType.Password, 20,
              (value: string) => { this.password = value; this.passwordError = ''; })

            // Row() {
            //   Blank()
            //   Text('忘记密码？')
            //     .fontSize(13)
            //     .fontColor(LINK_COLOR)
            //     .onClick(() => { this.showToastOnce('请联系管理员重置密码'); })
            // }
            // .width('100%')
            // .margin({ top: 10 })
          }
          .width('100%')
          .margin({ bottom: 28 })

          this.buildLoginButton()

          Column().height(40)
        }
        .width('100%')
        .padding({ left: 32, right: 32, top: 72, bottom: 32 })
        .alignItems(HorizontalAlign.Start)
      }
      .width('100%')
      .height('100%')
      .scrollBar(BarState.Off)

      if (this.showToast) {
        Text(this.toastMsg)
          .fontSize(13)
          .fontWeight(500)
          .fontColor('#FFFFFF')
          .padding({ left: 18, right: 18, top: 10, bottom: 10 })
          .borderRadius(8)
          .backgroundColor('rgba(51, 54, 84, 0.88)')
          .maxLines(2)
          .textAlign(TextAlign.Center)
          .position({ bottom: 48, left: '50%' })
          .translate({ x: '-50%' })
      }
    }
    .width('100%')
    .height('100%')
    .expandSafeArea([SafeAreaType.SYSTEM], [SafeAreaEdge.TOP, SafeAreaEdge.BOTTOM])
  }

  @Builder
  buildGreeting(): void {
    Column() {
      Text('嘿！')
        .fontSize(40)
        .fontWeight(FontWeight.Bold)
        .fontColor(TITLE_COLOR)
        .lineHeight(48)

      Text('赶紧登录吧！')
        .fontSize(32)
        .fontWeight(FontWeight.Bold)
        .fontColor(TITLE_COLOR)
        .lineHeight(42)
        .margin({ top: 4 })

      Text('欢迎回来～我们等你好久了！')
        .fontSize(14)
        .fontColor(SUBTITLE_COLOR)
        .margin({ top: 12, bottom: 36 })
    }
    .width('100%')
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  buildPillInput(placeholder: string, value: string, error: string, inputType: InputType,
    maxLen: number, onChange: (val: string) => void): void {
    Column() {
      TextInput({ text: value, placeholder: placeholder })
        .type(inputType)
        .width('100%')
        .height(52)
        .fontSize(15)
        .fontColor(TITLE_COLOR)
        .placeholderColor(PLACEHOLDER_COLOR)
        .backgroundColor(INPUT_BG)
        .borderRadius(26)
        .borderWidth(0)
        .padding({ left: 22, right: 22 })
        .maxLength(maxLen)
        .onChange(onChange)

      if (error) {
        Text(error)
          .fontSize(12)
          .fontColor('#E53E3E')
          .margin({ top: 6, left: 16 })
      }
    }
    .width('100%')
    .margin({ bottom: 16 })
    .alignItems(HorizontalAlign.Start)
  }

  @Builder
  buildLoginButton(): void {
    Button() {
      if (this.isLoading) {
        Row() {
          LoadingProgress()
            .width(18)
            .height(18)
            .color('#FFFFFF')
          Text(' 登录中...')
            .fontSize(16)
            .fontWeight(FontWeight.Bold)
            .fontColor('#FFFFFF')
        }
      } else {
        Text('登录')
          .fontSize(16)
          .fontWeight(FontWeight.Bold)
          .fontColor('#FFFFFF')
      }
    }
    .type(ButtonType.Normal)
    .width('100%')
    .height(52)
    .borderRadius(26)
    .backgroundColor(PRIMARY_BTN)
    .enabled(!this.isLoading)
    .opacity(this.isLoading ? 0.85 : 1)
    .shadow({ radius: 16, color: 'rgba(94, 97, 230, 0.35)', offsetX: 0, offsetY: 8 })
    .onClick(() => { this.handleLogin(); })
  }

  private handleLogin(): void {
    let hasError: boolean = false;
    if (!this.studentId || this.studentId.trim().length === 0) {
      this.studentIdError = '请输入学号';
      hasError = true;
    }
    if (!this.password || this.password.trim().length === 0) {
      this.passwordError = '请输入密码';
      hasError = true;
    }
    if (hasError) {
      return;
    }

    this.isLoading = true;
    setTimeout(() => {
      if (!isValidStudentId(this.studentId)) {
        this.studentIdError = '学号不存在';
        this.showToastOnce('学号不存在');
        this.isLoading = false;
        return;
      }
      if (!validatePassword(this.studentId, this.password)) {
        this.passwordError = '密码错误';
        this.showToastOnce('密码错误');
        this.isLoading = false;
        return;
      }
      const student = getStudentById(this.studentId);
      if (!student) {
        this.showToastOnce('登录失败，请重试');
        this.isLoading = false;
        return;
      }
      AppStorage.setOrCreate('isLoggedIn', true);
      AppStorage.setOrCreate('studentId', student.studentId);
      AppStorage.setOrCreate('studentName', student.name);
      AppStorage.setOrCreate('avatarInitial', student.avatarInitial);
      AppStorage.setOrCreate('currentSemester', '2025-2026 第2学期');
      syncCurrentTeachingWeek();
      this.isLoading = false;
      this.showToastOnce('登录成功');
      setTimeout(() => {
        router.replaceUrl({ url: 'pages/MainPage' });
      }, 300);
    }, 1000);
  }

  private showToastOnce(msg: string): void {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => { this.showToast = false; this.toastMsg = ''; }, 2000);
  }
}
