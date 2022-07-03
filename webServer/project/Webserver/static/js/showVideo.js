function addVideo(video, layer) {
  let wrapper_txt = `<div
                      class="row g-1 p-2 border-start border-primary border-5 rounded">
                    </div>`
  let wrapper = $(wrapper_txt);

  let wrapper_btn_txt = `<div
                          class="d-flex align-items-center">
                        </i></div>`
  let wrapper_btn_a = $(`<a
                        class="mx-1 btn btn-outline-danger btn-round mb-0">
                        <i class="fa-solid fa-play"></i></a>`);
  
  var currentURL = new URL($(location).attr('href'));
  var search_params = currentURL.searchParams;

  search_params.set('id', video.id);

  currentURL.search = search_params.toString();
  var newURL = currentURL.toString();

  wrapper_btn_a.attr('href', newURL)
  let wrapper_btn = $(wrapper_btn_txt)
  wrapper_btn.append(wrapper_btn_a)

  let details_txt = `<div class="col"></div>`
  let details = $(details_txt)

  let title = $(`<div
                  ></div>`);

  let author_txt = `<div
                      class="fw-light fst-italic">
                    </div>`
  let author = $(author_txt);

  // Button text for styled design
  let div_btn_txt = `<div
                      class="col-lg-6 col-md-auto d-flex justify-content-sm-end align-items-center">
                    </div>`
  let div_btn = $(div_btn_txt)
  let btn_txt = `<button
                  type="button"
                  class="btn btn-outline-success btn-sm 
                  text-uppercase text-wrap">
                    view dependencies
                </button>`;
  let btn = $(btn_txt);

  let title_a = $(`<a
                    class="text-decoration-none text-primary fw-bold"
                    ></a>`)

  title_a.text(video.title);
  title.append(title_a)

  var url2 = new URL( window.location.protocol + "//" + window.location.host + "/dashboard" );

  url2.searchParams.set('id',video.author.id);

  let userName = $(`<a
                    class="text-decoration-none text-secondary"
                    ></<a>`)

  userName.text(video.author.username);
  userName.attr('href',url2.toString());
  author.text('By ');
  author.append(userName);

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
  
  let details_author_txt = `<div class="w-100"></div>`
  let details_author = $(details_author_txt)

  details_author.append(title);
  details_author.append(author);
  wrapper_btn.append(details_author)
  details.append(wrapper_btn)
  div_btn.append(btn)

  wrapper.append(details)
  wrapper.append(div_btn);
  
  layer.append("<hr>");
  layer.append(wrapper);
}

function addLayer(videoId, level) {
  // Create styled layer
  let layer_txt = `<div
                    class='m-1 px-1 py-3 border-bottom border-2 border-dark'>
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
        layer.append($(`<h5 class="mb-4 text-wrap text-uppercase text-bold text-secondary">Layer ` + level + `</h5>`))
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
