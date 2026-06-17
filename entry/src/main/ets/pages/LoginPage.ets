/**
 * 登录页面
 * 对应需求 4.1 账号认证模块，对标 HTML 登录原型
 * 功能：学号密码输入、表单校验、登录状态保存、异常提示、加载状态
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { CommonButton } from '../components/CommonButton';
import { MOCK_STUDENT, isValidStudentId, validatePassword, getStudentById } from '../mock/MockData';
import { syncCurrentTeachingWeek } from '../utils/DateUtils';

@Entry
@Component
struct LoginPage {
  /** 学号输入值 */
  @State studentId: string = '';
  /** 密码输入值 */
  @State password: string = '';
  /** 学号错误提示 */
  @State studentIdError: string = '';
  /** 密码错误提示 */
  @State passwordError: string = '';
  /** 登录加载状态 */
  @State isLoading: boolean = false;
  /** Toast 提示文字 */
  @State toastMsg: string = '';
  /** 是否显示 Toast */
  @State showToast: boolean = false;

  build() {
    Stack() {
      Column() {
      // 顶部导航栏
      TopBar({ title: '账号登录', showBack: false })

      // 登录表单区域
      Column() {
        // Logo 区域
        Column() {
          // 头像图标
          Text('🎓')
            .fontSize(64)
            .margin({ bottom: 12 })

          Text('教学管理系统')
            .fontSize(20)
            .fontWeight(FontWeight.Bold)
            .fontColor('#0F172A')
            .margin({ bottom: 6 })

          Text('学生端')
            .fontSize(14)
            .fontColor('#64748B')
        }
        .width('100%')
        .alignItems(HorizontalAlign.Center)
        .margin({ top: 40, bottom: 40 })

        // 学号输入框
        Column() {
          Text('学号')
            .fontSize(12)
            .fontWeight(600)
            .fontColor('#64748B')
            .margin({ bottom: 6 })

          TextInput({ text: this.studentId, placeholder: '请输入学号' })
            .type(InputType.Number)
            .width('100%')
            .height(50)
            .fontSize(16)
            .backgroundColor('#F8FAFC')
            .borderRadius(10)
            .borderWidth(1)
            .borderColor(this.studentIdError ? '#DC2626' : '#E2E8F0')
            .padding({ left: 16, right: 16 })
            .maxLength(15)
            .onChange((value: string) => {
              this.studentId = value;
              this.studentIdError = '';
            })

          if (this.studentIdError) {
            Text(this.studentIdError)
              .fontSize(11)
              .fontColor('#DC2626')
              .margin({ top: 4 })
          }
        }
        .width('100%')
        .margin({ bottom: 18 })

        // 密码输入框
        Column() {
          Text('密码')
            .fontSize(12)
            .fontWeight(600)
            .fontColor('#64748B')
            .margin({ bottom: 6 })

          TextInput({ text: this.password, placeholder: '请输入密码' })
            .type(InputType.Password)
            .width('100%')
            .height(50)
            .fontSize(16)
            .backgroundColor('#F8FAFC')
            .borderRadius(10)
            .borderWidth(1)
            .borderColor(this.passwordError ? '#DC2626' : '#E2E8F0')
            .padding({ left: 16, right: 16 })
            .maxLength(20)
            .onChange((value: string) => {
              this.password = value;
              this.passwordError = '';
            })

          if (this.passwordError) {
            Text(this.passwordError)
              .fontSize(11)
              .fontColor('#DC2626')
              .margin({ top: 4 })
          }
        }
        .width('100%')
        .margin({ bottom: 28 })

        // 登录按钮
        CommonButton({
          label: this.isLoading ? '登录中...' : '登 录',
          block: true,
          disabled: this.isLoading,
          loading: this.isLoading,
          onTap: () => this.handleLogin(),
        })
      }
      .width('100%')
      .padding({ left: 28, right: 28 })
      .layoutWeight(1)
      .alignItems(HorizontalAlign.Center)
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#EEF2F8')

      if (this.showToast) {
        Text(this.toastMsg)
          .fontSize(13)
          .fontWeight(500)
          .fontColor('#FFFFFF')
          .padding({ left: 18, right: 18, top: 10, bottom: 10 })
          .borderRadius(999)
          .backgroundColor('rgba(15, 23, 42, 0.88)')
          .maxLines(2)
          .textAlign(TextAlign.Center)
          .position({ bottom: 100, left: '50%' })
          .translate({ x: '-50%' })
      }
    }
    .width('100%')
    .height('100%')
  }

  /**
   * 登录逻辑
   * 校验学号和密码，模拟异步登录请求
   */
  private handleLogin(): void {
    // 表单校验
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

    // 开始登录
    this.isLoading = true;

    // 模拟异步登录请求（1秒延迟）
    setTimeout(() => {
      // 验证学号是否存在
      if (!isValidStudentId(this.studentId)) {
        this.studentIdError = '学号不存在';
        this.showToastOnce('学号不存在');
        this.isLoading = false;
        return;
      }

      // 验证密码是否正确
      if (!validatePassword(this.studentId, this.password)) {
        this.passwordError = '密码错误';
        this.showToastOnce('密码错误');
        this.isLoading = false;
        return;
      }

      // 登录成功 - 写入全局状态
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

      // 跳转主页面
      setTimeout(() => {
        router.replaceUrl({ url: 'pages/MainPage' });
      }, 300);
    }, 1000);
  }

  /**
   * 显示 Toast（仅触发一次）
   */
  private showToastOnce(msg: string): void {
    this.toastMsg = msg;
    this.showToast = true;
    setTimeout(() => {
      this.showToast = false;
      this.toastMsg = '';
    }, 2000);
  }
}
