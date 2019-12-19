#ALHENA Application
####Welcome to the Alhena react native application

Clone the directory:
```
git clone git@github.com:KarlaOg/pfeMobile.git
```

When you have the directory run:
```
cd Alhena_mobile
npm install
```

Make sure you have expo, Check tuto here:
https://docs.expo.io/versions/v36.0.0/get-started/installation/


If expo is ok run it:
```
expo start
```

##For a locally usage:

Don't forget to install the **Symfony API** here:
https://github.com/hanva/Alhena_Api

And change `env.js` file with your API IP:
```
...
 dev: {
    apiUrl: "http://MyIP:MyHost",
    amplitudeApiKey: null,
 },
...
```
**Warning** You need to have the same IP on your Symfony and your phone

##For a production usage:
Just change `env.js`:
```
...
prod: {
    apiUrl: "yourLink",
    amplitudeApiKey: null,
}
...
```

---
####Alhena Application is now working !!