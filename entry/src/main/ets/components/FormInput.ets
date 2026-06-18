/**
 * 表单输入框组件
 * 统一表单样式：标签 + 输入框，对标 styles.css 中的 .field 系列样式
 * 支持非空校验、实时校验、密码输入等
 */
@Component
export struct FormInput {
  /** 字段标签 */
  @Prop label: string = '';
  /** 输入框占位文字 */
  @Prop placeholder: string = '';
  /** 输入值（双向绑定） */
  @Link value: string;
  /** 输入类型：text/password/email/tel/number */
  @Prop inputType: string = 'text';
  /** 是否只读 */
  @Prop readOnly: boolean = false;
  /** 最大长度 */
  @Prop maxLength: number = 100;
  /** 是否必填 */
  @Prop required: boolean = false;
  /** 错误提示信息 */
  @Prop errorMsg: string = '';

  build() {
    Column() {
      // 标签
      if (this.label && this.label.length > 0) {
        Row() {
          Text(this.label)
            .fontSize(12)
            .fontWeight(600)
            .fontColor('#64748B')

          if (this.required) {
            Text(' *')
              .fontSize(12)
              .fontColor('#DC2626')
          }
        }
        .margin({ bottom: 6 })
      }

      // 输入框
      TextInput({ text: this.value, placeholder: this.placeholder })
        .type(this.getInputType())
        .width('100%')
        .height(46)
        .fontSize(15)
        .backgroundColor(this.readOnly ? '#F1F5F9' : '#F8FAFC')
        .borderRadius(10)
        .borderWidth(1)
        .borderColor(this.errorMsg ? '#DC2626' : '#E2E8F0')
        .padding({ left: 14, right: 14 })
        .enabled(!this.readOnly)
        .maxLength(this.maxLength)
        .onChange((newValue: string) => {
          this.value = newValue;
        })

      // 错误提示
      if (this.errorMsg && this.errorMsg.length > 0) {
        Text(this.errorMsg)
          .fontSize(11)
          .fontColor('#DC2626')
          .margin({ top: 4 })
      }
    }
    .width('100%')
    .margin({ bottom: 16 })
  }

  /** 获取 ArkUI 输入类型 */
  private getInputType(): InputType {
    switch (this.inputType) {
      case 'password':
        return InputType.Password;
      case 'email':
        return InputType.Email;
      case 'number':
      case 'tel':
        return InputType.Number;
      default:
        return InputType.Normal;
    }
  }
}

/**
 * 表单校验工具
 */
export class FormValidator {
  /**
   * 非空校验
   */
  static validateRequired(value: string, fieldName: string): string {
    if (!value || value.trim().length === 0) {
      return `请输入${fieldName}`;
    }
    return '';
  }

  /**
   * 手机号校验
   */
  static validatePhone(value: string): string {
    if (!value || value.trim().length === 0) {
      return '请输入手机号';
    }
    if (!/^1[3-9]\d{9}$/.test(value.trim())) {
      return '请输入正确的手机号';
    }
    return '';
  }

  /**
   * 邮箱校验
   */
  static validateEmail(value: string): string {
    if (!value || value.trim().length === 0) {
      return '请输入邮箱';
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim())) {
      return '请输入正确的邮箱地址';
    }
    return '';
  }

  /**
   * 密码强度校验
   */
  static validatePassword(value: string): string {
    if (!value || value.length === 0) {
      return '请输入密码';
    }
    if (value.length < 6) {
      return '密码长度不能少于6位';
    }
    return '';
  }

  /**
   * 两次输入一致性校验
   */
  static validateConfirm(value: string, confirmValue: string, fieldName: string): string {
    if (value !== confirmValue) {
      return `两次输入的${fieldName}不一致`;
    }
    return '';
  }
}
