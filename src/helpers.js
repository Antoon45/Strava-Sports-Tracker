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

export const setCookie = (access_token, refresh_token, expires_at, athlete_id) => {
    document.cookie = "access-token" + "=" + access_token + "; expires=" + expires_at;
    document.cookie = "refresh-token" + "=" + refresh_token;
    document.cookie = "athlete-id" + "=" + athlete_id;
}

export const calcDistance = (distanceInMeters) => { // Converts meters into km
    if (distanceInMeters !== 0) {
        return (((distanceInMeters / 1000) * 100) / 100).toFixed(2);
    } else {
        distanceInMeters = 0;
        return distanceInMeters;
    }
}

export const calcMinutesPerKilometer = (time, distance) => {
    console.log(time, distance)
    let minutesPerKilometer = (time / 60) / (distance / 1000);
    return (minutesPerKilometer).toFixed(2);
}