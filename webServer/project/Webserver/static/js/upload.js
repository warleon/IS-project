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
	if (elem.children().length) return
	let input = $("<input  type='hidden' name='dependency'></input>");
	input.val(elem.attr("data-id"));
	elem.append(input);
}
function changeToDiv(elem) {
	elem.children().remove();
}

function addDraggable(dragObject) {
	let wrapper = $("<div class='btn bg-success drag align-middle m-2 px-3 text-white' draggable='true'></div>");
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
