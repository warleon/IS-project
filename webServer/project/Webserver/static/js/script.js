let containers = document.querySelectorAll(".content");
containers.forEach((container) => {
	container.addEventListener("dragover", (e) => {
		e.preventDefault();
		const drag = document.querySelector(".drag.ing");
		container.appendChild(drag);
	});
});

function configElement(elem) {
	elem.on("dragstart", () => {
		elem.addClass("ing");
	});
	elem.on("dragend", () => {
		elem.removeClass("ing");
		if (elem.parent().attr("id") === "selectCont") {
			changeToInput(elem);
		}
		if (elem.parent().attr("id") === "searchCont") {
			changeToDiv(elem);
		}
	});

}

function changeToInput(elem) {
	if (elem.prop("tagName") == "INPUT") return;
	console.log(elem); console.log("Input");
	console.log(elem.text());
	let input = $("<input readonly type='text' class='drag' draggable='true'></input>");
	input.val(elem.text());
	input.attr("data-id", elem.attr("data-id"));
	configElement(input);
	elem.replaceWith(input);
}
function changeToDiv(elem) {
	if (elem.prop("tagName") == "DIV") return;
	console.log(elem); console.log("Div");
	let div = $("<div class='drag' draggable='true'></div>");
	div.text(elem.val());
	div.attr("data-id", elem.attr("data-id"));
	configElement(div);
	elem.replaceWith(div);
}

function addDraggable(dragObject) {
	let wrapper = $("<div></div>");
	wrapper.addClass("drag");
	wrapper.attr("draggable", "true");
	wrapper.attr("data-id", dragObject.id);
	wrapper.html(dragObject.title);
	configElement(wrapper);

	$("#searchCont").append(wrapper);
}

$(document).ready(() => {
	$("#searchBtn").click(() => {
		const config = {
			url: "getvideos",
			type: "GET",
			datatype: "json",
			data: {
				title: $("#searchInput").val()
			},
			success: (data) => {
				$("#searchCont").empty();
				for (video of data) {
					addDraggable(video);
				}
			},
			error: (err) => { console.log(err); }
		}
		$.ajax(config);
	});
	// $("#selectCont").on("dragover", (e) => {
	// 	e.preventDefault();
	// 	const drag = $(".drag.ing");
	// 	if ($("input[data-id='" + drag.attr("data-id") + "']").length) return;
	// 	//convert to input
	// 	let newInput = $("<input readonly class='drag' draggable='true'></input>");
	// 	newInput.attr("data-id", drag.attr("data-id"));
	// 	newInput.attr("type", "text");
	// 	newInput.attr("value", drag.text());
	// 	newInput.on("dragstart", () => {
	// 		newInput.addClass("ing");
	// 	});
	// 	newInput.on("dragend", () => {
	// 		newInput.removeClass("ing");
	// 	});

	// 	drag.removeClass("ing");
	// 	drag.remove();
	// 	$("#selectCont").append(newInput);
	// });
	// $("#searchCont").on("dragover", (e) => {
	// 	e.preventDefault();
	// 	//convert to div
	// 	const drag = $(".drag.ing");
	// 	$("#searchCont").append(drag);
	// });
});