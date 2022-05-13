export class DraggableNote extends HTMLElement {
	constructor() {
		super();

		this.container = document.createElement("div");
		this.container.classList.add("note-container");

		this.draggableBorder = document.createElement("div");
		this.draggableBorder.classList.add("draggable-border");
		this.draggableBorder.setAttribute("draggable", true);

		this.noteEditor = document.createElement("div");
		this.noteEditor.classList.add("note");
		this.noteEditor.setAttribute("contenteditable", true);
		this.noteEditor.setAttribute("placeholder", "#New_note");

		this.container.appendChild(this.draggableBorder);
		this.container.appendChild(this.noteEditor);

		this.appendChild(this.container);
	}

	connectedCallback() {
		this.noteEditor.addEventListener("focusout", function () {
			if (!this.innerText.trim().length) {
				this.innerText = "";
			}
		});

		this.draggableBorder.addEventListener("dragstart", () => {
			this.classList.add("dragging");
		});

		this.draggableBorder.addEventListener("dragend", () => {
			this.classList.remove("dragging");
		});
	}
}
