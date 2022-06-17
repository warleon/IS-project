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
	// if (elem.prop("tagName") == "INPUT") return;
	// console.log(elem); console.log("Input");
	// console.log(elem.text());
	let input = $("<input  type='hidden'></input>");
	input.val(elem.attr("data-id"));
	// input.attr("data-id", elem.attr("data-id"));
	// input.attr("name", "dependency");
	// configElement(input);
	elem.append(input);
}
function changeToDiv(elem) {
	// if (elem.prop("tagName") == "DIV") return;
	// console.log(elem); console.log("Div");
	// let div = $("<div class='drag' draggable='true'></div>");
	// div.text(elem.val());
	// div.attr("data-id", elem.attr("data-id"));
	// configElement(div);
	// elem.replaceWith(div);
	elem.children().remove();
}

function addDraggable(dragObject) {
	let wrapper = $("<div class='drag' draggable='true'></div>");
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
});