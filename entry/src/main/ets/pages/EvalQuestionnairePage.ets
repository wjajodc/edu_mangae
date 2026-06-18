/**
 * 评教问卷页面
 * 对应需求 4.15，支持单选/多选/星级/主观题
 * 提交前校验未完成项，提交成功弹窗提示
 */
import { router } from '@kit.ArkUI';
import { TopBar } from '../components/TopBar';
import { CommonButton } from '../components/CommonButton';
import { MOCK_EVAL_QUESTIONS } from '../mock/MockData';
import { EvaluationOption, EvaluationQuestion } from '../model/EvalModel';

@Entry
@Component
export struct EvalQuestionnairePage {
  /** 问卷题目列表 */
  @State questions: EvaluationQuestion[] = [];
  @State isSubmitting: boolean = false;
  @State showSuccess: boolean = false;
  @State taskId: string = '';

  aboutToAppear(): void {
    // 从路由参数获取 taskId
    const params = router.getParams() as Record<string, string>;
    if (params && params['taskId']) {
      this.taskId = params['taskId'];
    }
    this.loadQuestions();
  }

  private async loadQuestions(): Promise<void> {
    await new Promise<void>((r) => setTimeout(r, 300));
    this.questions = MOCK_EVAL_QUESTIONS.slice();
  }

  build() {
    Stack() {
      Column() {
        TopBar({ title: '评教问卷', showBack: true, onBack: () => router.back() })

        if (this.questions.length === 0) {
          Column() {
            Text('加载中...').fontSize(14).fontColor('#64748B')
          }
          .width('100%').layoutWeight(1).justifyContent(FlexAlign.Center)
        } else {
          Scroll() {
            Column() {
              ForEach(this.questions, (q: EvaluationQuestion, idx: number) => {
                QuestionCard({ question: q, index: idx + 1 })
              })

              // 提交按钮
              CommonButton({
                label: this.isSubmitting ? '提交中...' : '提交评教',
                block: true,
                disabled: this.isSubmitting,
                loading: this.isSubmitting,
                onTap: () => this.handleSubmit()
              })

              Column().height(24)
            }
            .width('100%')
            .padding({ left: 14, right: 14, top: 14 })
          }
          .width('100%')
          .layoutWeight(1)
          .scrollBar(BarState.Off)
        }
      }
      .width('100%')
      .height('100%')
      .backgroundColor('#EEF2F8')

      // 提交成功弹窗 - 展示详细评教内容
      if (this.showSuccess) {
        Column() {
          Column()
            .width('100%')
            .layoutWeight(1)
            .backgroundColor('rgba(15, 23, 42, 0.45)')
            .onClick(() => {})

          Column() {
            Text('✅')
              .fontSize(36)
              .margin({ bottom: 8 })
            Text('提交成功')
              .fontSize(18)
              .fontWeight(FontWeight.Bold)
              .fontColor('#0F172A')
              .margin({ bottom: 4 })
            Text('感谢您的评教，您的意见对我们很重要！')
              .fontSize(12)
              .fontColor('#64748B')
              .margin({ bottom: 12 })

            // 展示评教结果摘要
            Scroll() {
              Column() {
                ForEach(this.questions, (q: EvaluationQuestion, idx: number) => {
                  if (q.answer !== null && q.answer !== undefined && q.answer !== '') {
                    Column() {
                      Row() {
                        Text(`${idx + 1}. ${q.title}`)
                          .fontSize(12)
                          .fontWeight(FontWeight.Medium)
                          .fontColor('#0F172A')
                          .layoutWeight(1)
                          .maxLines(2)
                      }
                      .width('100%')
                      .margin({ bottom: 4 })

                      Text(this.getAnswerDisplay(q))
                        .fontSize(12)
                        .fontColor('#64748B')
                        .width('100%')
                    }
                    .width('100%')
                    .padding({ top: 8, bottom: 8 })
                    .borderWidth({ bottom: idx < this.questions.length - 1 ? 0.5 : 0 })
                    .borderColor('#F0F0F0')
                    .alignItems(HorizontalAlign.Start)
                  }
                }, (q: EvaluationQuestion, idx: number) => `result_${q.id}_${idx}`)

                if (this.getAnsweredCount() < this.questions.length) {
                  Text(`（共回答 ${this.getAnsweredCount()}/${this.questions.length} 题）`)
                    .fontSize(11)
                    .fontColor('#94A3B8')
                    .margin({ top: 8 })
                }

                Column().height(8)
              }
              .width('100%')
            }
            .width('100%')
            .constraintSize({ maxHeight: 240 })
            .scrollBar(BarState.Off)
            .margin({ bottom: 16 })

            Button('返回')
              .type(ButtonType.Normal)
              .width('100%')
              .height(44)
              .fontSize(15)
              .fontWeight(FontWeight.Medium)
              .fontColor('#FFFFFF')
              .backgroundColor('#2563EB')
              .borderRadius(10)
              .onClick(() => {
                this.showSuccess = false;
                router.back();
              })
          }
          .width('88%')
          .padding(20)
          .backgroundColor('#FFFFFF')
          .borderRadius(16)
          .position({ bottom: 40, left: '6%' })
        }
        .width('100%')
        .height('100%')
        .position({ x: 0, y: 0 })
        .zIndex(50)
      }
    }
  }

