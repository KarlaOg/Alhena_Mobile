let localURL = 'http://192.168.1.36:8080';
export let facebookEnv = 563205851125665;
const ENV = {
    dev: {
        apiUrl: localURL,
        amplitudeApiKey: null,
    },
    prod: {
        apiUrl: "https://pacaud-lilian.com/serverpfe",
        amplitudeApiKey: null,
        // Add other keys you want here
    }
};
let conf = "dev";
const getEnvVars = (env = conf) => {
    return env === "dev" ? ENV.dev : ENV.prod;
};

export default getEnvVars;
