export class Note {
    id: string;
    title: string;
    content: string;
    updateTime: number;
    images: string[];
    constructor(id: string, title: string, content: string, updateTime: number, images: string[] = []) {
        this.id = id;
        this.title = title;
        this.content = content;
        this.updateTime = updateTime;
        this.images = images;
    }
}
