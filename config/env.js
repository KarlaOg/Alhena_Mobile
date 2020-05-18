let localURL = 'http://192.168.186.1:8000';
export let facebookEnv = 563205851125665;
const ENV = {
    dev: {
        apiUrl: "http://192.168.1.46:8001",
        deepLink: "exp://192.168.1.46:19000/--",
        amplitudeApiKey: null,
    },
    prod: {
        apiUrl: "https://pacaud-lilian.com/serverpfe",
        deepLink: "exp://192.168.1.46:19000/--",
        amplitudeApiKey: null,
        // Add other keys you want here
    }
};
let conf = "dev";
const getEnvVars = (env = conf) => {
    return env === "dev" ? ENV.dev : ENV.prod;
};

export default getEnvVars;
