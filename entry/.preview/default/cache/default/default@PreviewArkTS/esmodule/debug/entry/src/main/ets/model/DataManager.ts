import { Note } from "@normalized:N&&&entry/src/main/ets/model/Note&";
import { Todo } from "@normalized:N&&&entry/src/main/ets/model/Todo&";
export class DataManager {
    private static instance: DataManager;
    private constructor() {
        // Initialize PersistentStorage
        PersistentStorage.PersistProp('notes', []);
        PersistentStorage.PersistProp('todos', []);
    }
    public static getInstance(): DataManager {
        if (!DataManager.instance) {
            DataManager.instance = new DataManager();
        }
        return DataManager.instance;
    }
    getNotes(): Note[] {
        let notes = AppStorage.Get<Note[]>('notes');
        if (!notes) {
            notes = [];
        }
        return notes;
    }
    addNote(title: string, content: string, images: string[] = []) {
        const notes = this.getNotes();
        console.info('DataManager: Current notes count:', notes.length);
        const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
        const newNote = new Note(id, title, content, Date.now(), images);
        const newNotes = [newNote, ...notes];
        AppStorage.SetOrCreate('notes', newNotes);
        console.info('DataManager: New notes count:', newNotes.length);
    }
    updateNote(note: Note) {
        let notes = this.getNotes();
        const index = notes.findIndex(n => n.id === note.id);
        if (index !== -1) {
            notes[index] = note;
            note.updateTime = Date.now();
            // Re-assign to trigger update
            AppStorage.SetOrCreate('notes', [...notes]);
        }
    }
    deleteNote(id: string) {
        let notes = this.getNotes();
        notes = notes.filter(n => n.id !== id);
        AppStorage.SetOrCreate('notes', notes);
    }
    getTodos(): Todo[] {
        let todos = AppStorage.Get<Todo[]>('todos');
        if (!todos) {
            todos = [];
        }
        return todos;
    }
    addTodo(content: string) {
        const todos = this.getTodos();
        const id = Date.now().toString() + Math.floor(Math.random() * 1000).toString();
        const newTodo = new Todo(id, content, false);
        AppStorage.SetOrCreate('todos', [newTodo, ...todos]);
    }
    toggleTodo(id: string) {
        let todos = this.getTodos();
        const index = todos.findIndex(t => t.id === id);
        if (index !== -1) {
            todos[index].isDone = !todos[index].isDone;
            AppStorage.SetOrCreate('todos', [...todos]);
        }
    }
    deleteTodo(id: string) {
        let todos = this.getTodos();
        todos = todos.filter(t => t.id !== id);
        AppStorage.SetOrCreate('todos', todos);
    }
    deleteNotes(ids: string[]) {
        let notes = this.getNotes();
        notes = notes.filter(n => !ids.includes(n.id));
        AppStorage.SetOrCreate('notes', notes);
    }
    deleteTodos(ids: string[]) {
        let todos = this.getTodos();
        todos = todos.filter(t => !ids.includes(t.id));
        AppStorage.SetOrCreate('todos', todos);
    }
}
