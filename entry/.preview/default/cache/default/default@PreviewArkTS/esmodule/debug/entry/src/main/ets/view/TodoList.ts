if (!("finalizeConstruction" in ViewPU.prototype)) {
    Reflect.set(ViewPU.prototype, "finalizeConstruction", () => { });
}
interface AddTodoDialog_Params {
    controller?: CustomDialogController;
    confirm?: (content: string) => void;
    content?: string;
}
interface TodoList_Params {
    todos?: Todo[];
    searchText?: string;
    isEditMode?: boolean;
    selectedTodoIds?: string[];
    dialogController?: CustomDialogController;
}
import type { Todo } from '../model/Todo';
import { DataManager } from "@normalized:N&&&entry/src/main/ets/model/DataManager&";
export class TodoList extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.__todos = this.createStorageLink('todos', [], "todos");
        this.__searchText = new ObservedPropertySimplePU('', this, "searchText");
        this.__isEditMode = new ObservedPropertySimplePU(false, this, "isEditMode");
        this.__selectedTodoIds = new ObservedPropertyObjectPU([], this, "selectedTodoIds");
        this.dialogController = new CustomDialogController({
            builder: () => {
                let jsDialog = new AddTodoDialog(this, {
                    confirm: (content: string) => {
                        DataManager.getInstance().addTodo(content);
                    }
                }, undefined, -1, () => { }, { page: "entry/src/main/ets/view/TodoList.ets", line: 13, col: 14 });
                jsDialog.setController(this.dialogController);
                ViewPU.create(jsDialog);
                let paramsLambda = () => {
                    return {
                        confirm: (content: string) => {
                            DataManager.getInstance().addTodo(content);
                        }
                    };
                };
                jsDialog.paramsGenerator_ = paramsLambda;
            },
            alignment: DialogAlignment.Bottom,
            offset: { dx: 0, dy: -20 }
        }, this);
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: TodoList_Params) {
        if (params.searchText !== undefined) {
            this.searchText = params.searchText;
        }
        if (params.isEditMode !== undefined) {
            this.isEditMode = params.isEditMode;
        }
        if (params.selectedTodoIds !== undefined) {
            this.selectedTodoIds = params.selectedTodoIds;
        }
        if (params.dialogController !== undefined) {
            this.dialogController = params.dialogController;
        }
    }
    updateStateVars(params: TodoList_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__todos.purgeDependencyOnElmtId(rmElmtId);
        this.__searchText.purgeDependencyOnElmtId(rmElmtId);
        this.__isEditMode.purgeDependencyOnElmtId(rmElmtId);
        this.__selectedTodoIds.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__todos.aboutToBeDeleted();
        this.__searchText.aboutToBeDeleted();
        this.__isEditMode.aboutToBeDeleted();
        this.__selectedTodoIds.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private __todos: ObservedPropertyAbstractPU<Todo[]>;
    get todos() {
        return this.__todos.get();
    }
    set todos(newValue: Todo[]) {
        this.__todos.set(newValue);
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
    private __selectedTodoIds: ObservedPropertyObjectPU<string[]>;
    get selectedTodoIds() {
        return this.__selectedTodoIds.get();
    }
    set selectedTodoIds(newValue: string[]) {
        this.__selectedTodoIds.set(newValue);
    }
    private dialogController: CustomDialogController;
    toggleSelection(id: string) {
        if (this.selectedTodoIds.includes(id)) {
            this.selectedTodoIds = this.selectedTodoIds.filter(item => item !== id);
        }
        else {
            this.selectedTodoIds.push(id);
        }
    }
    TodoItem(todo: Todo, parent = null) {
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
                ListItem.swipeAction({ end: this.isEditMode ? undefined : this.DeleteButton(todo.id) });
                ListItem.debugLine("entry/src/main/ets/view/TodoList.ets(31:5)", "entry");
            };
            const deepRenderFunction = (elmtId, isInitialRender) => {
                itemCreation(elmtId, isInitialRender);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Row.create();
                    Row.debugLine("entry/src/main/ets/view/TodoList.ets(32:7)", "entry");
                    Row.width('100%');
                    Row.padding(15);
                    Row.backgroundColor(Color.White);
                    Row.borderRadius(10);
                    Row.onClick(() => {
                        if (this.isEditMode) {
                            this.toggleSelection(todo.id);
                        }
                    });
                }, Row);
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    If.create();
                    if (this.isEditMode) {
                        this.ifElseBranchUpdateFunction(0, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Checkbox.create();
                                Checkbox.debugLine("entry/src/main/ets/view/TodoList.ets(34:11)", "entry");
                                Checkbox.select(this.selectedTodoIds.includes(todo.id));
                                Checkbox.selectedColor('#FFC107');
                                Checkbox.onChange((value: boolean) => {
                                    this.toggleSelection(todo.id);
                                });
                                Checkbox.margin({ right: 10 });
                            }, Checkbox);
                            Checkbox.pop();
                        });
                    }
                    else {
                        this.ifElseBranchUpdateFunction(1, () => {
                            this.observeComponentCreation2((elmtId, isInitialRender) => {
                                Checkbox.create({ name: 'checkbox', group: 'todos' });
                                Checkbox.debugLine("entry/src/main/ets/view/TodoList.ets(42:11)", "entry");
                                Checkbox.select(todo.isDone);
                                Checkbox.selectedColor('#FFC107');
                                Checkbox.onChange((value: boolean) => {
                                    DataManager.getInstance().toggleTodo(todo.id);
                                });
                            }, Checkbox);
                            Checkbox.pop();
                        });
                    }
                }, If);
                If.pop();
                this.observeComponentCreation2((elmtId, isInitialRender) => {
                    Text.create(todo.content);
                    Text.debugLine("entry/src/main/ets/view/TodoList.ets(50:9)", "entry");
                    Text.fontSize(16);
                    Text.fontColor(todo.isDone ? '#999999' : '#000000');
                    Text.decoration({ type: todo.isDone ? TextDecorationType.None : TextDecorationType.None });
                    Text.layoutWeight(1);
                    Text.margin({ left: 10 });
                }, Text);
                Text.pop();
                Row.pop();
                ListItem.pop();
            };
            this.observeComponentCreation2(itemCreation2, ListItem);
            ListItem.pop();
        }
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/TodoList.ets(71:5)", "entry");
            Column.width('100%');
            Column.height('100%');
            Column.backgroundColor('#F1F3F5');
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            // Header
            Row.create();
            Row.debugLine("entry/src/main/ets/view/TodoList.ets(73:7)", "entry");
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
                        Image.debugLine("entry/src/main/ets/view/TodoList.ets(75:11)", "entry");
                        Image.width(24);
                        Image.height(24);
                        Image.onClick(() => {
                            this.isEditMode = false;
                            this.selectedTodoIds = [];
                        });
                    }, Image);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('请选择项目');
                        Text.debugLine("entry/src/main/ets/view/TodoList.ets(83:11)", "entry");
                        Text.fontSize(20);
                        Text.fontWeight(FontWeight.Bold);
                        Text.layoutWeight(1);
                        Text.textAlign(TextAlign.Center);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777234, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/TodoList.ets(89:11)", "entry");
                        Image.width(24);
                        Image.height(24);
                        Image.onClick(() => {
                            if (this.selectedTodoIds.length === this.todos.length) {
                                this.selectedTodoIds = [];
                            }
                            else {
                                this.selectedTodoIds = this.todos.map(t => t.id);
                            }
                        });
                    }, Image);
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('待办');
                        Text.debugLine("entry/src/main/ets/view/TodoList.ets(100:11)", "entry");
                        Text.fontSize(30);
                        Text.fontWeight(FontWeight.Bold);
                    }, Text);
                    Text.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Blank.create();
                        Blank.debugLine("entry/src/main/ets/view/TodoList.ets(104:11)", "entry");
                    }, Blank);
                    Blank.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/TodoList.ets(106:11)", "entry");
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
                        Search.create({ value: { value: this.searchText, changeEvent: newValue => { this.searchText = newValue; } }, placeholder: '搜索待办' });
                        Search.debugLine("entry/src/main/ets/view/TodoList.ets(120:9)", "entry");
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
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            if (this.todos.length === 0) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Column.create();
                        Column.debugLine("entry/src/main/ets/view/TodoList.ets(131:9)", "entry");
                        Column.width('100%');
                        Column.layoutWeight(1);
                    }, Column);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('没有待办');
                        Text.debugLine("entry/src/main/ets/view/TodoList.ets(132:11)", "entry");
                        Text.fontSize(16);
                        Text.fontColor(Color.Gray);
                        Text.margin({ top: 100 });
                    }, Text);
                    Text.pop();
                    Column.pop();
                });
            }
            else {
                this.ifElseBranchUpdateFunction(1, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        List.create({ space: 10 });
                        List.debugLine("entry/src/main/ets/view/TodoList.ets(140:9)", "entry");
                        List.width('90%');
                        List.layoutWeight(1);
                    }, List);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Incomplete Todos
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const todo = _item;
                            this.TodoItem.bind(this)(todo);
                        };
                        this.forEachUpdateFunction(elmtId, this.todos.filter(t => !t.isDone && t.content.includes(this.searchText)), forEachItemGenFunction, (todo: Todo) => todo.id, false, false);
                    }, ForEach);
                    // Incomplete Todos
                    ForEach.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        If.create();
                        // Completed Header
                        if (this.todos.filter(t => t.isDone && t.content.includes(this.searchText)).length > 0) {
                            this.ifElseBranchUpdateFunction(0, () => {
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
                                        ListItem.debugLine("entry/src/main/ets/view/TodoList.ets(148:13)", "entry");
                                    };
                                    const deepRenderFunction = (elmtId, isInitialRender) => {
                                        itemCreation(elmtId, isInitialRender);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Row.create();
                                            Row.debugLine("entry/src/main/ets/view/TodoList.ets(149:15)", "entry");
                                            Row.width('100%');
                                            Row.padding({ top: 10, bottom: 5 });
                                        }, Row);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Image.create({ "id": 16777223, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                                            Image.debugLine("entry/src/main/ets/view/TodoList.ets(150:17)", "entry");
                                            Image.width(12);
                                            Image.height(12);
                                            Image.margin({ right: 5 });
                                            Image.rotate({ angle: -90 });
                                        }, Image);
                                        this.observeComponentCreation2((elmtId, isInitialRender) => {
                                            Text.create(`已完成 ${this.todos.filter(t => t.isDone && t.content.includes(this.searchText)).length}`);
                                            Text.debugLine("entry/src/main/ets/view/TodoList.ets(155:17)", "entry");
                                            Text.fontSize(14);
                                            Text.fontColor('#999999');
                                        }, Text);
                                        Text.pop();
                                        Row.pop();
                                        ListItem.pop();
                                    };
                                    this.observeComponentCreation2(itemCreation2, ListItem);
                                    ListItem.pop();
                                }
                            });
                        }
                        // Completed Todos
                        else {
                            this.ifElseBranchUpdateFunction(1, () => {
                            });
                        }
                    }, If);
                    If.pop();
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        // Completed Todos
                        ForEach.create();
                        const forEachItemGenFunction = _item => {
                            const todo = _item;
                            this.TodoItem.bind(this)(todo);
                        };
                        this.forEachUpdateFunction(elmtId, this.todos.filter(t => t.isDone && t.content.includes(this.searchText)), forEachItemGenFunction, (todo: Todo) => todo.id, false, false);
                    }, ForEach);
                    // Completed Todos
                    ForEach.pop();
                    List.pop();
                });
            }
        }, If);
        If.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            If.create();
            // Bottom Bar or FAB
            if (this.isEditMode) {
                this.ifElseBranchUpdateFunction(0, () => {
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Button.createWithChild();
                        Button.debugLine("entry/src/main/ets/view/TodoList.ets(175:9)", "entry");
                        Button.width('90%');
                        Button.height(50);
                        Button.backgroundColor(this.selectedTodoIds.length > 0 ? Color.Red : Color.Gray);
                        Button.margin({ bottom: 20 });
                        Button.enabled(this.selectedTodoIds.length > 0);
                        Button.onClick(() => {
                            DataManager.getInstance().deleteTodos(ObservedObject.GetRawObject(this.selectedTodoIds));
                            this.isEditMode = false;
                            this.selectedTodoIds = [];
                        });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Image.create({ "id": 16777231, "type": 20000, params: [], "bundleName": "com.example.notepad", "moduleName": "entry" });
                        Image.debugLine("entry/src/main/ets/view/TodoList.ets(176:11)", "entry");
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
                        Button.debugLine("entry/src/main/ets/view/TodoList.ets(192:9)", "entry");
                        Button.width(60);
                        Button.height(60);
                        Button.backgroundColor('#FFC107');
                        Button.position({ x: '80%', y: '85%' });
                        Button.onClick(() => {
                            this.dialogController.open();
                        });
                    }, Button);
                    this.observeComponentCreation2((elmtId, isInitialRender) => {
                        Text.create('+');
                        Text.debugLine("entry/src/main/ets/view/TodoList.ets(193:11)", "entry");
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
    DeleteButton(id: string, parent = null) {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithChild();
            Button.debugLine("entry/src/main/ets/view/TodoList.ets(212:5)", "entry");
            Button.width(80);
            Button.height('100%');
            Button.type(ButtonType.Normal);
            Button.backgroundColor(Color.Red);
            Button.onClick(() => {
                DataManager.getInstance().deleteTodo(id);
            });
        }, Button);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('删除');
            Text.debugLine("entry/src/main/ets/view/TodoList.ets(213:7)", "entry");
            Text.fontColor(Color.White);
        }, Text);
        Text.pop();
        Button.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
