export class Draggable {
    private btnAddItem: HTMLSpanElement
    private dragSrcEl: HTMLLIElement | null

    constructor(private dragClass: string) {
        const listItems = document.querySelectorAll(`.${this.dragClass}`) as NodeListOf<HTMLLIElement>;
        [].forEach.call(listItems, item => {
            this.addEventsDragAndDrop(item);
        });
        this.btnAddItem = document.querySelector('.add') as HTMLSpanElement;
        this.btnAddItem.addEventListener('click', this.addNewItem.bind(this));
        this.dragSrcEl = null;
    }

    addEventsDragAndDrop(el: HTMLLIElement) {
        el.addEventListener('dragstart', this.dragStart.bind(this), false);
        el.addEventListener('dragenter', this.dragEnter.bind(this), false);
        el.addEventListener('dragover', this.dragOver.bind(this), false);
        el.addEventListener('dragleave', this.dragLeave.bind(this), false);
        el.addEventListener('drop', this.dragDrop.bind(this), false);
        el.addEventListener('dragend', this.dragEnd.bind(this), false);
    }

    dragStart(e: DragEvent) {
        const element = e.target as HTMLLIElement;
        this.dragSrcEl = element as HTMLLIElement;
        e.dataTransfer!.effectAllowed = 'move';
        e.dataTransfer!.setData('text/html', element.innerHTML);
    }

    dragEnter(e: DragEvent) {
        const li = e.target as HTMLLIElement;
        li.classList.add('over');
    }

    dragLeave(e: DragEvent) {
        e.stopPropagation();
        const li = e.target as HTMLLIElement;
        li.classList.remove('over');
    }

    dragOver(e: DragEvent) {
        e.preventDefault();
        e.dataTransfer!.dropEffect = 'move';
        return false;
    }

    dragDrop(e: DragEvent) {
        const element = e.target as HTMLLIElement;
        if (this.dragSrcEl != element) {
            this.dragSrcEl!.innerHTML = element.innerHTML;
            element.innerHTML = e.dataTransfer!.getData('text/html');
        }
        return false;
    }

    dragEnd(e: DragEvent) {
        const listItems = document.querySelectorAll(`.${this.dragClass}`);
        [].forEach.call(listItems, (item: HTMLLIElement) => {
            item.classList.remove('over');
        });
        const li = e.target as HTMLLIElement;
        li.style.opacity = '1';
    }

    addNewItem() {
        const newItem = document.querySelector('.input') as HTMLInputElement;
        if (newItem.value != '') {
            const tempValue: string = newItem.value;
            newItem.value = '';
            const li = document.createElement('li');
            const attr = document.createAttribute('draggable');
            const ul = document.querySelector('ul') as HTMLUListElement;
            li.className = 'draggable';
            attr.value = 'true';
            li.setAttributeNode(attr);
            li.appendChild(document.createTextNode(tempValue));
            ul.appendChild(li);
            this.addEventsDragAndDrop(li);
        }
    }

}

