import { DraggableNote } from "./DraggableNote.component.js";

const container = document.querySelector("main.container");
const notePlaceholder = document.getElementById("add-note-placeholder");

notePlaceholder.addEventListener("click", () => {
	container.appendChild(new DraggableNote());
});

container.addEventListener("dragover", (e) => {
	e.preventDefault();

	const draggingNote = document.querySelector(".dragging");

	const afterElement = getDragPosition(container, e.clientY, e.clientX);
	console.log(afterElement);

	if (afterElement === null) {
		container.appendChild(draggingNote);
	} else {
		container.insertBefore(draggingNote, afterElement);
	}
});

const getDragPosition = (container, y, x) => {
	const draggables = [...document.querySelectorAll("draggable-note:not(.dragging)")];

	return draggables.reduce(
		(closest, el) => {
			const box = el.getBoundingClientRect();
			const offsetY = y - box.top - box.height / 2;
			const offsetX = x - box.left - box.width / 2;

			if (offsetX < 0 && offsetY < 0 && offsetX > closest.offset && offsetY > closest.offset) {
				return {
					offsetX: offsetX,
					offsetY: offsetY,
					el: el,
				};
			} else {
				return closest;
			}
		},
		{ offset: Number.NEGATIVE_INFINITY }
	).el;
};
