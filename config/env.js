const ENV = {
    dev: {
        apiUrl: "http://192.168.1.46:8001",
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
