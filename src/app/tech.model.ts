export class Tech {
    name: string;
    icon: string;
    color: string;
    back: string;

    constructor(name: string, icon: string, color: string = 'grey', back: string = 'transparent') {
        this.name = name;
        this.icon = icon;
        this.color = color;
        this.back = back;
    }
}