class AddTodoDialog extends ViewPU {
    constructor(parent, params, __localStorage, elmtId = -1, paramsLambda = undefined, extraInfo) {
        super(parent, __localStorage, elmtId, extraInfo);
        if (typeof paramsLambda === "function") {
            this.paramsGenerator_ = paramsLambda;
        }
        this.controller = undefined;
        this.confirm = (content: string) => { };
        this.__content = new ObservedPropertySimplePU('', this, "content");
        this.setInitiallyProvidedValue(params);
        this.finalizeConstruction();
    }
    setInitiallyProvidedValue(params: AddTodoDialog_Params) {
        if (params.controller !== undefined) {
            this.controller = params.controller;
        }
        if (params.confirm !== undefined) {
            this.confirm = params.confirm;
        }
        if (params.content !== undefined) {
            this.content = params.content;
        }
    }
    updateStateVars(params: AddTodoDialog_Params) {
    }
    purgeVariableDependenciesOnElmtId(rmElmtId) {
        this.__content.purgeDependencyOnElmtId(rmElmtId);
    }
    aboutToBeDeleted() {
        this.__content.aboutToBeDeleted();
        SubscriberManager.Get().delete(this.id__());
        this.aboutToBeDeletedInternal();
    }
    private controller?: CustomDialogController;
    setController(ctr: CustomDialogController) {
        this.controller = ctr;
    }
    private confirm: (content: string) => void;
    private __content: ObservedPropertySimplePU<string>;
    get content() {
        return this.__content.get();
    }
    set content(newValue: string) {
        this.__content.set(newValue);
    }
    initialRender() {
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Column.create();
            Column.debugLine("entry/src/main/ets/view/TodoList.ets(233:5)", "entry");
            Column.padding(20);
            Column.backgroundColor(Color.White);
            Column.borderRadius(10);
        }, Column);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Text.create('添加待办');
            Text.debugLine("entry/src/main/ets/view/TodoList.ets(234:7)", "entry");
            Text.fontSize(20);
            Text.fontWeight(FontWeight.Bold);
            Text.margin({ bottom: 10 });
        }, Text);
        Text.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            TextInput.create({ text: { value: this.content, changeEvent: newValue => { this.content = newValue; } }, placeholder: '请输入待办事项' });
            TextInput.debugLine("entry/src/main/ets/view/TodoList.ets(239:7)", "entry");
            TextInput.margin({ bottom: 20 });
        }, TextInput);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Row.create();
            Row.debugLine("entry/src/main/ets/view/TodoList.ets(242:7)", "entry");
            Row.justifyContent(FlexAlign.SpaceEvenly);
            Row.width('100%');
        }, Row);
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('取消');
            Button.debugLine("entry/src/main/ets/view/TodoList.ets(243:9)", "entry");
            Button.onClick(() => {
                this.controller?.close();
            });
            Button.backgroundColor(Color.White);
            Button.fontColor(Color.Black);
        }, Button);
        Button.pop();
        this.observeComponentCreation2((elmtId, isInitialRender) => {
            Button.createWithLabel('确定');
            Button.debugLine("entry/src/main/ets/view/TodoList.ets(250:9)", "entry");
            Button.onClick(() => {
                if (this.content.trim().length > 0) {
                    this.confirm(this.content);
                }
                this.controller?.close();
            });
            Button.backgroundColor('#FFC107');
            Button.fontColor(Color.White);
        }, Button);
        Button.pop();
        Row.pop();
        Column.pop();
    }
    rerender() {
        this.updateDirtyElements();
    }
}
