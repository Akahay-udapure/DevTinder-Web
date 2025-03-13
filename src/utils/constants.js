//for production
// export const BASE_URL = "/api/";

//for dev
export const BASE_URL =
    location.hostname === "localhost" ? "http://localhost:4500/" : "/api/";