  /**
   * 提交评教
   * 校验所有题目是否已作答
   */
  private handleSubmit(): void {
    // 校验未完成项
    const unanswered = this.questions.filter((q: EvaluationQuestion) => {
      if (q.type === 'single' || q.type === 'star') {
        return q.answer === null || q.answer === undefined || q.answer === '';
      }
      if (q.type === 'multi') {
        const multiAnswer = q.answer as string[];
        return !multiAnswer || multiAnswer.length === 0;
      }
      if (q.type === 'text') {
        const textAnswer = q.answer as string;
        return !textAnswer || textAnswer.trim().length === 0;
      }
      return false;
    });

    if (unanswered.length > 0) {
      // 提示未完成
      const firstUnanswered = unanswered[0];
      if (firstUnanswered) {
        const idx = this.questions.findIndex(q => q.id === firstUnanswered.id);
        // 滚动到未完成的题目（简化：弹提示）
        // 实际可结合 Scroll 组件滚动
      }
      return;
    }

    this.isSubmitting = true;
    setTimeout(() => {
      this.isSubmitting = false;
      this.showSuccess = true;
    }, 800);
  }

  /**
   * 获取答案的展示文本
   */
  private getAnswerDisplay(q: EvaluationQuestion): string {
    if (q.answer === null || q.answer === undefined || q.answer === '') {
      return '未作答';
    }
    if (q.type === 'single') {
      const opt = q.options.find(o => o.id === (q.answer as string));
      return opt ? opt.label : (q.answer as string);
    }
    if (q.type === 'multi') {
      const answerArr = q.answer as string[];
      if (!answerArr || answerArr.length === 0) {
        return '未作答';
      }
      const labels = answerArr.map(id => {
        const opt = q.options.find(o => o.id === id);
        return opt ? opt.label : id;
      });
      return labels.join('、');
    }
    if (q.type === 'star') {
      const star = q.answer as number;
      return '★'.repeat(star) + '☆'.repeat(5 - star) + ` (${star}星)`;
    }
    if (q.type === 'text') {
      return q.answer as string;
    }
    return '';
  }

  /**
   * 获取已回答题目数量
   */
  private getAnsweredCount(): number {
    return this.questions.filter((q: EvaluationQuestion) => {
      if (q.answer === null || q.answer === undefined || q.answer === '') {
        return false;
      }
      if (q.type === 'multi') {
        const arr = q.answer as string[];
        return arr && arr.length > 0;
      }
      return true;
    }).length;
  }
}

/**
 * 问卷题目卡片子组件
 */
@Component
struct QuestionCard {
  @Prop question: EvaluationQuestion;
  @Prop index: number = 1;

  build() {
    Column() {
      // 题目标题
      Row() {
        Text(`${this.index}. ${this.question.title}`)
          .fontSize(14)
          .fontWeight(FontWeight.Medium)
          .fontColor('#0F172A')
          .layoutWeight(1)

        if (this.question.required) {
          Text('*')
            .fontSize(14)
            .fontColor('#DC2626')
        }
      }
      .width('100%')
      .margin({ bottom: 10 })

      // 根据题型渲染
      if (this.question.type === 'single') {
        this.buildSingleQuestion()
      } else if (this.question.type === 'multi') {
        this.buildMultiQuestion()
      } else if (this.question.type === 'star') {
        this.buildStarQuestion()
      } else if (this.question.type === 'text') {
        this.buildTextQuestion()
      }
    }
    .width('100%')
    .padding(16)
    .backgroundColor('#FFFFFF')
    .borderRadius(12)
    .margin({ bottom: 10 })
  }

  /** 单选题 */
  @Builder
  buildSingleQuestion(): void {
    Column() {
      ForEach(this.question.options, (opt: EvaluationOption) => {
        Row() {
          Text(this.question.answer === opt.id ? '🔘' : '⚪')
            .fontSize(16)
            .margin({ right: 8 })
          Text(opt.label)
            .fontSize(13)
            .fontColor('#334155')
        }
        .width('100%')
        .padding({ top: 8, bottom: 8 })
        .onClick(() => {
          this.question.answer = opt.id;
        })
      })
    }
    .width('100%')
  }

  /** 多选题 */
  @Builder
  buildMultiQuestion(): void {
    Column() {
      ForEach(this.question.options, (opt: EvaluationOption) => {
        Row() {
          Text(this.isOptionSelected(opt.id) ? '☑' : '☐')
            .fontSize(16)
            .margin({ right: 8 })
          Text(opt.label)
            .fontSize(13)
            .fontColor('#334155')
        }
        .width('100%')
        .padding({ top: 8, bottom: 8 })
        .onClick(() => this.toggleOption(opt.id))
      })
    }
    .width('100%')
  }

  /** 星级评分 */
  @Builder
  buildStarQuestion(): void {
    Row() {
      ForEach([1, 2, 3, 4, 5], (star: number) => {
        Text(star <= (this.question.answer as number || 0) ? '★' : '☆')
          .fontSize(28)
          .fontColor(star <= (this.question.answer as number || 0) ? '#F59E0B' : '#CBD5E1')
          .margin({ right: 8 })
          .onClick(() => {
            this.question.answer = star;
          })
      })
    }
    .width('100%')
    .padding({ top: 4, bottom: 4 })
  }

  /** 主观题 */
  @Builder
  buildTextQuestion(): void {
    TextArea({ placeholder: '请输入您的意见...' })
      .width('100%')
      .height(100)
      .fontSize(13)
      .backgroundColor('#F8FAFC')
      .borderRadius(8)
      .padding(10)
      .onChange((val: string) => {
        this.question.answer = val;
      })
  }

  /** 判断多选选项是否选中 */
  private isOptionSelected(optionId: string): boolean {
    const answer = this.question.answer as string[];
    return answer ? answer.includes(optionId) : false;
  }

  /** 切换多选选项 */
  private toggleOption(optionId: string): void {
    const current = this.question.answer as string[];
    const answer: string[] = current ? current.slice() : [];
    const pos = answer.indexOf(optionId);
    if (pos >= 0) {
      answer.splice(pos, 1);
    } else {
      answer.push(optionId);
    }
    this.question.answer = answer;
  }
}
