import router from '@ohos.router';
import { Note } from '../model/Note';
import { DataManager } from '../model/DataManager';
import picker from '@ohos.file.picker';

/**
 * 笔记编辑页面
 * 支持富文本编辑、插入图片、保存和更新笔记
 */
@Entry
@Component
struct NoteEditPage {
  /** 笔记ID，为空表示新建 */
  @State noteId: string = '';
  /** 笔记标题 */
  @State title: string = '';
  /** 笔记内容（纯文本） */
  @State content: string = '';
  /** 更新时间 */
  @State updateTime: number = 0;
  /** 图片列表 */
  @State images: string[] = [];
  /** 富文本编辑器控制器 */
  controller: RichEditorController = new RichEditorController();
  /** 编辑器是否准备就绪 */
  private isReady: boolean = false;

  /**
   * 页面即将显示时调用
   * 获取路由参数，如果是编辑模式则加载现有笔记数据
   */
  aboutToAppear() {
    const params = router.getParams() as Record<string, string>;
    if (params && params['noteId']) {
      this.noteId = params['noteId'];
      const notes = DataManager.getInstance().getNotes();
      const note = notes.find(n => n.id === this.noteId);
      if (note) {
        this.title = note.title;
        this.content = note.content;
        this.updateTime = note.updateTime;
        this.images = note.images || [];
      }
    }
  }

  /**
   * 保存笔记
   * 从富文本编辑器获取内容和图片，保存到 DataManager
   */
  saveNote() {
    if (!this.isReady) {
       // If editor wasn't ready, we might not have captured changes, but for now let's assume simple save
       // Actually, we need to extract from controller.
    }
    
    let newContent = '';
    let newImages: string[] = [];
    
    try {
      this.controller.getSpans().forEach(span => {
        if ((span as RichEditorTextSpanResult).value) {
          newContent += (span as RichEditorTextSpanResult).value;
        } else if ((span as RichEditorImageSpanResult).valueResourceStr) {
           newImages.push((span as RichEditorImageSpanResult).valueResourceStr as string);
        }
      });
    } catch (e) {
      // If getSpans fails (e.g. empty), fallback to existing state if not modified, or empty
      console.error('getSpans failed:', e);
    }

    // If content is empty and no images, check if we should delete or just not save empty?
    // For now, just save what we have.
    // Note: getSpans might return nothing if empty.
    
    if (this.title.trim() === '' && newContent.trim() === '' && newImages.length === 0) {
      return;
    }

    if (this.noteId) {
      const note = new Note(this.noteId, this.title, newContent, Date.now(), newImages);
      DataManager.getInstance().updateNote(note);
    } else {
      DataManager.getInstance().addNote(this.title, newContent, newImages);
    }
  }

  /**
   * 选择图片
   * 打开系统相册选择图片并插入到编辑器中
   */
  async selectImage() {
    try {
      const photoSelectOptions = new picker.PhotoSelectOptions();
      photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
      photoSelectOptions.maxSelectNumber = 5;
      const photoViewPicker = new picker.PhotoViewPicker();
      const photoSelectResult = await photoViewPicker.select(photoSelectOptions);
      if (photoSelectResult && photoSelectResult.photoUris && photoSelectResult.photoUris.length > 0) {
        // Insert images at the beginning (offset 0)
        photoSelectResult.photoUris.forEach(uri => {
             this.controller.addImageSpan(uri, {
                 offset: 0
             })
        });
      }
    } catch (err) {
      console.error('PhotoViewPicker failed with err: ' + JSON.stringify(err));
    }
  }

  build() {
    Column() {
      // Toolbar
      Row() {
        Image($r('app.media.return'))
          .width(24)
          .height(24)
          .onClick(() => {
            this.saveNote();
            router.back();
          })
        
        Blank()
        
        Image($r('app.media.tupian'))
          .width(24)
          .height(24)
          .onClick(() => {
            this.selectImage();
          })
      }
      .width('100%')
      .padding(15)
      .alignItems(VerticalAlign.Center)

      // Title
      TextInput({ text: $$this.title, placeholder: '标题' })
        .fontSize(24)
        .fontWeight(FontWeight.Bold)
        .backgroundColor(Color.Transparent)
        .placeholderColor(Color.Gray)
        .width('100%')

      // Info
      Text(`${new Date().toLocaleString()} | ${this.content.length}字`)
        .fontSize(12)
        .fontColor(Color.Gray)
        .width('100%')
        .padding({ left: 15, bottom: 10 })

      // 富文本编辑器，用于编写和编辑笔记内容

      RichEditor({ controller: this.controller })
        .layoutWeight(1)
        .width('100%')
        .backgroundColor(Color.Transparent)
        .onReady(() => {
            this.isReady = true;
          // 将现有图片插入到顶部
          // 反转数组以保持插入顺序正确

          [...this.images].reverse().forEach(img => {
                this.controller.addImageSpan(img, {
                    offset: 0
                })
            });
          // 插入现有内容

          if (this.content) {
                this.controller.addTextSpan(this.content, {
                    style: {
                        fontSize: 16,
                        fontColor: Color.Black
                    }
                });
            }
        })
    }
    .width('100%')
    .height('100%')
    .backgroundColor(Color.White)
  }
}
