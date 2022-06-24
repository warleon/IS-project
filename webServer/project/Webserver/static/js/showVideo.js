function addVideo(video, layer) {

	let wrapper = $("<div></div>");

	let title = $("<div></div>");

  let author_txt = `<div
                      class="fw-light fst-italic">
                    </div>`
	let author = $(author_txt);
  
  // Button text for styled design
  let btn_txt = `<button
                  type="button"
                  class="btn btn-outline-success btn-sm text-uppercase text-wrap text-break">
                    view dependencies
                </button>`;
	let btn = $(btn_txt);

  var currentURL = new URL($(location).attr('href'));
  var search_params = currentURL.searchParams;

  search_params.set('id', video.id);

  currentURL.search = search_params.toString();
  var newURL = currentURL.toString();

  let title_a = $("<a></<a>")

	title_a.text(video.title);
  title_a.attr('href', newURL)
  title.append(title_a)
	author.text('By ' + video.author);

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
	// Create styled layer
  let layer_txt = `<div
                    class='border border-2 border-dark rounded m-2 p-2'>
                  </div>`
	let layer = $(layer_txt);
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
      if(data.length) {
        for (video of data) {
          addVideo(video, layer);
        }
      }
      else {
        let msg_txt = `<div
                          class='text-center fw-light fst-italic'>
                        </div>`
        let msg = $(msg_txt);
        msg.text("No dependencies found")
        layer.append(msg);
      }
		},
		error: (err) => { console.log(err); }
	}
	$.ajax(config);
}

$(document).ready(() => {
	addLayer($("#dependencies").attr("data-id"), 0);
});
