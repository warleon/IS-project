function addVideo(video, layer) {
	let wrapper = $("<div></div>");
	let title = $("<div></div>");
	let author = $("<div></div>");
	let btn = $("<button>view dependencies</button>");

	title.text(video.title);
	author.text(video.author);
	btn.on("click", () => {
		level = parseInt(layer.attr("data-level")) + 1;
		checkLevel = level
		while (1) {
			elem = $('[data-level="' + checkLevel + '"]')
			if (!elem.length) break;
			elem.remove();
			checkLevel += 1;
		}
		addLayer(video.id, level);
	})

	wrapper.append(title);
	wrapper.append(author);
	wrapper.append(btn);

	layer.append(wrapper);
}

function addLayer(videoId, level) {
	//create layer
	let layer = $("<div></div>");
	layer.attr("data-level", level);
	$("#dependencies").append(layer);

	const config = {
		url: "getdependencies",
		type: "GET",
		datatype: "json",
		data: {
			id: videoId
		},
		success: (data) => {
			for (video of data) {
				addVideo(video, layer);
			}
		},
		error: (err) => { console.log(err); }
	}
	$.ajax(config);
}

$(document).ready(() => {
	addLayer($("#dependencies").attr("data-id"), 0);
});