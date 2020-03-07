export const getCookie = (cookie_name) => {
    let token_string = cookie_name + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(";");
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == " ") {
            c = c.substring(1);
        }
        if (c.indexOf(token_string) == 0) {
            return c.substring(token_string.length, c.length);
        }
    }
    return "";
}
/*
    <a href="google.com">
      <h3 class="activity-title">Morning run</h3>
      <p>
        <span>3.46km</span>
        <span>6:20/km</span>
        <span>21min 59sec</span>
      </p>
    </a>
*/