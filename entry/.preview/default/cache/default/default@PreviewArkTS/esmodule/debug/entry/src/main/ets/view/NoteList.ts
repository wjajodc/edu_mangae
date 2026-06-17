if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface NoteList_Params {
    notes?: Note[];
    searchText?: string;
    isEditMode?: boolean;
    selectedNoteIds?: string[];
}
import type { Note } from '../model/Note';
import { DataManager } from "@normalized:N&&&entry/src/main/ets/model/DataManager&";
import router from "@ohos:router";
export class NoteList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__notes = this.createStorageLink('notes', [], "notes");
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__isEditMode = new ObservedPropertySimplePU(false, this, "isEditMode");
        this.__selectedNoteIds = new ObservedPropertyObjectPU([], this, "selectedNoteIds");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: NoteList_Params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.isEditMode !== undefined) {
            this.isEditMode = params.isEditMode;
        }
        if (params.selectedNoteIds !== undefined) {
            this.selectedNoteIds = params.selectedNoteIds;
        }
    }
    updateStateVars(params: NoteList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__notes.purgeDependencyOnElmtId(rmElmtId);
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__isEditMode.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedNoteIds.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__notes.aboutToBeDeleted();
        this.__searchText.aboutToBeDeleted();
        this.__isEditMode.aboutToBeDeleted();
        this.__selectedNoteIds.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __notes: ObservedPropertyAbstractPU<Note[]>;
    get notes() {
        return this.__notes.get();
    }
    set notes(newValue: Note[]) {
        this.__notes.set(newValue);
    }
    private __searchText: ObservedPropertySimplePU<string>;
    get searchText() {
        return this.__searchText.get();
    }
    set searchText(newValue: string) {
        this.__searchText.set(newValue);
    }
    private __isEditMode: ObservedPropertySimplePU<boolean>;
    get isEditMode() {
        return this.__isEditMode.get();
    }
    set isEditMode(newValue: boolean) {
        this.__isEditMode.set(newValue);
    }
    private __selectedNoteIds: ObservedPropertyObjectPU<string[]>;
    get selectedNoteIds() {
        return this.__selectedNoteIds.get();
    }
    set selectedNoteIds(newValue: string[]) {
        this.__selectedNoteIds.set(newValue);
    }
    toggleSelection(id: string) {
        if (this.selectedNoteIds.includes(id)) {
            this.selectedNoteIds = this.selectedNoteIds.filter(item => item !== id);
        }
        else {
            this.selectedNoteIds.push(id);
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/NoteList.ets(22:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Header
            Row.create();
            Row.debugLine("entry/src/main/ets/view/NoteList.ets(24:7)", "entry");
            // Header
            Row.width('90%');
            // Header
            Row.margin({ top: 20, bottom: 10 });
            // Header
            Row.alignItems(VerticalAlign.Center);
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.isEditMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777232, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/NoteList.ets(26:11)", "entry");
                        Image.width(24);
                        Image.height(24);
                        Image.onClick(() => {
                            this.isEditMode = false;
                            this.selectedNoteIds = [];
                        });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('请选择项目');
                        Text.debugLine("entry/src/main/ets/view/NoteList.ets(34:11)", "entry");
                        Text.fontSize(20);
                        Text.fontWeight(FontWeight.Bold);
                        Text.layoutWeight(1);
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777234, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/NoteList.ets(40:11)", "entry");
                        Image.width(24);
                        Image.height(24);
                        Image.onClick(() => {
                            if (this.selectedNoteIds.length === this.notes.length) {
                                this.selectedNoteIds = [];
                            }
                            else {
                                this.selectedNoteIds = this.notes.map(n => n.id);
                            }
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('笔记');
                        Text.debugLine("entry/src/main/ets/view/NoteList.ets(51:11)", "entry");
                        Text.fontSize(30);
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.debugLine("entry/src/main/ets/view/NoteList.ets(55:11)", "entry");
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/NoteList.ets(57:11)", "entry");
                        Image.width(24);
                        Image.height(24);
                        Image.onClick(() => {
                            this.isEditMode = true;
                        });
                    }, Image);
                });
            }
        }, If);
        If.pop();
        // Header
        Row.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Search Bar
            if (!this.isEditMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Search.create({ value: { value: this.searchText, changeEvent: newValue => { this.searchText = newValue; } }, placeholder: '搜索笔记' });
                        Search.debugLine("entry/src/main/ets/view/NoteList.ets(71:9)", "entry");
                        Search.width('90%');
                        Search.height(40);
                        Search.backgroundColor('#E0E0E0');
                        Search.placeholderColor(Color.Gray);
                        Search.placeholderFont({ size: 14, weight: 400 });
                        Search.textFont({ size: 14, weight: 400 });
                        Search.margin({ bottom: 10 });
                    }, Search);
                    Search.pop();
                });
            }
            // Note List
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Note List
            List.create({ space: 10 });
            List.debugLine("entry/src/main/ets/view/NoteList.ets(82:7)", "entry");
            // Note List
            List.width('90%');
            // Note List
            List.layoutWeight(1);
        }, List);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            ForEach.create();
            const forEachItemGenFunction = _item => {
                const note = _item;
                {
                    const itemCreation = (elmtId, isInitialRender) => {
                        ViewStackProcessor.StartGetAccessRecordingFor(elmtId);
                        ListItem.create(deepRenderFunction, true);
                        if (!isInitialRender) {
                            ListItem.pop();
                        }
                        ViewStackProcessor.StopGetAccessRecording();
                    };
                    const itemCreation2 = (elmtId, isInitialRender) => {
                        ListItem.create(deepRenderFunction, true);
                        ListItem.debugLine("entry/src/main/ets/view/NoteList.ets(84:11)", "entry");
                    };
                    const deepRenderFunction = (elmtId, isInitialRender) => {
                        itemCreation(elmtId, isInitialRender);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Row.create();
                            Row.debugLine("entry/src/main/ets/view/NoteList.ets(85:13)", "entry");
                            Row.width('100%');
                            Row.padding(15);
                            Row.backgroundColor(Color.White);
                            Row.borderRadius(10);
                            Row.onClick(() => {
                                if (this.isEditMode) {
                                    this.toggleSelection(note.id);
                                }
                                else {
                                    router.pushUrl({
                                        url: 'pages/NoteEditPage',
                                        params: { noteId: note.id }
                                    });
                                }
                            });
                        }, Row);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            If.create();
                            if (this.isEditMode) {
                                this.ifElseBranchUpdateFunction(0, () => {
                                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                                        Checkbox.create();
                                        Checkbox.debugLine("entry/src/main/ets/view/NoteList.ets(87:17)", "entry");
                                        Checkbox.select(this.selectedNoteIds.includes(note.id));
                                        Checkbox.selectedColor('#FFC107');
                                        Checkbox.onChange((value: boolean) => {
                                            this.toggleSelection(note.id);
                                        });
                                        Checkbox.margin({ right: 10 });
                                    }, Checkbox);
                                    Checkbox.pop();
                                });
                            }
                            else {
                                this.ifElseBranchUpdateFunction(1, () => {
                                });
                            }
                        }, If);
                        If.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Column.create();
                            Column.debugLine("entry/src/main/ets/view/NoteList.ets(96:15)", "entry");
                            Column.layoutWeight(1);
                            Column.alignItems(HorizontalAlign.Start);
                        }, Column);
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(note.title);
                            Text.debugLine("entry/src/main/ets/view/NoteList.ets(97:17)", "entry");
                            Text.fontSize(16);
                            Text.fontWeight(FontWeight.Bold);
                            Text.maxLines(1);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(note.content);
                            Text.debugLine("entry/src/main/ets/view/NoteList.ets(102:17)", "entry");
                            Text.fontSize(14);
                            Text.fontColor(Color.Gray);
                            Text.maxLines(2);
                            Text.textOverflow({ overflow: TextOverflow.Ellipsis });
                            Text.margin({ top: 5 });
                        }, Text);
                        Text.pop();
                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                            Text.create(new Date(note.updateTime).toLocaleString());
                            Text.debugLine("entry/src/main/ets/view/NoteList.ets(108:17)", "entry");
                            Text.fontSize(12);
                            Text.fontColor(Color.Gray);
                            Text.margin({ top: 5 });
                        }, Text);
                        Text.pop();
                        Column.pop();
                        Row.pop();
                        ListItem.pop();
                    };
                    this.observeComponentCreation2(itemCreation2, ListItem);
                    ListItem.pop();
                }
            };
            this.forEachUpdateFunction(elmtId, this.notes.filter(n => n.title.includes(this.searchText) || n.content.includes(this.searchText)), forEachItemGenFunction, (note: Note) => note.id + '_' + note.updateTime, false, false);
        }, ForEach);
        ForEach.pop();
        // Note List
        List.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Bottom Bar or FAB
            if (this.isEditMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.debugLine("entry/src/main/ets/view/NoteList.ets(138:9)", "entry");
                        Button.width('90%');
                        Button.height(50);
                        Button.backgroundColor(this.selectedNoteIds.length > 0 ? Color.Red : Color.Gray);
                        Button.margin({ bottom: 20 });
                        Button.enabled(this.selectedNoteIds.length > 0);
                        Button.onClick(() => {
                            DataManager.getInstance().deleteNotes(ObservedObject.GetRawObject(this.selectedNoteIds));
                            this.isEditMode = false;
                            this.selectedNoteIds = [];
                        });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/NoteList.ets(139:11)", "entry");
                        Image.width(24);
                        Image.height(24);
                        Image.fillColor(Color.White);
                    }, Image);
                    Button.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild({ type: ButtonType.Circle, stateEffect: true });
                        Button.debugLine("entry/src/main/ets/view/NoteList.ets(155:9)", "entry");
                        Button.width(60);
                        Button.height(60);
                        Button.backgroundColor('#FFC107');
                        Button.position({ x: '80%', y: '85%' });
                        Button.onClick(() => {
                            router.pushUrl({
                                url: 'pages/NoteEditPage'
                            });
                        });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('+');
                        Text.debugLine("entry/src/main/ets/view/NoteList.ets(156:11)", "entry");
                        Text.fontSize(30);
                        Text.fontColor(Color.White);
                    }, Text);
                    Text.pop();
                    Button.pop();
                });
            }
        }, If);
        If.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
