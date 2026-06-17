if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NoteEditPage_Params {
    noteId?: string;
    title?: string;
    content?: string;
    updateTime?: number;
    images?: string[];
}
import router from "@ohos:router";
import { Note } from "@normalized:N&&&entry/src/main/ets/model/Note&";
import { DataManager } from "@normalized:N&&&entry/src/main/ets/model/DataManager&";
import picker from "@ohos:file.picker";
class NoteEditPage extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__noteId = new ObservedPropertySimplePU('', this, "noteId");
        this.__title = new ObservedPropertySimplePU('', this, "title");
        this.__content = new ObservedPropertySimplePU('', this, "content");
        this.__updateTime = new ObservedPropertySimplePU(0, this, "updateTime");
        this.__images = new ObservedPropertyObjectPU([], this, "images");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NoteEditPage_Params) {
        if (params.noteId !== undefined) {
            this.noteId = params.noteId;
        }
        if (params.title !== undefined) {
            this.title = params.title;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
        if (params.updateTime !== undefined) {
            this.updateTime = params.updateTime;
        }
        if (params.images !== undefined) {
            this.images = params.images;
        }
    }
    updateStateVars(params: NoteEditPage_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__noteId.purgeDependencyOnElmtId(rmElmtId);
        this.__title.purgeDependencyOnElmtId(rmElmtId);
        this.__content.purgeDependencyOnElmtId(rmElmtId);
        this.__updateTime.purgeDependencyOnElmtId(rmElmtId);
        this.__images.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__noteId.aboutToBeDeleted();
        this.__title.aboutToBeDeleted();
        this.__content.aboutToBeDeleted();
        this.__updateTime.aboutToBeDeleted();
        this.__images.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __noteId: ObservedPropertySimplePU<string>;
    get noteId() {
        return this.__noteId.get();
    }
    set noteId(newValue: string) {
        this.__noteId.set(newValue);
    }
    private __title: ObservedPropertySimplePU<string>;
    get title() {
        return this.__title.get();
    }
    set title(newValue: string) {
        this.__title.set(newValue);
    }
    private __content: ObservedPropertySimplePU<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    private __updateTime: ObservedPropertySimplePU<number>;
    get updateTime() {
        return this.__updateTime.get();
    }
    set updateTime(newValue: number) {
        this.__updateTime.set(newValue);
    }
    private __images: ObservedPropertyObjectPU<string[]>;
    get images() {
        return this.__images.get();
    }
    set images(newValue: string[]) {
        this.__images.set(newValue);
    }
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
    saveNote() {
        if (this.title.trim() === '' && this.content.trim() === '' && this.images.length === 0) {
            return;
        }
        if (this.noteId) {
            const note = new Note(this.noteId, this.title, this.content, Date.now(), this.images);
            DataManager.getInstance().updateNote(note);
        }
        else {
            DataManager.getInstance().addNote(this.title, this.content, this.images);
        }
    }
    async selectImage() {
        try {
            const photoSelectOptions = new picker.PhotoSelectOptions();
            photoSelectOptions.MIMEType = picker.PhotoViewMIMETypes.IMAGE_TYPE;
            photoSelectOptions.maxSelectNumber = 5;
            const photoViewPicker = new picker.PhotoViewPicker();
            const photoSelectResult = await photoViewPicker.select(photoSelectOptions);
            if (photoSelectResult && photoSelectResult.photoUris && photoSelectResult.photoUris.length > 0) {
                this.images = [...this.images, ...photoSelectResult.photoUris];
            }
        }
        catch (err) {
            console.error('PhotoViewPicker failed with err: ' + JSON.stringify(err));
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(58:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor(Color.White);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Toolbar
            Row.create();
            Row.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(60:7)", "entry");
            // Toolbar
            Row.width('100%');
            // Toolbar
            Row.padding(15);
            // Toolbar
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(61:9)", "entry");
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                this.saveNote();
                router.back();
            });
        }, Image);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Blank.create();
            Blank.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(69:9)", "entry");
        }, Blank);
        Blank.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Image.create({ "id": 16777235, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
            Image.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(71:9)", "entry");
            Image.width(24);
            Image.height(24);
            Image.onClick(() => {
                this.selectImage();
            });
        }, Image);
        // Toolbar
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Title
            TextInput.create({ text: { value: this.title, changeEvent: newValue => { this.title = newValue; } }, placeholder: '标题' });
            TextInput.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(83:7)", "entry");
            // Title
            TextInput.fontSize(24);
            // Title
            TextInput.fontWeight(FontWeight.Bold);
            // Title
            TextInput.backgroundColor(Color.Transparent);
            // Title
            TextInput.placeholderColor(Color.Gray);
            // Title
            TextInput.width('100%');
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Info
            Text.create(`${new Date().toLocaleString()} | ${this.content.length}字`);
            Text.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(91:7)", "entry");
            // Info
            Text.fontSize(12);
            // Info
            Text.fontColor(Color.Gray);
            // Info
            Text.width('100%');
            // Info
            Text.padding({ left: 15, bottom: 10 });
        }, Text);
        // Info
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Content
            TextArea.create({ text: { value: this.content, changeEvent: newValue => { this.content = newValue; } }, placeholder: '开始书写...' });
            TextArea.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(98:7)", "entry");
            // Content
            TextArea.fontSize(16);
            // Content
            TextArea.backgroundColor(Color.Transparent);
            // Content
            TextArea.layoutWeight(1);
            // Content
            TextArea.width('100%');
            // Content
            TextArea.textAlign(TextAlign.Start);
        }, TextArea);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Images Grid
            if (this.images.length > 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Grid.create();
                        Grid.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(107:9)", "entry");
                        Grid.columnsTemplate('1fr 1fr 1fr');
                        Grid.columnsGap(10);
                        Grid.rowsGap(10);
                        Grid.padding(10);
                        Grid.height(this.images.length > 3 ? 220 : 110);
                    }, Grid);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const img = _item;
                            {
                                const itemCreation2 = (elmtId, isInitialRender) => {
                                    GridItem.create(() => { }, false);
                                    GridItem.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(109:13)", "entry");
                                };
                                const observedDeepRender = () => {
                                    this.observeComponentCreation2(itemCreation2, GridItem);
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Image.create(img);
                                        Image.debugLine("entry/src/main/ets/pages/NoteEditPage.ets(110:15)", "entry");
                                        Image.width('100%');
                                        Image.height(100);
                                        Image.objectFit(ImageFit.Cover);
                                        Image.borderRadius(8);
                                    }, Image);
                                    GridItem.pop();
                                };
                                observedDeepRender();
                            }
                        };
                        this.forEachUpdateFunction(elmtId, this.images, forEachItemGenFunction);
                    }, ForEach);
                    ForEach.pop();
                    Grid.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
    static getEntryName(): string {
        return "NoteEditPage";
    }
}
registerNamedRoute(() => new NoteEditPage(undefined, {}), "", { bundleName: "com.example.notepad", moduleName: "entry", pagePath: "pages/NoteEditPage", pageFullPath: "entry/src/main/ets/pages/NoteEditPage", integratedHsp: "false", moduleType: "followWithHap" });
