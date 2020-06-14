$(document).ready(() => {
  $("#modal-button").click(() => {
    $(".modal-body").html("");
    $.get(`/api/watchlist`, (results = {}) => {
      let data = results.data;
      if (!data || !data.watchlist) return;
      data.watchlist.forEach(watchlist => {
        $(".modal-body").append(
          `<div>
						<span>
							${watchlist.name}
						</span>
					</div>`
        );
      });
    });
  });
});
