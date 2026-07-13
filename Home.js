/* ===========================
   Reply Button
=========================== */

document.addEventListener("click", function (e) {

    const replyBtn = e.target.closest(".reply-btn");

    if (!replyBtn) return;

    const commentId = replyBtn.dataset.commentId;

    const form = document.querySelector(
        `.reply-form[data-parent="${commentId}"]`
    );

    if (form) {

        if (form.style.display === "none") {

            form.style.display = "flex";

        } else {

            form.style.display = "none";

        }

    }

});


/* ===========================
   Reply Submit AJAX
=========================== */

document.addEventListener("submit", function (e) {

    const form = e.target.closest(".reply-form");

    if (!form) return;

    e.preventDefault();

    const postId = form.dataset.postId;

    const parentId = form.dataset.parent;

    const formData = new FormData(form);

    fetch(`/post/${postId}/comment/`, {

        method: "POST",

        body: formData,

        headers: {

            "X-CSRFToken": csrftoken,

            "X-Requested-With": "XMLHttpRequest"

        }

    })

    .then(res => res.json())

    .then(data => {

        if (!data.success) return;

        const replyList = document.getElementById(
            `reply-list-${parentId}`
        );

        const html = `

        <div class="reply-box">

            <strong>${data.username}</strong>

            <br>

            ${data.comment_text}

        </div>

        `;

        if (replyList) {

            replyList.insertAdjacentHTML(
                "beforeend",
                html
            );

        }

        form.reset();

        form.style.display = "none";

    });

});
