function addVideo(video, layer) {
  let wrapper_txt = `<div
                      class="row g-1 p-2">
                    </div>`
  let wrapper = $(wrapper_txt);

  let details_txt = `<div class="col-4"></div>`
  let details = $(details_txt)

  let title = $("<div></div>");

  let author_txt = `<div
                      class="fw-light fst-italic">
                    </div>`
  let author = $(author_txt);

  // Button text for styled design
  let div_btn_txt = `<div
                      class="col d-flex justify-content-center align-items-center">
                    </div>`
  let div_btn = $(div_btn_txt)
  let btn_txt = `<button
                  type="button"
                  class="btn btn-outline-success btn-sm 
                  text-uppercase text-wrap text-break">
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

  details.append(title);
  details.append(author);
  div_btn.append(btn)

  wrapper.append(details)
  wrapper.append(div_btn);

  layer.append(wrapper);
}

function addLayer(videoId, level) {
  // Create styled layer
  let layer_txt = `<div
                    class='border border-2 border-dark rounded m-1 p-1'>
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
      if (data.length) {
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

function showVotes(videoId) {
  const config = {
    url: "getvotes",
    type: "GET",
    datatype: "json",
    data: {
      id: videoId
    },
    success: (data) => {
      $("#likecount").text(data.positive)
      $("#dislikecount").text(data.negative)
    },
    error: (err) => { console.log(err); }
  }
  $.ajax(config);
}
function updateVotes(videoId, pos) {
  const config = {
    url: "postvote",
    type: "POST",
    datatype: "json",
    data: {
      csrfmiddlewaretoken: $('input[name="csrfmiddlewaretoken"]').val(),
      id: videoId,
      positive: pos
    },
    success: (data) => {
      console.log(data)
      like = $("#likecount")
      dislike = $("#dislikecount")
      like.text(parseInt(like.text()) + data["positive"])
      dislike.text(parseInt(dislike.text()) + data["negative"])
    },
    error: (err) => { console.log(err); }
  }
  $.ajax(config);

}

$(document).ready(() => {
  videoId = $("#dependencies").attr("data-id")
  addLayer(videoId, 0);

  $("#voteup").on("click", () => { updateVotes(videoId, 1) });
  $("#votedown").on("click", () => { updateVotes(videoId, 0) });
  showVotes(videoId);
});
