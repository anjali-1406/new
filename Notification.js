// ===============================
// Notification Count Loader
// ===============================

function loadNotificationCount() {

    fetch("/notifications/count/", {

        headers: {
            "X-Requested-With": "XMLHttpRequest"
        }

    })

    .then(response => response.json())

    .then(data => {

        const badge = document.getElementById(
            "notification-badge"
        );

        if (!badge) return;

        if (data.count > 0) {

            badge.innerHTML = data.count;

            badge.style.display = "flex";

        }

        else {

            badge.innerHTML = "";

            badge.style.display = "none";

        }

    })

    .catch(error => {

        console.log(
            "Notification Error:",
            error
        );

    });

}


// ===============================
// Load on Page Open
// ===============================

document.addEventListener(

    "DOMContentLoaded",

    function () {

        loadNotificationCount();

    }

);


// ===============================
// Auto Refresh Every 5 Seconds
// ===============================

setInterval(

    loadNotificationCount,

    5000

);
