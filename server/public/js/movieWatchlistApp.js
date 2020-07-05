$(document).ready(() => {
    $("#modal-button").click(() => {
        $(".modal-body").html('');
        $.get("https://www.omdbapi.com?apikey=1c87f900&s=lord of the rings", (data) => {
            data.Search.forEach((movie) => {
                $(".modal-body").append(
                    `<div>
                    <span class="movie-title">
                    ${movie.Title}
                    </span>
                    <div class="course-description">
                    ${movie.Year}
                    </div>
                    <button class="add-button" data-id="${movie.imdbID}">
                        ADD
                    </button>
                    </div>`
                );
            });
        }).then(() => {
            addAddButtonListener();
        });
    });
});

let addAddButtonListener = () => {
    $(".add-button").click((event) => {
        let $button = $(event.target),
            courseId = $button.data("id");
        $.get(`/api/courses/${courseId}/join`, (results = {}) => {
            let data = results.data;
            if (data && data.success) {
                $button
                    .text("Joined")
                    .addClass("joined-button")
                    .removeClass("join-button");
            } else {
                $button.text("Try again");
            }
        });
    });
}
