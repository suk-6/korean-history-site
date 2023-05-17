document
    .getElementById("compare-btn")
    .addEventListener("click", () => {
        var inputText = document.getElementById("input-text").value;
        var cookieText = decodeURI(getCookie("keyword"));

        if (inputText === cookieText) {
            document.getElementById("result").textContent =
                "정답입니다!";
        } else {
            document.getElementById("result").textContent =
                "오답입니다! \n" +
                '정답은 "' +
                cookieText +
                '"입니다!';
        }

        document.getElementById("input-text").style.display =
            "none";
        document.getElementById("quiz-text").style.display = "none";
        document.getElementById("compare-btn").style.display =
            "none";
        document.getElementById("result").style.display = "block";

        setTimeout(() => {
            window.location.reload();
        }, 1000);
});

const getCookie = (name) => {
    var cookies = document.cookie.split("; ");
    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i].split("=");
        if (cookie[0] === name) {
            return cookie[1];
        }
    }
    return "";
};