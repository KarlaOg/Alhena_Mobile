let localURL = 'http://10.38.163.164:5555';
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
