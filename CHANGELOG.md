# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [1.2.2](https://github.com/equinor/sepes-web/compare/1.2.1...1.2.2) (2022-01-26)


### Bug Fixes

* **study:** fix long loading screen ([f84da54](https://github.com/equinor/sepes-web/commit/f84da5456e437c997b3b48c4b1f6e503830d1e2e)), closes [#1464](https://github.com/equinor/sepes-web/issues/1464)
* **study:** fix long loading screen ([0f4e887](https://github.com/equinor/sepes-web/commit/0f4e887d38b6bd105d5ab34e2413bf5605c76beb)), closes [#1464](https://github.com/equinor/sepes-web/issues/1464)
* upgrade @types/node from 16.11.17 to 16.11.18 ([239073f](https://github.com/equinor/sepes-web/commit/239073f4c420d0ed0b78b3cae1e489124ca10ee8))

### [1.2.1](https://github.com/equinor/sepes-web/compare/1.2.0...1.2.1) (2022-01-25)

## [1.2.0](https://github.com/equinor/sepes-web/compare/1.1.3...1.2.0) (2022-01-25)


### Features

* add redux toolkit ([958d74f](https://github.com/equinor/sepes-web/commit/958d74ff2a99f4090b538a1439afa783afb85a21)), closes [#1474](https://github.com/equinor/sepes-web/issues/1474)
* add sorting and pagination to participant table ([#1389](https://github.com/equinor/sepes-web/issues/1389)) ([7d4686d](https://github.com/equinor/sepes-web/commit/7d4686d191d14aa7c234cfb0778dcfc6b3a7b256)), closes [#1387](https://github.com/equinor/sepes-web/issues/1387)
* display current roles in top bar ([6d4d5ea](https://github.com/equinor/sepes-web/commit/6d4d5eafc62d522d05b6f8705aeb78eb9e21e28a))
* **study:** be able to sort data set list by column ([#1475](https://github.com/equinor/sepes-web/issues/1475)) ([4474b3f](https://github.com/equinor/sepes-web/commit/4474b3f2a093ba939c345a22fadb8809f0393ba7)), closes [#1465](https://github.com/equinor/sepes-web/issues/1465)
* **study:** be able to sort sandbox list by column ([#1479](https://github.com/equinor/sepes-web/issues/1479)) ([af2bd7d](https://github.com/equinor/sepes-web/commit/af2bd7df6a0cab2c9a78e2877cdeb7e235c6acc2)), closes [#1466](https://github.com/equinor/sepes-web/issues/1466)
* support delete file in folder view ([#1456](https://github.com/equinor/sepes-web/issues/1456)) ([79ba7af](https://github.com/equinor/sepes-web/commit/79ba7af1b864fd22d5346a0926979e914de20a85))


### Bug Fixes

* add rate limit ([1604cd9](https://github.com/equinor/sepes-web/commit/1604cd9d87d31929b84f1e93922d0576e5341e59)), closes [#1469](https://github.com/equinor/sepes-web/issues/1469)
* add rate limiting ([41f4488](https://github.com/equinor/sepes-web/commit/41f44881a754fc9ab393221d2c37d9089f3fb2b4)), closes [#1469](https://github.com/equinor/sepes-web/issues/1469)
* **dataset:** fix name validation ([382d4c7](https://github.com/equinor/sepes-web/commit/382d4c7bcb022a33a64fb94490cf92ca880e07f8)), closes [#1461](https://github.com/equinor/sepes-web/issues/1461)
* **dataset:** fix navigation to dataset page ([ea76d58](https://github.com/equinor/sepes-web/commit/ea76d58d6d04daccaa7c90535c65e77e6982fe11)), closes [#1478](https://github.com/equinor/sepes-web/issues/1478)
* deployment process ([#1421](https://github.com/equinor/sepes-web/issues/1421)) ([2f910b3](https://github.com/equinor/sepes-web/commit/2f910b3524bb594d04ed31e0650f899d0bd6c52f))
* display search tip with less than 3 characters ([2cc6e32](https://github.com/equinor/sepes-web/commit/2cc6e329fe4cb8d1c7805e73457837c0bc04d177)), closes [#1264](https://github.com/equinor/sepes-web/issues/1264)
* error cresting new a sandbox ([97a353f](https://github.com/equinor/sepes-web/commit/97a353f0726dc74adec450aea34bbd0fa6532886)), closes [#1526](https://github.com/equinor/sepes-web/issues/1526)
* instantly disable save study when typing in the wbs field ([#1472](https://github.com/equinor/sepes-web/issues/1472)) ([8485d0c](https://github.com/equinor/sepes-web/commit/8485d0c7c58c35f4d0b061d028ca8701fde0a12f)), closes [#1460](https://github.com/equinor/sepes-web/issues/1460)
* issue with deleting sandbox with unsaved changes ([874356d](https://github.com/equinor/sepes-web/commit/874356db6eb7b361fec0bf6616bc658b63c367b6)), closes [#1437](https://github.com/equinor/sepes-web/issues/1437)
* mock documentation test create study ([#1490](https://github.com/equinor/sepes-web/issues/1490)) ([0f73c8f](https://github.com/equinor/sepes-web/commit/0f73c8f4adfe1af5388127c1f0dbc556b896ff43))
* package.json & package-lock.json to reduce vulnerabilities ([7618b72](https://github.com/equinor/sepes-web/commit/7618b7245146f5e61393443c862c432a032f89d6))
* pagination fix and some refactor ([108b959](https://github.com/equinor/sepes-web/commit/108b959ff43fd40d49dc7f6d2d480ba5fd453979)), closes [#1478](https://github.com/equinor/sepes-web/issues/1478) [#1476](https://github.com/equinor/sepes-web/issues/1476)
* remove cypress-plugin-retries ([ec65f4c](https://github.com/equinor/sepes-web/commit/ec65f4cdf234dc2de410a0b27fc186bca1821a0f))
* remove interfering save shortcut ([#1480](https://github.com/equinor/sepes-web/issues/1480)) ([5fa5770](https://github.com/equinor/sepes-web/commit/5fa5770b21a32891f11178a27aafb214dcce26aa)), closes [#1458](https://github.com/equinor/sepes-web/issues/1458) [#1459](https://github.com/equinor/sepes-web/issues/1459)
* update rate limit to 6.2.0 ([#1524](https://github.com/equinor/sepes-web/issues/1524)) ([13c2e18](https://github.com/equinor/sepes-web/commit/13c2e18d40ce6778cd52b7f19ee0007e26cb9d2d))
* upgrade axios from 0.21.4 to 0.24.0 ([ddb6e8c](https://github.com/equinor/sepes-web/commit/ddb6e8caa0f38a695a3244ee660113ff72dd2130))
* upgrade eds to 0.17.0 ([4b9d62f](https://github.com/equinor/sepes-web/commit/4b9d62ffb9bb4348f36050def59e720be095ae5b))
* upgrade react-scripts to 5.0.0 ([#1401](https://github.com/equinor/sepes-web/issues/1401)) ([84c3b14](https://github.com/equinor/sepes-web/commit/84c3b1401916403e92416c49e20029f59a8267eb))
* upgrade sass-loader and node-sass ([#1412](https://github.com/equinor/sepes-web/issues/1412)) ([724cc3b](https://github.com/equinor/sepes-web/commit/724cc3b1c9be5aefc4fdf7757164eeb0cea26f33))
* validate data set names ([293980b](https://github.com/equinor/sepes-web/commit/293980b8da0b02564c3cbc2cfffbef7d1a91847a)), closes [#1384](https://github.com/equinor/sepes-web/issues/1384)

### [1.1.3](https://github.com/equinor/sepes-web/compare/1.1.2...1.1.3) (2022-01-06)

### [1.1.2](https://github.com/equinor/sepes-web/compare/1.1.1...1.1.2) (2021-12-27)

### [1.1.1](https://github.com/equinor/sepes-web/compare/1.1.0...1.1.1) (2021-12-27)

## [1.1.0](https://github.com/equinor/sepes-web/compare/1.0.4...1.1.0) (2021-12-10)


### Features

* add link to documentation ([0b59469](https://github.com/equinor/sepes-web/commit/0b59469bf7d05accc01472df54e9084d5bf8174d)), closes [#1379](https://github.com/equinor/sepes-web/issues/1379)


### Bug Fixes

* new study bottom margin ([#1375](https://github.com/equinor/sepes-web/issues/1375)) ([89d9c80](https://github.com/equinor/sepes-web/commit/89d9c80432073ef3c070337769bfdfbd2f01362f))
* remove github secret action causing error ([#1376](https://github.com/equinor/sepes-web/issues/1376)) ([82e597c](https://github.com/equinor/sepes-web/commit/82e597c6ca900e5c267eec70f6db7b8b04cd860c))
* upgrade EDS to 0.16.1 ([c434b90](https://github.com/equinor/sepes-web/commit/c434b905ebefd0eea9e371e7283ec3f4a7d007d4))

### [1.0.4](https://github.com/equinor/sepes-web/compare/1.0.3...1.0.4) (2021-12-07)


### Bug Fixes

* add tooltip for create vm when it is in progress ([c3b9c49](https://github.com/equinor/sepes-web/commit/c3b9c493be7bc8a0f5f4cc8a040b997d60d91d97)), closes [#1323](https://github.com/equinor/sepes-web/issues/1323)
* clicking on breadcrum for dataset/sandbox name would redirect to main page ([94db76e](https://github.com/equinor/sepes-web/commit/94db76ec83ccc2ecbbb34a94f3cfff258314c8cd)), closes [#1348](https://github.com/equinor/sepes-web/issues/1348) [#1347](https://github.com/equinor/sepes-web/issues/1347)
* upgrade @types/react from 17.0.19 to 17.0.20 ([b3116f9](https://github.com/equinor/sepes-web/commit/b3116f970980c58f27daa43dce648f9bc8734e56))
* upgrade @types/styled-components from 5.1.13 to 5.1.14 ([#1353](https://github.com/equinor/sepes-web/issues/1353)) ([0c7af2d](https://github.com/equinor/sepes-web/commit/0c7af2de633ce8b366eb81f1a27e1785b379262b))
* upgrade EDS to 0.14.3 ([54aaf9a](https://github.com/equinor/sepes-web/commit/54aaf9a1061e18a3e200a54e31be58175b793a43))
* upgrade react-copy-to-clipboard from 5.0.3 to 5.0.4 ([#1351](https://github.com/equinor/sepes-web/issues/1351)) ([ca76484](https://github.com/equinor/sepes-web/commit/ca764845d607a1da74ad5539a55589e198366fd1))
* upgrade react-router-dom from 5.2.0 to 5.2.1 ([#1352](https://github.com/equinor/sepes-web/issues/1352)) ([dfd57e0](https://github.com/equinor/sepes-web/commit/dfd57e070d5b30a9995c30f73a7c4b068c83fad3))

### [1.0.3](https://github.com/equinor/sepes-web/compare/1.0.2...1.0.3) (2021-09-23)


### Bug Fixes

* **dataset:** add tooltip to create/save button ([acf9a1e](https://github.com/equinor/sepes-web/commit/acf9a1e4e090b8a380910f1fdc3aa3d1bce8c3f8)), closes [#1305](https://github.com/equinor/sepes-web/issues/1305)
* **dataset:** disable create button if name is taken ([#1332](https://github.com/equinor/sepes-web/issues/1332)) ([5dad77e](https://github.com/equinor/sepes-web/commit/5dad77ee3c2557731486166b4cfbaef4074a2596)), closes [#1326](https://github.com/equinor/sepes-web/issues/1326)
* disable create sandbox when sanbox name exists ([#1325](https://github.com/equinor/sepes-web/issues/1325)) ([b685964](https://github.com/equinor/sepes-web/commit/b6859646de784d7462d00c83c0a5a2a80e4404d2)), closes [#1316](https://github.com/equinor/sepes-web/issues/1316)
* disable create vm if name already is in use ([#1327](https://github.com/equinor/sepes-web/issues/1327)) ([9e99c2c](https://github.com/equinor/sepes-web/commit/9e99c2c7a8783dfbe06d2ea75693a429c2035962)), closes [#1317](https://github.com/equinor/sepes-web/issues/1317)
* issue with deleting vm with enter button ([#1324](https://github.com/equinor/sepes-web/issues/1324)) ([f33c3ff](https://github.com/equinor/sepes-web/commit/f33c3ff92ed440f28cff86012835c91ddcf1827b)), closes [#1322](https://github.com/equinor/sepes-web/issues/1322)
* package.json & package-lock.json to reduce vulnerabilities ([#1315](https://github.com/equinor/sepes-web/issues/1315)) ([67c0849](https://github.com/equinor/sepes-web/commit/67c08497499f849572191bb935a9f8a277eddc7e))
* **sandbox:** os search issue ([#1321](https://github.com/equinor/sepes-web/issues/1321)) ([dafe0f3](https://github.com/equinor/sepes-web/commit/dafe0f34560ae717efef94729d9f173e8abe1e54)), closes [#1314](https://github.com/equinor/sepes-web/issues/1314)
* **study:** add tooltip for not all required fields filled ([2585142](https://github.com/equinor/sepes-web/commit/2585142656837360a23cc43cb161f688d8751ac6)), closes [#1306](https://github.com/equinor/sepes-web/issues/1306)
* update testing-library jest-dom ([#1336](https://github.com/equinor/sepes-web/issues/1336)) ([3867fb2](https://github.com/equinor/sepes-web/commit/3867fb2f9459124bbb0249f71d03906c5d148e6f))
* upgrade @types/node from 16.6.1 to 16.7.10 ([#1338](https://github.com/equinor/sepes-web/issues/1338)) ([858222e](https://github.com/equinor/sepes-web/commit/858222ef2a5f496372e5011e0ae7eb124c3e9112))
* upgrade @types/react from 17.0.17 to 17.0.18 ([#1293](https://github.com/equinor/sepes-web/issues/1293)) ([059dfda](https://github.com/equinor/sepes-web/commit/059dfdabe6c858cc42e6807b3dd9e827fda9ac14))
* upgrade @types/react from 17.0.18 to 17.0.19 ([#1343](https://github.com/equinor/sepes-web/issues/1343)) ([684e07c](https://github.com/equinor/sepes-web/commit/684e07c3001f569c69d4f96905cbf6cda126dd9e))
* upgrade @types/styled-components from 5.1.12 to 5.1.13 ([#1344](https://github.com/equinor/sepes-web/issues/1344)) ([458f3e3](https://github.com/equinor/sepes-web/commit/458f3e3e61160bb7892dd25d41927bc935a8480f))
* upgrade @typescript-eslint/eslint-plugin from 4.29.2 to 4.30.0 ([#1337](https://github.com/equinor/sepes-web/issues/1337)) ([42b46ba](https://github.com/equinor/sepes-web/commit/42b46ba37dc3f95a3255d8a98ec1fc927a3ef3f8))
* upgrade @typescript-eslint/parser from 4.29.3 to 4.30.0 ([#1341](https://github.com/equinor/sepes-web/issues/1341)) ([adaa062](https://github.com/equinor/sepes-web/commit/adaa062a450851baa9c07f4d646b057c02cdbb45))
* upgrade browser-image-compression from 1.0.14 to 1.0.15 ([#1287](https://github.com/equinor/sepes-web/issues/1287)) ([4a69b02](https://github.com/equinor/sepes-web/commit/4a69b022c7b8b1d1bb79709f8d4622cb01386d1f))
* upgrade styled-components from 5.3.0 to 5.3.1 ([#1342](https://github.com/equinor/sepes-web/issues/1342)) ([4d30352](https://github.com/equinor/sepes-web/commit/4d3035272e77534571b32ba8c86c91c6c40ab630))

### [1.0.2](https://github.com/equinor/sepes-web/compare/1.0.1...1.0.2) (2021-09-16)


### Bug Fixes

* allow users to confirm navigation with enter/escape buttons ([#1280](https://github.com/equinor/sepes-web/issues/1280)) ([7236fa5](https://github.com/equinor/sepes-web/commit/7236fa552584a5635333699f4923559d2ba051f0)), closes [#1271](https://github.com/equinor/sepes-web/issues/1271)
* display prompt if user leaves page when request is in progress ([#1245](https://github.com/equinor/sepes-web/issues/1245)) ([e776026](https://github.com/equinor/sepes-web/commit/e776026fdd7c16ab3f30c6ce8f440cbba330f1b6)), closes [#1032](https://github.com/equinor/sepes-web/issues/1032)
* issue with dataset file progress bar ([#1261](https://github.com/equinor/sepes-web/issues/1261)) ([f5780bf](https://github.com/equinor/sepes-web/commit/f5780bfaadb93e20f0ef94aaf060b52bbb58871b)), closes [#1258](https://github.com/equinor/sepes-web/issues/1258)
* issue with wbs input ([#1282](https://github.com/equinor/sepes-web/issues/1282)) ([ccd4dc5](https://github.com/equinor/sepes-web/commit/ccd4dc52ea2667da8cccddd5f55dc3a7b4ebb2f8))
* package.json & package-lock.json to reduce vulnerabilities ([#1267](https://github.com/equinor/sepes-web/issues/1267)) ([34e8f72](https://github.com/equinor/sepes-web/commit/34e8f7265d80e30fdf1c600a3ef93cad41ef4799))
* package.json & package-lock.json to reduce vulnerabilities ([#1294](https://github.com/equinor/sepes-web/issues/1294)) ([829c529](https://github.com/equinor/sepes-web/commit/829c5296aa3a78aa4b6a75ea0f144a127126c935))
* remove dependency to is-svg with security issue ([#1249](https://github.com/equinor/sepes-web/issues/1249)) ([13c7d5f](https://github.com/equinor/sepes-web/commit/13c7d5f236861d377209a86b8f85ed4024b1f615))
* tooltip for participant role did not display ([#1291](https://github.com/equinor/sepes-web/issues/1291)) ([518b4c0](https://github.com/equinor/sepes-web/commit/518b4c005037f41072fb225e8e7b9e0aa0869174)), closes [#1265](https://github.com/equinor/sepes-web/issues/1265)
* unsaved vm rules still showes when exiting and reentering a sandbox ([#1242](https://github.com/equinor/sepes-web/issues/1242)) ([6ad322e](https://github.com/equinor/sepes-web/commit/6ad322ec2846803b3d4473d34497783f1d16db9a)), closes [#1241](https://github.com/equinor/sepes-web/issues/1241)
* update css-what ([#1250](https://github.com/equinor/sepes-web/issues/1250)) ([e11c27e](https://github.com/equinor/sepes-web/commit/e11c27e2d8621feaca1f93e2318308bc43fdb46c))
* update postcss package ([#1251](https://github.com/equinor/sepes-web/issues/1251)) ([9a5d11f](https://github.com/equinor/sepes-web/commit/9a5d11f74c41e16dc6b76454ae8426b5bbbd5f1b))
* upgrade @azure/msal-browser from 2.16.0 to 2.16.1 ([#1246](https://github.com/equinor/sepes-web/issues/1246)) ([814f73a](https://github.com/equinor/sepes-web/commit/814f73acab1e6c597f1f49403ac492d7593b6088))
* upgrade @azure/storage-blob from 12.6.0 to 12.7.0 ([fb3ee47](https://github.com/equinor/sepes-web/commit/fb3ee4719175b0bdd6874c3354ccdb9501961dc9))
* upgrade @fortawesome/fontawesome-free from 5.15.3 to 5.15.4 ([#1255](https://github.com/equinor/sepes-web/issues/1255)) ([9968a58](https://github.com/equinor/sepes-web/commit/9968a588f9b80d3c3138996966b3c1644775f268))
* upgrade @fortawesome/react-fontawesome from 0.1.14 to 0.1.15 ([#1247](https://github.com/equinor/sepes-web/issues/1247)) ([d5149c7](https://github.com/equinor/sepes-web/commit/d5149c7c58ae746d418d72d493004be5f90e57bd))
* upgrade @microsoft/applicationinsights-web from 2.6.4 to 2.6.5 ([#1248](https://github.com/equinor/sepes-web/issues/1248)) ([100a30d](https://github.com/equinor/sepes-web/commit/100a30d20cfccc8bcc4ed3f48ad5f30a5ec87e33))
* upgrade @types/node from 16.4.10 to 16.4.12 ([#1253](https://github.com/equinor/sepes-web/issues/1253)) ([43662c7](https://github.com/equinor/sepes-web/commit/43662c743bbd653b32ddfbb35a2a9edc22dfdb77))
* upgrade @types/node from 16.4.12 to 16.4.13 ([#1262](https://github.com/equinor/sepes-web/issues/1262)) ([4f2fae4](https://github.com/equinor/sepes-web/commit/4f2fae4f86402bbd8022dd062678853f87929ca3))
* upgrade @types/node from 16.4.13 to 16.6.1 ([#1285](https://github.com/equinor/sepes-web/issues/1285)) ([e604ecc](https://github.com/equinor/sepes-web/commit/e604eccc100e212b337b646869cbe6ce87a4de9b))
* upgrade @types/react from 17.0.15 to 17.0.16 ([#1268](https://github.com/equinor/sepes-web/issues/1268)) ([52ba1f2](https://github.com/equinor/sepes-web/commit/52ba1f2bc76401fac0fe4fbd6530490fa817d798))
* upgrade @types/react from 17.0.16 to 17.0.17 ([#1279](https://github.com/equinor/sepes-web/issues/1279)) ([14251ce](https://github.com/equinor/sepes-web/commit/14251ce75df2fcde29ab1c92a36c0d63fdadfc1a))
* upgrade @types/styled-components from 5.1.11 to 5.1.12 ([#1256](https://github.com/equinor/sepes-web/issues/1256)) ([d6dc5bb](https://github.com/equinor/sepes-web/commit/d6dc5bbee20e8630a786f35992510c8e0aa1ddcb))
* upgrade @typescript-eslint/eslint-plugin from 4.29.0 to 4.29.1 ([#1275](https://github.com/equinor/sepes-web/issues/1275)) ([481c581](https://github.com/equinor/sepes-web/commit/481c5818401940c961d8b11424d3cf2e7110d2d3))
* upgrade @typescript-eslint/eslint-plugin from 4.29.1 to 4.29.2 ([#1300](https://github.com/equinor/sepes-web/issues/1300)) ([40270e0](https://github.com/equinor/sepes-web/commit/40270e04ed4fdbca588eb25e882e1e8a9c1d9cdb))
* upgrade @typescript-eslint/parser from 4.29.0 to 4.29.1 ([#1274](https://github.com/equinor/sepes-web/issues/1274)) ([49be420](https://github.com/equinor/sepes-web/commit/49be4203aee249616825da4e02587e5764fb3955))
* upgrade @typescript-eslint/parser from 4.29.1 to 4.29.2 ([#1299](https://github.com/equinor/sepes-web/issues/1299)) ([ceaba04](https://github.com/equinor/sepes-web/commit/ceaba04eb28def9dc2339c2a803ea5ec7e2712f4))
* upgrade @typescript-eslint/parser from 4.29.2 to 4.29.3 ([#1310](https://github.com/equinor/sepes-web/issues/1310)) ([3206fbc](https://github.com/equinor/sepes-web/commit/3206fbcfdb410549ac928f4b3dc7eb89f4539f6d))
* upgrade lodash version to fix security issue ([#1292](https://github.com/equinor/sepes-web/issues/1292)) ([a29c406](https://github.com/equinor/sepes-web/commit/a29c40645f6f4e9e23c8b5c5de18a1bbca40dfbb)), closes [#1284](https://github.com/equinor/sepes-web/issues/1284)
* upgrade multiple dependencies with Snyk ([#1254](https://github.com/equinor/sepes-web/issues/1254)) ([7024fad](https://github.com/equinor/sepes-web/commit/7024fad6c17b47e1422cdb08609f737d87860bfc))
* upgrade react-dnd-html5-backend from 14.0.0 to 14.0.1 ([#1286](https://github.com/equinor/sepes-web/issues/1286)) ([e04682a](https://github.com/equinor/sepes-web/commit/e04682aea12f8b2fd1527675ba66518523cf2011))

### [1.0.1](https://github.com/equinor/sepes-web/compare/0.1.35...1.0.1) (2021-08-25)

### [0.1.35](https://github.com/equinor/sepes-web/compare/0.1.34...0.1.35) (2021-08-25)

### [0.1.34](https://github.com/equinor/sepes-web/compare/0.1.33...0.1.34) (2021-08-24)

### [0.1.33](https://github.com/equinor/sepes-web/compare/0.1.32...0.1.33) (2021-08-24)


### Bug Fixes

* **dataset:** remove file button circle went outside of component ([#1229](https://github.com/equinor/sepes-web/issues/1229)) ([cabd0b7](https://github.com/equinor/sepes-web/commit/cabd0b7ac3bf59bae4ad5dbcb0cb63e9dbbb89ca)), closes [#1223](https://github.com/equinor/sepes-web/issues/1223)
* issue with prompt ([#1234](https://github.com/equinor/sepes-web/issues/1234)) ([6bcb2bb](https://github.com/equinor/sepes-web/commit/6bcb2bba1f5047d5b4d9f50ea2aefedca3d966f9)), closes [#1216](https://github.com/equinor/sepes-web/issues/1216) [#1233](https://github.com/equinor/sepes-web/issues/1233)
* issues caused by missing nullcheck in a component ([#1239](https://github.com/equinor/sepes-web/issues/1239)) ([8b28b0e](https://github.com/equinor/sepes-web/commit/8b28b0e1d1dad58afd722e6f33b3331a94e3eb58))
* keep vm input when changing tabs ([#1221](https://github.com/equinor/sepes-web/issues/1221)) ([ddc29c7](https://github.com/equinor/sepes-web/commit/ddc29c79d4db8af0552f951115385bbf754015fc)), closes [#1211](https://github.com/equinor/sepes-web/issues/1211)
* **sandbox:** add prompt for unsaved changes ([#1213](https://github.com/equinor/sepes-web/issues/1213)) ([49f5566](https://github.com/equinor/sepes-web/commit/49f556684f179d5e58562909dff2512e93267ec1)), closes [#1209](https://github.com/equinor/sepes-web/issues/1209)
* **sandbox:** make available ui bug ([#1224](https://github.com/equinor/sepes-web/issues/1224)) ([ce9fd5b](https://github.com/equinor/sepes-web/commit/ce9fd5b58936a77c864ce243dd7d1aac2845a794)), closes [#1220](https://github.com/equinor/sepes-web/issues/1220)
* stop disabeling create button with invalid vm name ([#1235](https://github.com/equinor/sepes-web/issues/1235)) ([5151c71](https://github.com/equinor/sepes-web/commit/5151c71ce2f090125236cf8fc4bdb6f7fb843504)), closes [#1230](https://github.com/equinor/sepes-web/issues/1230)
* truncate values when they exceed a specific limit ([#1226](https://github.com/equinor/sepes-web/issues/1226)) ([e93f4db](https://github.com/equinor/sepes-web/commit/e93f4db2ffe1d74072ae67d066c55e810252c029))
* upgrade @material-ui/core from 4.12.2 to 4.12.3 ([#1232](https://github.com/equinor/sepes-web/issues/1232)) ([d81e063](https://github.com/equinor/sepes-web/commit/d81e06379567ae3a55b61ca0661e9bf6d786b49c))
* upgrade @typescript-eslint/eslint-plugin from 4.28.5 to 4.29.0 ([#1237](https://github.com/equinor/sepes-web/issues/1237)) ([5f5a5f9](https://github.com/equinor/sepes-web/commit/5f5a5f920a0dbce10edc877d216a2b6756c946e9))
* upgrade @typescript-eslint/parser from 4.28.5 to 4.29.0 ([#1236](https://github.com/equinor/sepes-web/issues/1236)) ([d34218f](https://github.com/equinor/sepes-web/commit/d34218fad8e043ddae012893f6a10766f4c0c517))

### [0.1.32](https://github.com/equinor/sepes-web/compare/0.1.31...0.1.32) (2021-08-20)

### [0.1.31](https://github.com/equinor/sepes-web/compare/0.1.30...0.1.31) (2021-08-18)


### Features

* add extra filter for os ([#1199](https://github.com/equinor/sepes-web/issues/1199)) ([2069f0d](https://github.com/equinor/sepes-web/commit/2069f0d5734a5191ef13260a3dd1619948044b3b)), closes [#1198](https://github.com/equinor/sepes-web/issues/1198)


### Bug Fixes

* center costanalysis link ([#1218](https://github.com/equinor/sepes-web/issues/1218)) ([940698b](https://github.com/equinor/sepes-web/commit/940698bf142979326e6bcc362db607abf32b2825)), closes [#1215](https://github.com/equinor/sepes-web/issues/1215)
* **dataset:** tooltip for storage account status did not display ([#1180](https://github.com/equinor/sepes-web/issues/1180)) ([02304a2](https://github.com/equinor/sepes-web/commit/02304a26cf6b002e2e9a8e5d593ec464f7ab7109)), closes [#1155](https://github.com/equinor/sepes-web/issues/1155)
* disable resize of results and learnings textfield ([#1174](https://github.com/equinor/sepes-web/issues/1174)) ([822ec24](https://github.com/equinor/sepes-web/commit/822ec241290460a5466026637e73f73968d89584)), closes [#1154](https://github.com/equinor/sepes-web/issues/1154)
* go back button on general error page did not reload page ([#1206](https://github.com/equinor/sepes-web/issues/1206)) ([9d4231d](https://github.com/equinor/sepes-web/commit/9d4231d775ed5e0516305d8a44f938fd5363f110)), closes [#1197](https://github.com/equinor/sepes-web/issues/1197)
* issue with adding a dataID to a dataset ([#1192](https://github.com/equinor/sepes-web/issues/1192)) ([f2bf65a](https://github.com/equinor/sepes-web/commit/f2bf65a0e580d540b02786c51b370cadd49303e1))
* issue with disabled save button on vm rules ([#1217](https://github.com/equinor/sepes-web/issues/1217)) ([6425de8](https://github.com/equinor/sepes-web/commit/6425de83860722a2be0e74edd3c60e45ecdd35d5)), closes [#1212](https://github.com/equinor/sepes-web/issues/1212)
* issue with displaying correct info when api is not reacheable ([#1193](https://github.com/equinor/sepes-web/issues/1193)) ([3ffe65d](https://github.com/equinor/sepes-web/commit/3ffe65d53c662ca537ce9cba86d3c9ea890eee20)), closes [#1191](https://github.com/equinor/sepes-web/issues/1191)
* release notes tabs have now fixed position ([45a022f](https://github.com/equinor/sepes-web/commit/45a022f6d1d4026637e90ab58bb36fc5ba71e077)), closes [#957](https://github.com/equinor/sepes-web/issues/957)
* run docker container as non-root ([#1170](https://github.com/equinor/sepes-web/issues/1170)) ([e3175f3](https://github.com/equinor/sepes-web/commit/e3175f3e9a7785521c3aa06fb07854b3a0ee2773))
* **study:** align some margins on edit mode ([#1173](https://github.com/equinor/sepes-web/issues/1173)) ([4286da0](https://github.com/equinor/sepes-web/commit/4286da0eef7c184b557d154ad184e4e2a9622405)), closes [#1147](https://github.com/equinor/sepes-web/issues/1147)
* update node and node-sass ([#1169](https://github.com/equinor/sepes-web/issues/1169)) ([c0eeebe](https://github.com/equinor/sepes-web/commit/c0eeebeb7ecc00ffd085786846098c1e4fbaf5ab))
* upgrade @azure/msal-browser from 2.15.0 to 2.16.0 ([#1203](https://github.com/equinor/sepes-web/issues/1203)) ([aef7092](https://github.com/equinor/sepes-web/commit/aef7092dbf78448db415082af18198bd0c6ea78f))
* upgrade @material-ui/core from 4.12.1 to 4.12.2 ([#1190](https://github.com/equinor/sepes-web/issues/1190)) ([57bd542](https://github.com/equinor/sepes-web/commit/57bd542c412819909d14c2c7d1117bd4c99b091d))
* upgrade @types/react from 17.0.14 to 17.0.15 ([#1205](https://github.com/equinor/sepes-web/issues/1205)) ([4f1bdf1](https://github.com/equinor/sepes-web/commit/4f1bdf1b13c6dbceb231350dd6b8a6ffaa3ab6ac))
* upgrade @typescript-eslint/eslint-plugin from 4.28.2 to 4.28.3 ([cd33ffa](https://github.com/equinor/sepes-web/commit/cd33ffaa9537a1742cf94b87d3e30fcb33eb3c4d))
* upgrade @typescript-eslint/eslint-plugin from 4.28.3 to 4.28.4 ([#1188](https://github.com/equinor/sepes-web/issues/1188)) ([cee8cdc](https://github.com/equinor/sepes-web/commit/cee8cdcb3d29ee1c924019da66be77e2f08617b7))
* upgrade @typescript-eslint/eslint-plugin from 4.28.4 to 4.28.5 ([#1208](https://github.com/equinor/sepes-web/issues/1208)) ([d5f74ab](https://github.com/equinor/sepes-web/commit/d5f74ab68fc02b8b656eff12b0f690df9bebf688))
* upgrade @typescript-eslint/parser from 4.28.2 to 4.28.3 ([#1161](https://github.com/equinor/sepes-web/issues/1161)) ([4a43757](https://github.com/equinor/sepes-web/commit/4a43757759f50d8e3c2ca5b621f1acb136db4f0c))
* upgrade @typescript-eslint/parser from 4.28.3 to 4.28.4 ([#1189](https://github.com/equinor/sepes-web/issues/1189)) ([32a4387](https://github.com/equinor/sepes-web/commit/32a4387c74370db545e51f716623bb7ddb6c1935))
* upgrade @typescript-eslint/parser from 4.28.4 to 4.28.5 ([#1207](https://github.com/equinor/sepes-web/issues/1207)) ([024bd7d](https://github.com/equinor/sepes-web/commit/024bd7d38b03673aad1d90a25c839a5681036e6e))
* upgrade react-keyed-file-browser from 1.12.1 to 1.13.1 ([#1202](https://github.com/equinor/sepes-web/issues/1202)) ([1ea0c90](https://github.com/equinor/sepes-web/commit/1ea0c90818dfb7a54ca2dd1fd14ea473bfcb75dd))

### [0.1.30](https://github.com/equinor/sepes-web/compare/0.1.29...0.1.30) (2021-08-02)


### Features

* **vm:** searchable os and size field ([#1122](https://github.com/equinor/sepes-web/issues/1122)) ([a7f5147](https://github.com/equinor/sepes-web/commit/a7f51478444bb0cf41f330a44a8a0cfcf3ae93d7))


### Bug Fixes

* add helpertext when typing long inputs ([#1153](https://github.com/equinor/sepes-web/issues/1153)) ([a59a705](https://github.com/equinor/sepes-web/commit/a59a705147fcc8656ac0dbe6ee2fecf8717e0bea)), closes [#1148](https://github.com/equinor/sepes-web/issues/1148)
* add navigation breadcrumbs sandbox datasets ([#1156](https://github.com/equinor/sepes-web/issues/1156)) ([738ea78](https://github.com/equinor/sepes-web/commit/738ea78e29ab0dc804b023db88316673739ba3ab)), closes [#154](https://github.com/equinor/sepes-web/issues/154)
* issue with validate wbs ([#1100](https://github.com/equinor/sepes-web/issues/1100)) ([4f704d3](https://github.com/equinor/sepes-web/commit/4f704d34cf9621d2ccba64e51a6f3fcaf6371c99))
* ran unnecessary validation of wbs on save ([a037caf](https://github.com/equinor/sepes-web/commit/a037caf48c5f11117f8e0a2da7589d515e801914)), closes [#1085](https://github.com/equinor/sepes-web/issues/1085)
* remove horizontal scrollar on resource overview ([#1145](https://github.com/equinor/sepes-web/issues/1145)) ([aba4ce8](https://github.com/equinor/sepes-web/commit/aba4ce85e7c15f888ac96f4d65ca0a1ce47c6d0b)), closes [#1136](https://github.com/equinor/sepes-web/issues/1136)
* **sandbox:** add new queue icon for resources ([#1123](https://github.com/equinor/sepes-web/issues/1123)) ([4e406c0](https://github.com/equinor/sepes-web/commit/4e406c07146681d2a90b123783f92eeddf4c33cd)), closes [#1121](https://github.com/equinor/sepes-web/issues/1121)
* **study:** disable create sandbox and dataset when saving study ([#1143](https://github.com/equinor/sepes-web/issues/1143)) ([75afc73](https://github.com/equinor/sepes-web/commit/75afc73ecdcdfa25ea0da2cd8540abeb9fb6fc3a)), closes [#1097](https://github.com/equinor/sepes-web/issues/1097)
* tooltip for loading icon when validating wbs ([#1146](https://github.com/equinor/sepes-web/issues/1146)) ([19ca4d0](https://github.com/equinor/sepes-web/commit/19ca4d039fe1c6805e9aac6a3f9de4a596163587)), closes [#1116](https://github.com/equinor/sepes-web/issues/1116)
* update eds to 0.13.1 ([#1119](https://github.com/equinor/sepes-web/issues/1119)) ([81537b5](https://github.com/equinor/sepes-web/commit/81537b54f60ce1bcbfb55c44f3e487311b2c0a31)), closes [#1114](https://github.com/equinor/sepes-web/issues/1114)
* upgrade @azure/msal-browser from 2.14.2 to 2.15.0 ([#1130](https://github.com/equinor/sepes-web/issues/1130)) ([d372495](https://github.com/equinor/sepes-web/commit/d372495bdab81c0224727675e22606eb305681bd))
* upgrade @azure/storage-blob from 12.5.0 to 12.6.0 ([f43f7cb](https://github.com/equinor/sepes-web/commit/f43f7cbcebeb2507dcdf09a198f845e4ed74ed2f))
* upgrade @material-ui/core from 4.11.4 to 4.12.0 ([#1131](https://github.com/equinor/sepes-web/issues/1131)) ([cfe8b86](https://github.com/equinor/sepes-web/commit/cfe8b8607f368894ff15b44821019e59342d6012))
* upgrade @material-ui/core from 4.12.0 to 4.12.1 ([#1139](https://github.com/equinor/sepes-web/issues/1139)) ([9d9e8ec](https://github.com/equinor/sepes-web/commit/9d9e8ec897320f76ba732bdb0981f418fed83fbd))
* upgrade @microsoft/applicationinsights-web from 2.6.2 to 2.6.3 ([#1101](https://github.com/equinor/sepes-web/issues/1101)) ([61e2c35](https://github.com/equinor/sepes-web/commit/61e2c352546a1329b56c7c5d32912bb136611ef5))
* upgrade @microsoft/applicationinsights-web from 2.6.3 to 2.6.4 ([#1140](https://github.com/equinor/sepes-web/issues/1140)) ([0cbed3a](https://github.com/equinor/sepes-web/commit/0cbed3a97914b2ab3ef9010f13f7a07c641dce68))
* upgrade @types/node from 12.20.13 to 12.20.14 ([a802502](https://github.com/equinor/sepes-web/commit/a802502c77f34453d79e63a7f4814b7226dc90af))
* upgrade @types/node from 12.20.14 to 12.20.15 ([#1103](https://github.com/equinor/sepes-web/issues/1103)) ([9b0392d](https://github.com/equinor/sepes-web/commit/9b0392dbd6b028726d15559e9d6929a88e382c1c))
* upgrade @types/node from 12.20.15 to 12.20.16 ([#1151](https://github.com/equinor/sepes-web/issues/1151)) ([88a7081](https://github.com/equinor/sepes-web/commit/88a7081d737e444c6321da6f6bcb37c7ab1c4fc5))
* upgrade @types/react from 17.0.11 to 17.0.13 ([#1128](https://github.com/equinor/sepes-web/issues/1128)) ([09517a0](https://github.com/equinor/sepes-web/commit/09517a02bd4149e5e98cd6a2f42335201d5b0f94))
* upgrade @types/react from 17.0.13 to 17.0.14 ([#1142](https://github.com/equinor/sepes-web/issues/1142)) ([3fc51e5](https://github.com/equinor/sepes-web/commit/3fc51e519c241c88fd9612d8c1c69d01f4f404e9))
* upgrade @types/react from 17.0.9 to 17.0.11 ([#1093](https://github.com/equinor/sepes-web/issues/1093)) ([f4a8e3b](https://github.com/equinor/sepes-web/commit/f4a8e3b8b9a4b9915b246b79f04d0b2f9752613f))
* upgrade @types/react-dom from 17.0.5 to 17.0.6 ([#1062](https://github.com/equinor/sepes-web/issues/1062)) ([a72e7ff](https://github.com/equinor/sepes-web/commit/a72e7ff019734589f0355a20cf27505a30973aa0))
* upgrade @types/react-dom from 17.0.6 to 17.0.7 ([#1102](https://github.com/equinor/sepes-web/issues/1102)) ([9149082](https://github.com/equinor/sepes-web/commit/9149082e8b35f16c8bf9f891b1f5bf705fab261e))
* upgrade @types/react-dom from 17.0.7 to 17.0.8 ([#1132](https://github.com/equinor/sepes-web/issues/1132)) ([1fb3734](https://github.com/equinor/sepes-web/commit/1fb3734e4c7e558e9786e0c817d7c70e780dfdd3))
* upgrade @types/react-dom from 17.0.8 to 17.0.9 ([#1141](https://github.com/equinor/sepes-web/issues/1141)) ([7f680a2](https://github.com/equinor/sepes-web/commit/7f680a23324a5fc22146c1293610be5b9c660ae2))
* upgrade @types/react-router from 5.1.14 to 5.1.15 ([#1108](https://github.com/equinor/sepes-web/issues/1108)) ([2408767](https://github.com/equinor/sepes-web/commit/24087671d26bbfa7019647acd2e23e6c5d061a32))
* upgrade @types/react-router from 5.1.15 to 5.1.16 ([#1149](https://github.com/equinor/sepes-web/issues/1149)) ([b729162](https://github.com/equinor/sepes-web/commit/b7291620d13aacf3b54c5e4f1ccc399de8736d98))
* upgrade @types/react-router-dom from 5.1.7 to 5.1.8 ([#1150](https://github.com/equinor/sepes-web/issues/1150)) ([dd053fd](https://github.com/equinor/sepes-web/commit/dd053fd493aca92601683f1507dc67d0983bb07a))
* upgrade @types/styled-components from 5.1.10 to 5.1.11 ([#1133](https://github.com/equinor/sepes-web/issues/1133)) ([b44ee39](https://github.com/equinor/sepes-web/commit/b44ee396d8a682d5afbf01b03f31a102b381b0e8))
* upgrade @types/styled-components from 5.1.9 to 5.1.10 ([#1104](https://github.com/equinor/sepes-web/issues/1104)) ([7f49454](https://github.com/equinor/sepes-web/commit/7f494542d3e4bddeffafede65ea1d1058fc985f7))
* upgrade @typescript-eslint/eslint-plugin from 4.26.1 to 4.27.0 ([#1109](https://github.com/equinor/sepes-web/issues/1109)) ([ace947e](https://github.com/equinor/sepes-web/commit/ace947ebfc647482e3672cbd2084093759ae337e))
* upgrade @typescript-eslint/eslint-plugin from 4.27.0 to 4.28.2 ([#1127](https://github.com/equinor/sepes-web/issues/1127)) ([4d4dfbb](https://github.com/equinor/sepes-web/commit/4d4dfbb74efc86ce77541f06a7f3518d0cd55ef5))
* upgrade @typescript-eslint/parser from 4.26.1 to 4.27.0 ([a1656d5](https://github.com/equinor/sepes-web/commit/a1656d583d0be0298ee0a12e5c31151e8be1e5a4))
* upgrade @typescript-eslint/parser from 4.27.0 to 4.28.2 ([#1126](https://github.com/equinor/sepes-web/issues/1126)) ([343d6c8](https://github.com/equinor/sepes-web/commit/343d6c835cd0d65be01a59ce17d712406b8f9549))
* upgrade react-dropzone from 11.3.2 to 11.3.4 ([#1129](https://github.com/equinor/sepes-web/issues/1129)) ([5a95498](https://github.com/equinor/sepes-web/commit/5a954985f7d77b304b2524d610b5522c0efa92e9))
* upgrade typescript from 4.3.2 to 4.3.4 ([753cf16](https://github.com/equinor/sepes-web/commit/753cf160573f881a8466828b2c44af5358623e20))
* upgrade typescript from 4.3.4 to 4.3.5 ([#1152](https://github.com/equinor/sepes-web/issues/1152)) ([e7718f6](https://github.com/equinor/sepes-web/commit/e7718f63bec77e7de2accef4f867c21797e71884))
* **vm:** reset password button disabled issue ([#1134](https://github.com/equinor/sepes-web/issues/1134)) ([ab21e02](https://github.com/equinor/sepes-web/commit/ab21e028673ec3b232225fe07d081c7f0f2b4040)), closes [#1125](https://github.com/equinor/sepes-web/issues/1125)

### [0.1.29](https://github.com/equinor/sepes-web/compare/0.1.28...0.1.29) (2021-06-30)


### Bug Fixes

* codeQL warnings and errors ([#1069](https://github.com/equinor/sepes-web/issues/1069)) ([51da7b9](https://github.com/equinor/sepes-web/commit/51da7b922a3e3756608f7b97b44d67c1f9486396))
* upgrade @types/react from 17.0.8 to 17.0.9 ([0756697](https://github.com/equinor/sepes-web/commit/0756697e6f72a364f0669fdb4586958d181a09a6))
* upgrade @typescript-eslint/eslint-plugin from 4.26.0 to 4.26.1 ([#1079](https://github.com/equinor/sepes-web/issues/1079)) ([ed25cb2](https://github.com/equinor/sepes-web/commit/ed25cb29b7a24655c55765488c1bc3fc19ccb3ad))
* upgrade @typescript-eslint/parser from 4.26.0 to 4.26.1 ([#1078](https://github.com/equinor/sepes-web/issues/1078)) ([d0f7f5b](https://github.com/equinor/sepes-web/commit/d0f7f5be49f9aacaec6d0e266d07534a3a9abed0))
* **participants:** not search before writing three charachters ([#1071](https://github.com/equinor/sepes-web/issues/1071)) ([5f01d87](https://github.com/equinor/sepes-web/commit/5f01d879d840e7b5b5d92bd1d23425754362304f)), closes [#1070](https://github.com/equinor/sepes-web/issues/1070)
* upgrade react-keyed-file-browser from 1.10.0 to 1.11.0 ([9618ca7](https://github.com/equinor/sepes-web/commit/9618ca77ad849e8c1520df1a584a1d3078c3fa59))

### [0.1.28](https://github.com/equinor/sepes-web/compare/0.1.27...0.1.28) (2021-06-24)


### Bug Fixes

* **sandbox:** add tooltip to inactive VM links ([5b14a37](https://github.com/equinor/sepes-web/commit/5b14a3729bf3227dcb9809ec097d60f5653b6bb4)), closes [#1049](https://github.com/equinor/sepes-web/issues/1049)
* **study:** change tooltip text when adding a invalid wbs with active resources ([89da65b](https://github.com/equinor/sepes-web/commit/89da65b41f8d566b731a86016a4c51f1353fd563))
* **vm:** add loading icon when validatin username ([ec1e030](https://github.com/equinor/sepes-web/commit/ec1e03084db2c482efcfc42020c5895d8fef5748)), closes [#1047](https://github.com/equinor/sepes-web/issues/1047)
* **vm:** tooltips not displaying for more actions ([4905af8](https://github.com/equinor/sepes-web/commit/4905af8fcd0535bef4060e483f544130d57861d8)), closes [#1043](https://github.com/equinor/sepes-web/issues/1043)
* allow dashes in study name ([e56569d](https://github.com/equinor/sepes-web/commit/e56569d6d16318d311c97c3725516a55b19d78f2)), closes [#1041](https://github.com/equinor/sepes-web/issues/1041)
* issue with saving study and wbs validation ([471f46f](https://github.com/equinor/sepes-web/commit/471f46fa64796b67087105aec8eeb68f08840d14))
* truncate and fix ui issues with long names ([749cab7](https://github.com/equinor/sepes-web/commit/749cab7b6d25624118279d9ce25b004708b454fd)), closes [#1042](https://github.com/equinor/sepes-web/issues/1042) [#1013](https://github.com/equinor/sepes-web/issues/1013)
* upgrade @typescript-eslint/eslint-plugin from 4.25.0 to 4.26.0 ([#1039](https://github.com/equinor/sepes-web/issues/1039)) ([213f1fa](https://github.com/equinor/sepes-web/commit/213f1fa668fdb3809089ba807e31f471ae82363c))
* upgrade @typescript-eslint/parser from 4.25.0 to 4.26.0 ([163f546](https://github.com/equinor/sepes-web/commit/163f5460f190d912c850dbf32be9889f82884b94))
* **sandbox:** add scroll effect to data set and resource list ([0f8b146](https://github.com/equinor/sepes-web/commit/0f8b1466aee115ff87da440f307dfb219290a04e)), closes [#1024](https://github.com/equinor/sepes-web/issues/1024)
* **study:** clear participant search box after typing ([70ce624](https://github.com/equinor/sepes-web/commit/70ce62400532a7619924c41b3a64378ff31b8816)), closes [#1033](https://github.com/equinor/sepes-web/issues/1033)
* upgrade typescript from 4.2.4 to 4.3.2 ([#1017](https://github.com/equinor/sepes-web/issues/1017)) ([abfcab8](https://github.com/equinor/sepes-web/commit/abfcab8f6c330ac513a2f0c24f73657982c0a7df))
* **study:** not allow changing wbs after creating resources ([#1020](https://github.com/equinor/sepes-web/issues/1020)) ([ae669f6](https://github.com/equinor/sepes-web/commit/ae669f6a1dd9fca9eb76f8b912d1ee4f36bd80f3))

### [0.1.27](https://github.com/equinor/sepes-web/compare/0.1.26...0.1.27) (2021-06-17)


### Bug Fixes

* **vm:** data disk should not be required ([#1027](https://github.com/equinor/sepes-web/issues/1027)) ([aafb824](https://github.com/equinor/sepes-web/commit/aafb824c09e7dbe19846003e6d217697d33da969)), closes [#1025](https://github.com/equinor/sepes-web/issues/1025)
* upgrade @types/react from 17.0.7 to 17.0.8 ([4c2a963](https://github.com/equinor/sepes-web/commit/4c2a96306651a4639fb153cdacc14d54c77e475b))

### [0.1.26](https://github.com/equinor/sepes-web/compare/0.1.25...0.1.26) (2021-06-17)


### Bug Fixes

* **dataset:** no name length validation ([#1015](https://github.com/equinor/sepes-web/issues/1015)) ([27647e3](https://github.com/equinor/sepes-web/commit/27647e34bebb0e9391c664428cd13109398d002d)), closes [#1010](https://github.com/equinor/sepes-web/issues/1010)
* add enviroment to the top bar ([#1007](https://github.com/equinor/sepes-web/issues/1007)) ([e7e768f](https://github.com/equinor/sepes-web/commit/e7e768f729f55dacbe09823903d8a98746a031e6)), closes [#1006](https://github.com/equinor/sepes-web/issues/1006)
* better explain no access page ([#996](https://github.com/equinor/sepes-web/issues/996)) ([bd08ab1](https://github.com/equinor/sepes-web/commit/bd08ab1bfef506dfbf99bd099c83a5a289e7609a))
* hide data invetory link for study specific data sets ([#993](https://github.com/equinor/sepes-web/issues/993)) ([ab9bf9d](https://github.com/equinor/sepes-web/commit/ab9bf9d11d8025e788ed19cd293402eab0a19ca4)), closes [#992](https://github.com/equinor/sepes-web/issues/992)
* remove commented code ([32171d4](https://github.com/equinor/sepes-web/commit/32171d4e9745a4e5272d31c4d52b05e63d9d105a))
* upgrade @types/react from 17.0.6 to 17.0.7 ([93c2e8c](https://github.com/equinor/sepes-web/commit/93c2e8cbd8a4179e9d3b498494a39c8aa50897fb))
* upgrade @typescript-eslint/eslint-plugin from 4.24.0 to 4.25.0 ([972e23a](https://github.com/equinor/sepes-web/commit/972e23a5fe5be7fff85da330601eeb8045c74737))
* upgrade @typescript-eslint/parser from 4.24.0 to 4.25.0 ([#1001](https://github.com/equinor/sepes-web/issues/1001)) ([46217eb](https://github.com/equinor/sepes-web/commit/46217eb564ac5893b14acba5ec6d43b0119565fd))

### [0.1.25](https://github.com/equinor/sepes-web/compare/0.1.24...0.1.25) (2021-06-10)


### Bug Fixes

* **vm:** added retry mechanism for ip address ([#983](https://github.com/equinor/sepes-web/issues/983)) ([daaa537](https://github.com/equinor/sepes-web/commit/daaa53732b8f05166e3c79e32bad0ca91f9ed02a)), closes [#978](https://github.com/equinor/sepes-web/issues/978)
* change cypress test browser ([e0afa93](https://github.com/equinor/sepes-web/commit/e0afa93269bb8d2ec7430358ffe1fc0563f112bf)), closes [#965](https://github.com/equinor/sepes-web/issues/965)
* changed to fixed position of topbar and new study component ([5b363bc](https://github.com/equinor/sepes-web/commit/5b363bc12665870c28950859adb4e8681a3ba6ad)), closes [#942](https://github.com/equinor/sepes-web/issues/942) [#951](https://github.com/equinor/sepes-web/issues/951)
* run lon running tests on manual trigger ([#988](https://github.com/equinor/sepes-web/issues/988)) ([0afd56b](https://github.com/equinor/sepes-web/commit/0afd56b20b124df31ae8656f13d2d4bf0740ba9c))
* **vm:** remove data disk as a requirement ([#981](https://github.com/equinor/sepes-web/issues/981)) ([870d69b](https://github.com/equinor/sepes-web/commit/870d69b3f030e834451da704129bacdb3f1984da)), closes [#980](https://github.com/equinor/sepes-web/issues/980) [#977](https://github.com/equinor/sepes-web/issues/977)
* Textfield validations ([#953](https://github.com/equinor/sepes-web/issues/953)) ([f5ce19c](https://github.com/equinor/sepes-web/commit/f5ce19c07f9df55748de691f57eb7008ac04e2e5)), closes [#945](https://github.com/equinor/sepes-web/issues/945) [#944](https://github.com/equinor/sepes-web/issues/944) [#943](https://github.com/equinor/sepes-web/issues/943)
* upgrade @types/react from 17.0.5 to 17.0.6 ([#976](https://github.com/equinor/sepes-web/issues/976)) ([a2ac99a](https://github.com/equinor/sepes-web/commit/a2ac99a3a67213c38d4295e895927ae7cca771dc))
* **study:** results and learnings bug ([#973](https://github.com/equinor/sepes-web/issues/973)) ([75c375b](https://github.com/equinor/sepes-web/commit/75c375bc2fa7e85a55c6015e066f58f33f90fe76)), closes [#967](https://github.com/equinor/sepes-web/issues/967)
* change standard link desciprion ([f87de6e](https://github.com/equinor/sepes-web/commit/f87de6ee08bdee5f9075a15741d3acf19376bd42)), closes [#969](https://github.com/equinor/sepes-web/issues/969)
* upgrade @typescript-eslint/eslint-plugin from 4.23.0 to 4.24.0 ([#964](https://github.com/equinor/sepes-web/issues/964)) ([782be4f](https://github.com/equinor/sepes-web/commit/782be4fb04a869f3201f495bb70ab30172112edb))
* upgrade @typescript-eslint/parser from 4.23.0 to 4.24.0 ([12ec491](https://github.com/equinor/sepes-web/commit/12ec4916e04477703c79113460a5ba96a0a162e7))

### [0.1.24](https://github.com/equinor/sepes-web/compare/0.1.23...0.1.24) (2021-06-03)


### Features

* **study:** validate wbs code ([#890](https://github.com/equinor/sepes-web/issues/890)) ([387b058](https://github.com/equinor/sepes-web/commit/387b0589ab5c6829ee528abcf5274c800ea0ff17))


### Bug Fixes

* **study:** delete button visibility check for studyClose instead of studyDelete ([#948](https://github.com/equinor/sepes-web/issues/948)) ([fbb4b05](https://github.com/equinor/sepes-web/commit/fbb4b057487db71a318d98c7a19f52cbc85fcf47))
* **vm:** more options button issue ([#939](https://github.com/equinor/sepes-web/issues/939)) ([26efe74](https://github.com/equinor/sepes-web/commit/26efe74f0e1b7c116591fb71530e9d21b9c391e0)), closes [#936](https://github.com/equinor/sepes-web/issues/936) [#935](https://github.com/equinor/sepes-web/issues/935)
* console warnings ([85565ca](https://github.com/equinor/sepes-web/commit/85565ca137ec8ffa19744b3e14f7ee32c4958565))
* do not call api with empty wbs ([#894](https://github.com/equinor/sepes-web/issues/894)) ([816e3c2](https://github.com/equinor/sepes-web/commit/816e3c2408e63994c78880daa8d15212da6559ab))
* issues with notification component ([#907](https://github.com/equinor/sepes-web/issues/907)) ([a78e708](https://github.com/equinor/sepes-web/commit/a78e70835d9a89280700892309875b194f2edb27))
* update eds to 0.12.1 ([b5c4c61](https://github.com/equinor/sepes-web/commit/b5c4c619f8b2bec2587759e85233a7a37abb7401))
* update react and react-dom to version 17.0.2 ([72750c6](https://github.com/equinor/sepes-web/commit/72750c6f7e975c7c6edc610dbd769db71f7d56a5))
* update to EDS 0.12.0 ([#844](https://github.com/equinor/sepes-web/issues/844)) ([4335ec0](https://github.com/equinor/sepes-web/commit/4335ec0fa9afc37f4e32a4f87935ef1821777a41))
* upgrade @azure/msal-browser from 2.14.1 to 2.14.2 ([d932349](https://github.com/equinor/sepes-web/commit/d932349b1ab79cf3be0c2b76ba39877334d6423c))
* upgrade @peculiar/webcrypto from 1.1.6 to 1.1.7 ([17b0bdb](https://github.com/equinor/sepes-web/commit/17b0bdb8d496496cfa14e3500ad00df0306adc12))
* upgrade @types/node from 12.20.11 to 12.20.12 ([a690612](https://github.com/equinor/sepes-web/commit/a6906123393f255ef7d70a66a5954db760350f8b))
* upgrade @types/node from 12.20.12 to 12.20.13 ([d4c9b67](https://github.com/equinor/sepes-web/commit/d4c9b67da2eeab9bb98da5176f4e87ce67a923ea))
* upgrade @typescript-eslint/eslint-plugin from 4.22.1 to 4.23.0 ([ffc8219](https://github.com/equinor/sepes-web/commit/ffc821928e72c3a6a08f102b306e63e8bd076225))
* upgrade @typescript-eslint/parser from 4.22.1 to 4.23.0 ([#926](https://github.com/equinor/sepes-web/issues/926)) ([61e9042](https://github.com/equinor/sepes-web/commit/61e9042d336d7f65a272231bedea25aeb6cb5dce))
* **create vm:** center text in helper text box ([a0a6b1b](https://github.com/equinor/sepes-web/commit/a0a6b1b99b8f96388443a1b780e98af2365f8196))
* **study:** not redirecting after delete ([#922](https://github.com/equinor/sepes-web/issues/922)) ([6a39a98](https://github.com/equinor/sepes-web/commit/6a39a98c0b1f1614ac00df60df42bdd487f48f42)), closes [#921](https://github.com/equinor/sepes-web/issues/921)
* upgrade @types/react from 17.0.4 to 17.0.5 ([9cd1621](https://github.com/equinor/sepes-web/commit/9cd1621d8e7a2220efad138af09574ac01fef6a4))
* upgrade @types/react-router from 5.1.13 to 5.1.14 ([6ed9845](https://github.com/equinor/sepes-web/commit/6ed98453ad05e6922b3184c3a8fd7fb290833716))
* upgrade @typescript-eslint/eslint-plugin from 4.22.0 to 4.22.1 ([6bdb553](https://github.com/equinor/sepes-web/commit/6bdb5534406370a124685d23be3f618232c6a305))
* upgrade @typescript-eslint/parser from 4.22.0 to 4.22.1 ([#900](https://github.com/equinor/sepes-web/issues/900)) ([64e6361](https://github.com/equinor/sepes-web/commit/64e6361857a447b279db74662e6fce0c5adf6b72))
* upgrade styled-components from 5.2.3 to 5.3.0 ([96d2de2](https://github.com/equinor/sepes-web/commit/96d2de200bab7974d190860a2f7cb6831208f980))
* upgrade ts-jest from 26.5.5 to 26.5.6 ([#916](https://github.com/equinor/sepes-web/issues/916)) ([054deed](https://github.com/equinor/sepes-web/commit/054deedb8267f1645da68b04d7cb68bba8af1549))

### [0.1.23](https://github.com/equinor/sepes-web/compare/0.1.22...0.1.23) (2021-05-19)


### Bug Fixes

* vertically align study logos ([b9a0879](https://github.com/equinor/sepes-web/commit/b9a0879d863c3fdc38dcd6c4137fb380b37f9971))

### [0.1.22](https://github.com/equinor/sepes-web/compare/0.1.21...0.1.22) (2021-05-19)


### Features

* add link to github's create an issue for users to report bugs ([#832](https://github.com/equinor/sepes-web/issues/832)) ([b4d476c](https://github.com/equinor/sepes-web/commit/b4d476ccb83ac2c965c3439d410105b37c340e25)), closes [#799](https://github.com/equinor/sepes-web/issues/799)


### Bug Fixes

* add back user name in top bar ([ddf3d6b](https://github.com/equinor/sepes-web/commit/ddf3d6b8fdc36fd6e13f594bc38509ed19e97dc0))
* change component borders to EDS style ([9e08ca2](https://github.com/equinor/sepes-web/commit/9e08ca20633caf6f02b227a0dc22896f0bacb926))
* change name to email in top bar and use api response ([#872](https://github.com/equinor/sepes-web/issues/872)) ([0f440e7](https://github.com/equinor/sepes-web/commit/0f440e79ee350c13903c531389bbdfbcdbeb7bb5)), closes [#870](https://github.com/equinor/sepes-web/issues/870)
* change report bug link to service-now ([ceab0d7](https://github.com/equinor/sepes-web/commit/ceab0d718bd250ce1c74ecdbea656ee12919f29d))
* codeQL errors and notes ([7e25f01](https://github.com/equinor/sepes-web/commit/7e25f01f4c97182f7dc8a5c5f49a8c9099e53afc))
* cypress tests and update to new version ([bcd67cf](https://github.com/equinor/sepes-web/commit/bcd67cf504486bffe6f9a8546c4c88a7bb490689))
* Error that appeared with expired access token ([38a21de](https://github.com/equinor/sepes-web/commit/38a21dee3c8fa8a09e5952e1fa3ae8a56b8f0bdf))
* Javascript errors ([f620e11](https://github.com/equinor/sepes-web/commit/f620e11186c6f64dd47b2f335d75aae470e600f3))
* nullcheck that caused error ([f325fb3](https://github.com/equinor/sepes-web/commit/f325fb30a5739da9ee231effebd0141596e98a6b))
* package.json & package-lock.json to reduce vulnerabilities ([93ea134](https://github.com/equinor/sepes-web/commit/93ea134c70864d56a84cd5ea8aaf404503a47df3))
* Pick specific version of jest reporter ([df501c2](https://github.com/equinor/sepes-web/commit/df501c2b918e0742de8296f9af6c036eccb2afdd)), closes [#850](https://github.com/equinor/sepes-web/issues/850)
* reload page after token expire ([#873](https://github.com/equinor/sepes-web/issues/873)) ([c93282d](https://github.com/equinor/sepes-web/commit/c93282d1c127534f67032108612d6d6c4beaf8e4))
* upgrade @azure/msal-browser from 2.14.0 to 2.14.1 ([0dd598f](https://github.com/equinor/sepes-web/commit/0dd598f7a39438b5cb1d97baf70e5b685b202f0d))
* upgrade @material-ui/core from 4.11.3 to 4.11.4 ([53d9efc](https://github.com/equinor/sepes-web/commit/53d9efc78d075eb97854b8a879f4e61852c76ff0))
* upgrade @microsoft/applicationinsights-web from 2.6.1 to 2.6.2 ([08f811a](https://github.com/equinor/sepes-web/commit/08f811a9b7dfac30ea8d867830d7690fec590206))
* upgrade @types/node from 12.20.10 to 12.20.11 ([f7f107b](https://github.com/equinor/sepes-web/commit/f7f107bb20167d06df05a84c98f1180f25b2bd54))
* upgrade @types/node from 12.20.9 to 12.20.10 ([1686b30](https://github.com/equinor/sepes-web/commit/1686b30aa54851b8ab13fa9a75fd499256162e86))
* upgrade @types/react from 17.0.3 to 17.0.4 ([f4ecf84](https://github.com/equinor/sepes-web/commit/f4ecf842d31e0838e447dbc953e5315d50dd6cc5))
* **dataset:** fix issues and performance of file overview and search ([#830](https://github.com/equinor/sepes-web/issues/830)) ([313da89](https://github.com/equinor/sepes-web/commit/313da8907407393220478da7a5f187b6f454c9d6)), closes [#828](https://github.com/equinor/sepes-web/issues/828) [#826](https://github.com/equinor/sepes-web/issues/826)
* **dataset:** Issue with search and infinity scroll on file upload ([f7ccf6e](https://github.com/equinor/sepes-web/commit/f7ccf6e8ff0286d2705d46bc7b58c683292338bc))
* **participants:** nullcheck list ([424da00](https://github.com/equinor/sepes-web/commit/424da00ac51fa92c6e09fedc02d594cc955b1e2f))
* **sadbox:** close create sandbox dialog when clicking create ([3310eb3](https://github.com/equinor/sepes-web/commit/3310eb316106b7b92c1f4f853faaa4713f8d6bc0)), closes [#851](https://github.com/equinor/sepes-web/issues/851)
* **sandbox:** A margin appeard a top of the page when clicking make a… ([#831](https://github.com/equinor/sepes-web/issues/831)) ([6d76d2f](https://github.com/equinor/sepes-web/commit/6d76d2fe2fc34e8302330e2812e808c4dfe6967a)), closes [#819](https://github.com/equinor/sepes-web/issues/819)
* **sandbox:** loading did not display when clicking delete sandbox ([05c3c32](https://github.com/equinor/sepes-web/commit/05c3c329b747ea1626006d95fccc4794ca200dd6))
* **sandbox:** make avaiable disabled bug ([f490842](https://github.com/equinor/sepes-web/commit/f490842929e68508a76270a8d7eda693583714fc)), closes [#868](https://github.com/equinor/sepes-web/issues/868)
* upgrade @types/node from 12.20.7 to 12.20.9 ([df90a71](https://github.com/equinor/sepes-web/commit/df90a7103316cfcf8921fec7951f1964af4debd1))
* upgrade @typescript-eslint/eslint-plugin from 4.21.0 to 4.22.0 ([#836](https://github.com/equinor/sepes-web/issues/836)) ([f960529](https://github.com/equinor/sepes-web/commit/f9605295925a72aa9f9e927b71a282a258990921))
* upgrade @typescript-eslint/parser from 4.21.0 to 4.22.0 ([8f8ccc8](https://github.com/equinor/sepes-web/commit/8f8ccc8a9289e96a7621e91ae0c55a1df5ddf617))
* upgrade ts-jest from 26.5.4 to 26.5.5 ([e0e93bd](https://github.com/equinor/sepes-web/commit/e0e93bd668b3d26dd2533051f06dc1b2ec656cb5))
* upgrade typescript from 4.2.3 to 4.2.4 ([0ebbaec](https://github.com/equinor/sepes-web/commit/0ebbaec6620e21da65651707625fd21eb11506fa))

### [0.1.21](https://github.com/equinor/sepes-web/compare/0.1.20...0.1.21) (2021-04-29)


### Features

* **dataset:** add file explorer ([#811](https://github.com/equinor/sepes-web/issues/811)) ([57a1286](https://github.com/equinor/sepes-web/commit/57a1286276ae16f0de4bcd2a1b1e83f057b18263))
* **dataset:** add search for files ([#806](https://github.com/equinor/sepes-web/issues/806)) ([d3b3915](https://github.com/equinor/sepes-web/commit/d3b3915c6b1e133bc953e28b0e131c37beaace9b)), closes [#803](https://github.com/equinor/sepes-web/issues/803) [#798](https://github.com/equinor/sepes-web/issues/798)
* **dataset:** support folders in file upload ([#788](https://github.com/equinor/sepes-web/issues/788)) ([4f22a93](https://github.com/equinor/sepes-web/commit/4f22a93560ba1ce68bfbb67beb3a40f5f82870d3)), closes [#781](https://github.com/equinor/sepes-web/issues/781) [#791](https://github.com/equinor/sepes-web/issues/791)
* **dataste:** Added total progress bar for file upload ([54e0e77](https://github.com/equinor/sepes-web/commit/54e0e77ce338138d6a359390dcd1cd2822701614))
* add release notes ([1d5fd43](https://github.com/equinor/sepes-web/commit/1d5fd431d6ad69b2e568f10879c6a30529d170c2))


### Bug Fixes

* **dataset:** issue with size being undefined on upload ([09da497](https://github.com/equinor/sepes-web/commit/09da49740d3bb9300e9a8e9a9f6268f9dbc5f042)), closes [#818](https://github.com/equinor/sepes-web/issues/818)
* add http error to notification component ([#764](https://github.com/equinor/sepes-web/issues/764)) ([0a652fa](https://github.com/equinor/sepes-web/commit/0a652fa5285d976313a49acc5ac89d41f647b5d9)), closes [#758](https://github.com/equinor/sepes-web/issues/758) [#759](https://github.com/equinor/sepes-web/issues/759)
* add loading screen to first permission call ([29c640a](https://github.com/equinor/sepes-web/commit/29c640a8062bafa1aedc91c3cc855b9b805e0f5f)), closes [#747](https://github.com/equinor/sepes-web/issues/747)
* bugs and styling issues ([#748](https://github.com/equinor/sepes-web/issues/748)) ([0330a4b](https://github.com/equinor/sepes-web/commit/0330a4b1068e8433a4ed01410f3af83de918995a)), closes [#746](https://github.com/equinor/sepes-web/issues/746) [#745](https://github.com/equinor/sepes-web/issues/745) [#744](https://github.com/equinor/sepes-web/issues/744) [#743](https://github.com/equinor/sepes-web/issues/743) [#742](https://github.com/equinor/sepes-web/issues/742) [#741](https://github.com/equinor/sepes-web/issues/741)
* CodeQL errors, refactor and test input validations ([#779](https://github.com/equinor/sepes-web/issues/779)) ([9df863a](https://github.com/equinor/sepes-web/commit/9df863add388f3f2e43da756a5b1ea7c6f082b8f))
* console errors ([#767](https://github.com/equinor/sepes-web/issues/767)) ([c0db078](https://github.com/equinor/sepes-web/commit/c0db0788da1d82d1244a59de156784f6e61848af))
* issue with integration test and new msal version ([#814](https://github.com/equinor/sepes-web/issues/814)) ([531d312](https://github.com/equinor/sepes-web/commit/531d31259eeee57ef00e8bd79a3c2635ae125d04))
* remove bootstrap from project ([#731](https://github.com/equinor/sepes-web/issues/731)) ([5252ba7](https://github.com/equinor/sepes-web/commit/5252ba7b8da3e43247609c5c806eeff6d1566b0c))
* replace msal with msal-browser and add pkce ([#807](https://github.com/equinor/sepes-web/issues/807)) ([c8faca0](https://github.com/equinor/sepes-web/commit/c8faca0f79aa94ced8dbc13eb8c32b7d95d35f57))
* return response even if api calls fails ([f991148](https://github.com/equinor/sepes-web/commit/f9911483ee7460c4f5e73882192410a067a066d6))
* small UI changes ([d7c761a](https://github.com/equinor/sepes-web/commit/d7c761a00e239c7aaa8660d17634db2c05059d35))
* styling and centering text of error/noaccess pages ([ece0879](https://github.com/equinor/sepes-web/commit/ece0879f0b39b28851ab8488d60d6880856273fd)), closes [#793](https://github.com/equinor/sepes-web/issues/793)
* test and fixes for sandbox and dataset components ([#768](https://github.com/equinor/sepes-web/issues/768)) ([77a7ab1](https://github.com/equinor/sepes-web/commit/77a7ab1a7b7c23cc54ad2ef7abbafe2e62b85c27))
* Update EDS and icons on textfields ([d07facd](https://github.com/equinor/sepes-web/commit/d07facdf1712ef311bbeda81d11943e3d221b37c))
* upgrade @azure/storage-blob from 12.4.1 to 12.5.0 ([cd7952c](https://github.com/equinor/sepes-web/commit/cd7952ccec7283cb67e154c5d81a5310b9a2a443))
* upgrade @fortawesome/fontawesome-free from 5.15.2 to 5.15.3 ([2db7906](https://github.com/equinor/sepes-web/commit/2db790693935b97c957a5bc1404dc65adb822173))
* upgrade @microsoft/applicationinsights-web from 2.5.11 to 2.6.0 ([e8f38fc](https://github.com/equinor/sepes-web/commit/e8f38fce7035aa27bd96a1a9e224f09b08763687))
* upgrade @microsoft/applicationinsights-web from 2.6.0 to 2.6.1 ([381a4d3](https://github.com/equinor/sepes-web/commit/381a4d3728237c039a6469a3a82b29b5886b14d7))
* upgrade @types/node from 12.20.4 to 12.20.5 ([4b521e2](https://github.com/equinor/sepes-web/commit/4b521e2fc2db3b5198cc6ec9ce4a76fbff28b9c3))
* upgrade @types/node from 12.20.5 to 12.20.6 ([7935526](https://github.com/equinor/sepes-web/commit/79355266a45760c42803aa70ba61b82d1e7a8a0f))
* upgrade @types/node from 12.20.6 to 12.20.7 ([33d7df7](https://github.com/equinor/sepes-web/commit/33d7df7c9f180deb271321186422329f2bc28cb2))
* upgrade @types/react-dom from 16.9.11 to 16.9.12 ([942f88a](https://github.com/equinor/sepes-web/commit/942f88ac7d521c8abc2f5f9e8f55e4b880295161))
* upgrade @types/react-router from 5.1.12 to 5.1.13 ([58ca664](https://github.com/equinor/sepes-web/commit/58ca66474fdb5f9a1b7cd191d1dad025dd37bc70))
* upgrade @types/styled-components from 5.1.7 to 5.1.8 ([#739](https://github.com/equinor/sepes-web/issues/739)) ([b993cde](https://github.com/equinor/sepes-web/commit/b993cdee4b4903a396a3b668a696627da1d20370))
* upgrade @types/styled-components from 5.1.8 to 5.1.9 ([aaafedf](https://github.com/equinor/sepes-web/commit/aaafedf1dcd1b4cfe00aca88636f7dd09043b7ae))
* upgrade @typescript-eslint/eslint-plugin from 4.17.0 to 4.18.0 ([#740](https://github.com/equinor/sepes-web/issues/740)) ([7d8dbed](https://github.com/equinor/sepes-web/commit/7d8dbedc33d07e3edf3a6713cf04839981e81cd0))
* upgrade @typescript-eslint/eslint-plugin from 4.18.0 to 4.19.0 ([#770](https://github.com/equinor/sepes-web/issues/770)) ([8effe5e](https://github.com/equinor/sepes-web/commit/8effe5eb80323c75a398b35e2a2fb391044b35ec))
* upgrade @typescript-eslint/eslint-plugin from 4.19.0 to 4.20.0 ([1b220b1](https://github.com/equinor/sepes-web/commit/1b220b10bfed17055f7f4e78187b6fe6e9d8b2b1))
* upgrade @typescript-eslint/eslint-plugin from 4.20.0 to 4.21.0 ([#815](https://github.com/equinor/sepes-web/issues/815)) ([e30fb7f](https://github.com/equinor/sepes-web/commit/e30fb7f04926f0f8df52741307cfac6dc0caebc9))
* upgrade @typescript-eslint/parser from 4.17.0 to 4.18.0 ([5cf2f90](https://github.com/equinor/sepes-web/commit/5cf2f90069649003d5b342cdbe67d86b38dd5701))
* upgrade @typescript-eslint/parser from 4.18.0 to 4.19.0 ([#769](https://github.com/equinor/sepes-web/issues/769)) ([7202d7b](https://github.com/equinor/sepes-web/commit/7202d7b6583f7a9e363985fe792a35c9ec4e70ce))
* upgrade @typescript-eslint/parser from 4.20.0 to 4.21.0 ([#816](https://github.com/equinor/sepes-web/issues/816)) ([fc0af97](https://github.com/equinor/sepes-web/commit/fc0af97c5b93bd4f2514e9db89292d90044c4d18))
* **dataset:** issue with loading bar when uploading many files ([3bc8ba1](https://github.com/equinor/sepes-web/commit/3bc8ba1281f3ef113508482ef82939242109c969))
* **dataset:** issue with uploading very small files (0 bytes) ([#809](https://github.com/equinor/sepes-web/issues/809)) ([f2c9dcc](https://github.com/equinor/sepes-web/commit/f2c9dcc27204721b899ede7ed7c3ffcda7b15a29))
* **study:** delete button changed to target the soft delete method instead ([#787](https://github.com/equinor/sepes-web/issues/787)) ([3dcc5c0](https://github.com/equinor/sepes-web/commit/3dcc5c06d72648ec09043df2bda0acf89ddf0782))
* upgrade @typescript-eslint/parser from 4.19.0 to 4.20.0 ([95aceb2](https://github.com/equinor/sepes-web/commit/95aceb2b0e22e852be5b613889f4b90c97cc0b80))
* upgrade react-dropzone from 11.3.1 to 11.3.2 ([59e2ffe](https://github.com/equinor/sepes-web/commit/59e2ffe5aca73b81c14ca88867c25dd7d95e6e01))
* upgrade styled-components from 5.2.1 to 5.2.2 ([cac7b72](https://github.com/equinor/sepes-web/commit/cac7b72a67fb8d8b295946e15c2497bc8cf5ff04))
* upgrade styled-components from 5.2.2 to 5.2.3 ([5cd4294](https://github.com/equinor/sepes-web/commit/5cd4294adaf333b302a42b6f8fd45ef55ba828da))
* **dataset:** disable create when study has no wbs ([88ed7ff](https://github.com/equinor/sepes-web/commit/88ed7ff80f74c3010e9690cdcaec4c58bcafc60a)), closes [#726](https://github.com/equinor/sepes-web/issues/726)
* **dataset:** margins ([b78e924](https://github.com/equinor/sepes-web/commit/b78e9245cf9a50de051829c25996b05e2abe7619))
* **dataset:** more spacing between files and align delete icon ([76f41de](https://github.com/equinor/sepes-web/commit/76f41debcef2a85369f94a0fcb437b018efae955))
* **sandbox:** check permission for resource retry mechanism ([7e25d47](https://github.com/equinor/sepes-web/commit/7e25d47fa6071d51fe8d165ef3af8f1985a906d6))
* **sandbox:** dataset margin ([06bd7f9](https://github.com/equinor/sepes-web/commit/06bd7f9182cef15ef8182c78a883bd158618afa7))
* **sandbox:** dataset policy text lineshift issue ([#754](https://github.com/equinor/sepes-web/issues/754)) ([7dbcab8](https://github.com/equinor/sepes-web/commit/7dbcab8f45271286a9731b86060f2f71dcc45f81)), closes [#751](https://github.com/equinor/sepes-web/issues/751)
* **sandbox:** vertically center loading icon for vm ([#749](https://github.com/equinor/sepes-web/issues/749)) ([b1c3b48](https://github.com/equinor/sepes-web/commit/b1c3b48a04e725ad56d6d0e9bb2e17324e3809a2))
* **study:** bug when clicking cancel for exiting edit mode ([4b2abf8](https://github.com/equinor/sepes-web/commit/4b2abf8ea4866b33a224265edbcfbae83f1712c1))
* upgrade multiple dependencies with Snyk ([cf650ad](https://github.com/equinor/sepes-web/commit/cf650ad9b5f0467f723d3f22b92c7e4cbf3027c4))
* **sandbox:** remove hover datasets confirmed ([6d891b7](https://github.com/equinor/sepes-web/commit/6d891b73d3f50d97786441b487971b75134289ce)), closes [#721](https://github.com/equinor/sepes-web/issues/721)
* **study:** logo margin ([f266b07](https://github.com/equinor/sepes-web/commit/f266b075b2eae284e42328690702f985f9109d63))
* **study:** results and learnings correct font ([4211c42](https://github.com/equinor/sepes-web/commit/4211c42689d966e7775ef7b722f908b2af215f28))

### [0.1.20](https://github.com/equinor/sepes-web/compare/0.1.19...0.1.20) (2021-04-27)

### [0.1.19](https://github.com/equinor/sepes-web/compare/0.1.18...0.1.19) (2021-04-27)

### [0.1.18](https://github.com/equinor/sepes-web/compare/0.1.17...0.1.18) (2021-03-26)


### Bug Fixes

* error notification bug ([f95a1a6](https://github.com/equinor/sepes-web/commit/f95a1a6c8d09a7c870f4ef4afc5a841d955ad2ba))
* **sandbox:** update vm disk endpoint ([#725](https://github.com/equinor/sepes-web/issues/725)) ([4c165d3](https://github.com/equinor/sepes-web/commit/4c165d34ef255556f79d269af940c9ee6cbee6ae))

### [0.1.17](https://github.com/equinor/sepes-web/compare/0.1.16...0.1.17) (2021-03-18)


### Features

* **sandbox:** add retry functionality for vms ([d8d7a05](https://github.com/equinor/sepes-web/commit/d8d7a05af479e62c0d067b791ca5d775619a9718)), closes [#676](https://github.com/equinor/sepes-web/issues/676)


### Bug Fixes

* different bugs and styling issues ([276e498](https://github.com/equinor/sepes-web/commit/276e498af9a499638b98d731132d17b68adb4015)), closes [#710](https://github.com/equinor/sepes-web/issues/710) [#707](https://github.com/equinor/sepes-web/issues/707) [#706](https://github.com/equinor/sepes-web/issues/706) [#702](https://github.com/equinor/sepes-web/issues/702)
* dropdown equal key caused console error ([b0d15b7](https://github.com/equinor/sepes-web/commit/b0d15b75470cb32a338c8f1708628e04e2d552f0))
* **sandbox:** newly created dataset would not show before refresh ([7b1b4fd](https://github.com/equinor/sepes-web/commit/7b1b4fd4c82870513c898000be0bbcf05e59ab47)), closes [#698](https://github.com/equinor/sepes-web/issues/698)
* **study:** change size of setting wheel ([36f0f5b](https://github.com/equinor/sepes-web/commit/36f0f5b20d1c23535a0cee4467584ef1fc558dc6))
* **study:** issue with logo ([c9bf943](https://github.com/equinor/sepes-web/commit/c9bf9439b9a9404360c3dee6af79338a8afe26e8))
* **study:** issue with updating details ([986c31f](https://github.com/equinor/sepes-web/commit/986c31f6258a85e02433fd49616a910aeee15fac))
* added general nullcheck to notify component ([#681](https://github.com/equinor/sepes-web/issues/681)) ([c647ada](https://github.com/equinor/sepes-web/commit/c647ada5ed3e2c582c6f94a306d75a9a0562211a)), closes [#675](https://github.com/equinor/sepes-web/issues/675)
* multiple style issues ([b26fc0a](https://github.com/equinor/sepes-web/commit/b26fc0af486baf44dd454866dd52a3375d74deb2)), closes [#684](https://github.com/equinor/sepes-web/issues/684) [#687](https://github.com/equinor/sepes-web/issues/687)
* update bootstrap to 4.6.0 ([4e16cf8](https://github.com/equinor/sepes-web/commit/4e16cf85afc9af43ce71daa65df3dbc0ed7b1552))
* update EDS and npm packages ([#683](https://github.com/equinor/sepes-web/issues/683)) ([975c98e](https://github.com/equinor/sepes-web/commit/975c98e7696764ce590841290b786c4c68584a86))
* update react-router to version 5.2.0 ([f20603b](https://github.com/equinor/sepes-web/commit/f20603be54dbc77eefd709e076b4deb9571282c9))
* Update React-scripts to 4.0.3 ([#696](https://github.com/equinor/sepes-web/issues/696)) ([1808e06](https://github.com/equinor/sepes-web/commit/1808e0630d3c349063b215696f255112a68e63b1))
* **dataset:** re-enable cancel if create fails ([fc8166b](https://github.com/equinor/sepes-web/commit/fc8166b4b4bed7bfdd77e3c6c9fd12823502b90b)), closes [#667](https://github.com/equinor/sepes-web/issues/667)
* **participants:** issue when loading on button showed when loading page ([dead263](https://github.com/equinor/sepes-web/commit/dead26361c72cbb5ff6861495f6bb21ea9b9ab5f)), closes [#685](https://github.com/equinor/sepes-web/issues/685)
* **sandbox:** new tooltips for access control ([3e279dd](https://github.com/equinor/sepes-web/commit/3e279ddb4f98b5e8285fb635687986cee2fdf7db)), closes [#670](https://github.com/equinor/sepes-web/issues/670) [#671](https://github.com/equinor/sepes-web/issues/671)
* **study:** streamlined creation and logo upload ([#682](https://github.com/equinor/sepes-web/issues/682)) ([f9eb5f8](https://github.com/equinor/sepes-web/commit/f9eb5f895cd7f0b853402c8bd55b52722bfbb4aa)), closes [#674](https://github.com/equinor/sepes-web/issues/674)
* **study:** Update study in an instant instead of waiting for api ([0599ee3](https://github.com/equinor/sepes-web/commit/0599ee3f9d3825ecfb8a9bbf6ab124c43532e26b))
* update types/react to 17.0.3 ([928e3bd](https://github.com/equinor/sepes-web/commit/928e3bd1fa5ba42e612c105ceec55a92f5dfd5a9))
* Update typescript to version 4.2.3 ([6867d85](https://github.com/equinor/sepes-web/commit/6867d85779905151220b209732686407cf4ee10c))
* **study:** issue with logo component ([82d22a7](https://github.com/equinor/sepes-web/commit/82d22a7cc8f9ea1db4cc3986189c7c7e5f877029)), closes [#672](https://github.com/equinor/sepes-web/issues/672)
* upgrade react-dropzone from 11.3.0 to 11.3.1 ([b90c394](https://github.com/equinor/sepes-web/commit/b90c394c7eb13213724c142ad71b85047a536163))

### [0.1.16](https://github.com/equinor/sepes-web/compare/0.1.15...0.1.16) (2021-03-04)


### Features

* **study:** users can now remove logo from study ([#658](https://github.com/equinor/sepes-web/issues/658)) ([ab423ef](https://github.com/equinor/sepes-web/commit/ab423ef72f4e3164f0684d733c975f53837eb561)), closes [#651](https://github.com/equinor/sepes-web/issues/651)


### Bug Fixes

* **study:** logo did not show on create ([#673](https://github.com/equinor/sepes-web/issues/673)) ([3c906cc](https://github.com/equinor/sepes-web/commit/3c906cc50f18f999bb03b02138ee53e911cd8edc))
* upgrade @typescript-eslint/eslint-plugin from 4.14.2 to 4.15.0 ([#665](https://github.com/equinor/sepes-web/issues/665)) ([a5595d4](https://github.com/equinor/sepes-web/commit/a5595d4a14e92a5b2961cf62a17e0c9a7398b4d8))
* upgrade reactstrap from 8.8.1 to 8.9.0 ([#626](https://github.com/equinor/sepes-web/issues/626)) ([99fb609](https://github.com/equinor/sepes-web/commit/99fb60925f6e58f7d84a2791fe00c5085f2514e3))
* **dataset:** Improve delete file requests ([#661](https://github.com/equinor/sepes-web/issues/661)) ([c0724f4](https://github.com/equinor/sepes-web/commit/c0724f47420dce74a8f47c17a23b32d2e9b6729e)), closes [#660](https://github.com/equinor/sepes-web/issues/660)
* **homepage:** issue with margin ([d8ebc06](https://github.com/equinor/sepes-web/commit/d8ebc064033ded15f2d9cb3c8b82bd291285f815)), closes [#657](https://github.com/equinor/sepes-web/issues/657)
* error when mapping the resource array. Probably when the api call failed ([5b83c8a](https://github.com/equinor/sepes-web/commit/5b83c8aefb03ae675cc9a1a3541eaf0877ec3b1a)), closes [#636](https://github.com/equinor/sepes-web/issues/636)
* upgrade @typescript-eslint/parser from 4.14.2 to 4.15.0 ([2bbf0c2](https://github.com/equinor/sepes-web/commit/2bbf0c2be6d829bd8c71aa9bd3e4130947f434ed))
* **logo:** issue when uplading a transparent logo to a study. ([be30743](https://github.com/equinor/sepes-web/commit/be30743cdb1667dc448e588e66eebb805d8359f3)), closes [#649](https://github.com/equinor/sepes-web/issues/649)
* specify that only A-Z characters are allowed in study and sandbox name ([826f0e8](https://github.com/equinor/sepes-web/commit/826f0e8a5f859bdd4766140e2f07c7ef50787f3a)), closes [#600](https://github.com/equinor/sepes-web/issues/600)
* **dataset:** cache sas token for some times to speed up file upload ([26eaf6b](https://github.com/equinor/sepes-web/commit/26eaf6b1241f47495fbc3bfae7bbea2b1dedb1b6)), closes [#646](https://github.com/equinor/sepes-web/issues/646)
* **logos:** fixed issue where logos got stretched out when they were not perfect squares ([50d9f6f](https://github.com/equinor/sepes-web/commit/50d9f6f7b9d2595c53c6128d7fb57707de5859cb)), closes [#641](https://github.com/equinor/sepes-web/issues/641)
* **sandbox:** Disable make available when there is a VM with open int… ([#632](https://github.com/equinor/sepes-web/issues/632)) ([568841e](https://github.com/equinor/sepes-web/commit/568841eb7ee248f826604ccafa15d81d64b8d546))
* **studyList:** change icon for hidden/not hidden study ([534adc8](https://github.com/equinor/sepes-web/commit/534adc8e57130ea8dc0ed04e73e4e636524f8419)), closes [#640](https://github.com/equinor/sepes-web/issues/640)
* **vm:** issue with vm rules state ([#642](https://github.com/equinor/sepes-web/issues/642)) ([86654f8](https://github.com/equinor/sepes-web/commit/86654f80b791b06aad8bf7aa5dc847cca43f287b)), closes [#635](https://github.com/equinor/sepes-web/issues/635)
* upgrade @azure/storage-blob from 12.4.0 to 12.4.1 ([5c981d9](https://github.com/equinor/sepes-web/commit/5c981d958153a9d6b47976645db3ebac609ffe96))
* upgrade bootstrap from 4.5.3 to 4.6.0 ([3a80baa](https://github.com/equinor/sepes-web/commit/3a80baa9b4dfa4b6a6534a74d909ea6a27f33520))
* upgrade commitizen from 4.2.2 to 4.2.3 ([0648659](https://github.com/equinor/sepes-web/commit/06486594542ba566ad8ebdb07bbdbf6a08401755))
* upgrade react-dropzone from 11.2.4 to 11.3.0 ([f6c46e0](https://github.com/equinor/sepes-web/commit/f6c46e00cdfb1b27bfe707cd3dd428ffc6e7b47f))

### [0.1.15](https://github.com/equinor/sepes-web/compare/0.1.14...0.1.15) (2021-02-24)


### Features

* **dataset:** Multiple progress bars when uploading files. Ability t… ([#611](https://github.com/equinor/sepes-web/issues/611)) ([d0c69c0](https://github.com/equinor/sepes-web/commit/d0c69c07a4def2576be286a0925affa70d6266bf)), closes [#603](https://github.com/equinor/sepes-web/issues/603)
* **sandbox:** data set restriction now updates after which data sets… ([#559](https://github.com/equinor/sepes-web/issues/559)) ([6cd411d](https://github.com/equinor/sepes-web/commit/6cd411de0dddc52db823d3bf4912bb0a31897760))


### Bug Fixes

* **study:** results and learnings bug when clicking cancel ([af63f67](https://github.com/equinor/sepes-web/commit/af63f6743c485ca0f1beabe33d554e797b1c9dbb))
* autofocus text fields where it makes sense. Delete resource component and create study ([c4d5191](https://github.com/equinor/sepes-web/commit/c4d5191c632f07a7680cd75dd96a46dee1763248))
* issue where deleting a sandbox would not cancel request that resulted in an error. Also cancel other requests when leaving pages ([55980e3](https://github.com/equinor/sepes-web/commit/55980e3e350bf0217772238957fc52e3d1101ff4)), closes [#577](https://github.com/equinor/sepes-web/issues/577)
* memory leak for results and learnings and getting files in dataset ([#630](https://github.com/equinor/sepes-web/issues/630)) ([d121c3e](https://github.com/equinor/sepes-web/commit/d121c3e7951caa0de7dc0f16888491107cb93858)), closes [#599](https://github.com/equinor/sepes-web/issues/599)
* some codeQL notes ([34c52a2](https://github.com/equinor/sepes-web/commit/34c52a2d21fb22b497e66a2c9da436ffd51fd0db))
* upgrade @azure/storage-blob from 12.3.0 to 12.4.0 ([57564da](https://github.com/equinor/sepes-web/commit/57564da9c33901683f8594b7678b4bd9bd0e5f0c))
* upgrade @material-ui/core from 4.11.2 to 4.11.3 ([338bc06](https://github.com/equinor/sepes-web/commit/338bc0629552652eac929e485d48ff7d30176c06))
* upgrade @microsoft/applicationinsights-web from 2.5.10 to 2.5.11 ([96a4f4c](https://github.com/equinor/sepes-web/commit/96a4f4c954644925a7637b2c2e1535bf02bc189d))
* upgrade @microsoft/applicationinsights-web from 2.5.6 to 2.5.10 ([1b0d55e](https://github.com/equinor/sepes-web/commit/1b0d55e1dec3dcf6cf910e58d012629cead1d047))
* upgrade @types/node from 12.19.12 to 12.19.15 ([e205d8b](https://github.com/equinor/sepes-web/commit/e205d8b022638eff75f968b9198c50fa56c9fdb0))
* upgrade @types/react-dom from 16.9.7 to 16.9.10 ([ffbc41f](https://github.com/equinor/sepes-web/commit/ffbc41faf56aee77bbdb6858fe9e78e88886cd69))
* upgrade @types/react-router-dom from 5.1.5 to 5.1.7 ([f60ce12](https://github.com/equinor/sepes-web/commit/f60ce12facf0316ca83c25a15c3c6d5b29630086))
* upgrade @typescript-eslint/eslint-plugin from 4.12.0 to 4.14.0 ([#554](https://github.com/equinor/sepes-web/issues/554)) ([569f277](https://github.com/equinor/sepes-web/commit/569f2776edb4ca13635931f87f5be34d8d3176b3))
* upgrade @typescript-eslint/eslint-plugin from 4.14.0 to 4.14.1 ([#589](https://github.com/equinor/sepes-web/issues/589)) ([0688af5](https://github.com/equinor/sepes-web/commit/0688af538e17b06b38a9f057c786fc3684669e2f))
* upgrade @typescript-eslint/eslint-plugin from 4.14.1 to 4.14.2 ([#620](https://github.com/equinor/sepes-web/issues/620)) ([f7cdcf2](https://github.com/equinor/sepes-web/commit/f7cdcf2b0a9d04a9c2ed37dc46cbce74e7e98325))
* upgrade @typescript-eslint/parser from 4.14.0 to 4.14.1 ([2d288d5](https://github.com/equinor/sepes-web/commit/2d288d5dd58df53005e9d8ebe8d616928bd501dd))
* upgrade @typescript-eslint/parser from 4.14.1 to 4.14.2 ([258f68f](https://github.com/equinor/sepes-web/commit/258f68f632ad2119a2458baabc5d502ba99743cd))
* upgrade animate.css from 4.1.0 to 4.1.1 ([385dc5b](https://github.com/equinor/sepes-web/commit/385dc5b8e083b1943d064a01df871a220f6ff811))
* upgrade browser-image-compression from 1.0.12 to 1.0.14 ([ab6bb77](https://github.com/equinor/sepes-web/commit/ab6bb77470990f8f1101be7496a4f7db267e16e5))
* upgrade enzyme-adapter-react-16 from 1.15.4 to 1.15.6 ([cb848d4](https://github.com/equinor/sepes-web/commit/cb848d4dc97db24ccca8ce6f5bea8cab7eeacf27))
* upgrade react-copy-to-clipboard from 5.0.2 to 5.0.3 ([40fa499](https://github.com/equinor/sepes-web/commit/40fa499836b4e3cf370b9d57cc2286330fb35a57))
* upgrade react-notifications-component from 2.4.0 to 2.4.1 ([e1cdace](https://github.com/equinor/sepes-web/commit/e1cdacee7d83ea9d5b4e3609d0722b6aea4ed239))
* upgrade react-router from 5.1.2 to 5.2.0 ([#623](https://github.com/equinor/sepes-web/issues/623)) ([22775e3](https://github.com/equinor/sepes-web/commit/22775e3edf2047a8e3849bdef4e4b4e925291a10))
* **dataset:** bug where canceling while getting sas token did not cancel the file upload. Tooltip for same files is now removed if they upload again. Fixed bug when dataset got deleted while getting files caused an error ([f54c5c3](https://github.com/equinor/sepes-web/commit/f54c5c3fe4a9bd826bba6bc2bb79b53e6d4f7519)), closes [#565](https://github.com/equinor/sepes-web/issues/565) [#566](https://github.com/equinor/sepes-web/issues/566) [#567](https://github.com/equinor/sepes-web/issues/567)
* **dataset:** file upload multiple issues and new text when leaving page during download ([#614](https://github.com/equinor/sepes-web/issues/614)) ([81c7294](https://github.com/equinor/sepes-web/commit/81c72943f2362b51f62ae65bc10da7545328450c))
* **dataset:** if a file is being uploaded and the user tries to go back, a promt will display that work will be lost. File upload will cancel if the user accepts ([7118140](https://github.com/equinor/sepes-web/commit/7118140da36afa1496c909352843c1b844abf2d1)), closes [#570](https://github.com/equinor/sepes-web/issues/570)
* **dataset:** if user does not have access to upload, it will say so … ([#581](https://github.com/equinor/sepes-web/issues/581)) ([eccd559](https://github.com/equinor/sepes-web/commit/eccd55955793ff4d927c2c21070f29e003eb4b7a)), closes [#575](https://github.com/equinor/sepes-web/issues/575)
* **participants:** disable role selection while adding a participant is in progress ([b219695](https://github.com/equinor/sepes-web/commit/b2196957aeba9e36bc94517e2ab604b6cc940e35)), closes [#595](https://github.com/equinor/sepes-web/issues/595)
* **participants:** only the roles a user can give will now show in the dropbox ([62d97f4](https://github.com/equinor/sepes-web/commit/62d97f456d9ebb004a96cadecf0cbb37e6c6c37e))
* **sandbox:** add loading screen to next phase so user are unable to do actions that are not allowed during phase shift. For example adding data sets ([e784f1f](https://github.com/equinor/sepes-web/commit/e784f1fa1bbf84102237aab1233bb305e20e0b6f)), closes [#568](https://github.com/equinor/sepes-web/issues/568)
* **sandbox:** disable create sandbox button when WBS code is missing from study ([d0c41e1](https://github.com/equinor/sepes-web/commit/d0c41e138d8b850b758c3bdbe1c4eb022ec75271)), closes [#597](https://github.com/equinor/sepes-web/issues/597)
* **sandbox:** new icon for back to study button and fixed margin. Fixed margin for cost link ([11e0e25](https://github.com/equinor/sepes-web/commit/11e0e25f7825996d84692b5db7af2cdcfc274b7b)), closes [#576](https://github.com/equinor/sepes-web/issues/576)
* **study:** disable deletion of study when there are sandboxes active ([fe0bb6e](https://github.com/equinor/sepes-web/commit/fe0bb6e23cbebbc81233e1cf8432930070780fab)), closes [#598](https://github.com/equinor/sepes-web/issues/598)
* **study:** some margins did not line up between tabs ([491e6ae](https://github.com/equinor/sepes-web/commit/491e6ae1d8659b0ec36a3d330fa43e52caf0f8cd)), closes [#585](https://github.com/equinor/sepes-web/issues/585)
* **study:** when navigating to a study from the home page, it will no… ([#587](https://github.com/equinor/sepes-web/issues/587)) ([a9d965a](https://github.com/equinor/sepes-web/commit/a9d965ae235d1ae4e4137faef2e4af94390711fc))
* **vm:** disable create vm button until price of the vm is calculated. ([201afc4](https://github.com/equinor/sepes-web/commit/201afc4da2020b80337e09cf2373bb7a49e9af2d)), closes [#601](https://github.com/equinor/sepes-web/issues/601)
* **vm:** remove hover color on rules ([e50efbb](https://github.com/equinor/sepes-web/commit/e50efbba66d0f1684a05c6e083987421ab975fc3)), closes [#602](https://github.com/equinor/sepes-web/issues/602)
* upgrade react-select from 3.1.0 to 3.2.0 ([9952137](https://github.com/equinor/sepes-web/commit/99521377629db544d8d82c7d0d6c840675877246))

### [0.1.14](https://github.com/equinor/sepes-web/compare/0.1.13...0.1.14) (2021-02-10)


### Bug Fixes

* **dataset:** file upload now uploads directly to azure blob storage ([#545](https://github.com/equinor/sepes-web/issues/545)) ([52b956f](https://github.com/equinor/sepes-web/commit/52b956f6560abffdd9513f24be61daa906a2535e))
* **homepage:** changed height of text box to a static height ([df10c02](https://github.com/equinor/sepes-web/commit/df10c02f2aee140fb48843885228c9e642a40941))
* **homepage:** Updated text describing what Sepes is ([222189d](https://github.com/equinor/sepes-web/commit/222189d784091c3b199873f41b54ea0280b8e8ea)), closes [#544](https://github.com/equinor/sepes-web/issues/544)
* add general error screen if permissions api call receives an error. Also refactor structure of common files ([af06deb](https://github.com/equinor/sepes-web/commit/af06deb74c5907f0fd2d6da7b0edcb71eb4c98cf)), closes [#538](https://github.com/equinor/sepes-web/issues/538)
* remove hover color and point on tables where it makes sense. Fix… ([#540](https://github.com/equinor/sepes-web/issues/540)) ([043cc46](https://github.com/equinor/sepes-web/commit/043cc465013996a5dfd31d5723eee83a624bedd1))
* remove step 3 and 4 from sandbox stepper. Change text when clicking make available in sandbox ([6ff8fc5](https://github.com/equinor/sepes-web/commit/6ff8fc5069cfabcae08cfcbbb4d7d521ade11ce8))
* upgrade @fortawesome/fontawesome-free from 5.13.0 to 5.15.2 ([d041458](https://github.com/equinor/sepes-web/commit/d0414586968620b02383845411059b024bb18f85))
* upgrade @material-ui/core from 4.10.0 to 4.11.2 ([dfebada](https://github.com/equinor/sepes-web/commit/dfebada42b3e79b3fe0137603507b1bf7dd924a9))
* upgrade @types/react-router from 5.1.7 to 5.1.11 ([4b4da6a](https://github.com/equinor/sepes-web/commit/4b4da6a063491a215ce55502fdccdc126de8f96a))
* upgrade @types/reactstrap from 8.4.2 to 8.7.1 ([#536](https://github.com/equinor/sepes-web/issues/536)) ([ae97696](https://github.com/equinor/sepes-web/commit/ae97696feb7270c31dddddcce581f94ab387e028))
* upgrade @typescript-eslint/parser from 4.12.0 to 4.14.0 ([77f08e0](https://github.com/equinor/sepes-web/commit/77f08e0b9ffa3b3c8ba717ed4acd17f6f86f4a48))
* upgrade bootstrap from 4.4.1 to 4.5.3 ([367a892](https://github.com/equinor/sepes-web/commit/367a892b1965c43f2220653dc71163fcb34cbb13))
* upgrade commitizen from 4.1.3 to 4.2.2 ([36167d2](https://github.com/equinor/sepes-web/commit/36167d2255c83c365631fc8caefcb7d004c43868))
* **dataset:** timeout of upload of large files. Also if a file upload is cancelled because of an api error, it is now removed from the list of files in the dataset. Size of files is now displayed in appropriate sizes. ([383f971](https://github.com/equinor/sepes-web/commit/383f971f3f8a3d3ea2a2fbeffced1dc8c679e29c)), closes [#541](https://github.com/equinor/sepes-web/issues/541) [#537](https://github.com/equinor/sepes-web/issues/537)
* upgrade react-dropzone from 11.0.1 to 11.2.4 ([d8614d8](https://github.com/equinor/sepes-web/commit/d8614d8f794e75dfc6c0193a1cd354458259298c))
* upgrade reactstrap from 8.4.1 to 8.8.1 ([b6d8796](https://github.com/equinor/sepes-web/commit/b6d879625b42ec075ba83308b1003254341753b0))

### [0.1.13](https://github.com/equinor/sepes-web/compare/0.1.12...0.1.13) (2021-02-03)


### Bug Fixes

* add a "unable to reach api" page if the api can not be reached ([3370893](https://github.com/equinor/sepes-web/commit/3370893b37e924c9cbfbfc780a62ad1a326698c8)), closes [#502](https://github.com/equinor/sepes-web/issues/502)
* unable to reach api component displayed if you are not admin ([13ddc2c](https://github.com/equinor/sepes-web/commit/13ddc2c22551e6f953c400afecd036697f939f1b))
* upgrade @azure/storage-blob from 12.1.2 to 12.3.0 ([#518](https://github.com/equinor/sepes-web/issues/518)) ([11d3e5e](https://github.com/equinor/sepes-web/commit/11d3e5ebaf8a830bebb16ab9af5f00a7402c6bc2))
* upgrade @types/node from 12.12.37 to 12.19.12 ([d5b301a](https://github.com/equinor/sepes-web/commit/d5b301ad7f02921b30eb32baa9dbddddb375c079))
* upgrade @types/react from 16.9.34 to 16.14.2 ([#521](https://github.com/equinor/sepes-web/issues/521)) ([681eed1](https://github.com/equinor/sepes-web/commit/681eed18762e4460fcc39530fddef9b3b9b944f4))
* upgrade @types/styled-components from 5.1.0 to 5.1.7 ([6d9b949](https://github.com/equinor/sepes-web/commit/6d9b9491289cd0a7b1f0389b2ae829fa126b5349))
* upgrade @typescript-eslint/eslint-plugin from 4.8.2 to 4.12.0 ([#520](https://github.com/equinor/sepes-web/issues/520)) ([2291918](https://github.com/equinor/sepes-web/commit/22919181703103f84a0ed4fb30354ac63445c716))
* upgrade @typescript-eslint/parser from 4.8.2 to 4.12.0 ([7238368](https://github.com/equinor/sepes-web/commit/7238368cd170ce995441b0a9122d4b88184ea069))
* upgrade msal from 1.3.0 to 1.4.4 ([#528](https://github.com/equinor/sepes-web/issues/528)) ([2b3ae76](https://github.com/equinor/sepes-web/commit/2b3ae769e2dc718cfacc795dadb22cee8065aa9b))
* **dataset:** add tooltip with status of the storage account ([c190221](https://github.com/equinor/sepes-web/commit/c19022155c8935193f84225ca204594b0e5d6d54)), closes [#504](https://github.com/equinor/sepes-web/issues/504)
* **dataset:** cache issue when editing a dataset and going back ([d34cb63](https://github.com/equinor/sepes-web/commit/d34cb63624e84a63c47bf5bf0724fb5606502680))
* **dataset:** dragging a file into the dropzone now changes the color of that component. Easier to know you are dropping it in the correct place ([b19cd4e](https://github.com/equinor/sepes-web/commit/b19cd4ec4bdebc7dd9c3e443cb72486b1dd669e2)), closes [#511](https://github.com/equinor/sepes-web/issues/511)
* **sandbox:** automatically update cost analysis link when resource group is ready ([bb56422](https://github.com/equinor/sepes-web/commit/bb56422fb692eb223c39c103ce8ed920fe8da355)), closes [#524](https://github.com/equinor/sepes-web/issues/524)
* upgrade styled-components from 5.1.0 to 5.2.1 ([9e90e00](https://github.com/equinor/sepes-web/commit/9e90e00494f55369229886e657ddf697450b2f5a))
* **dataset:** files uploaded not showing ([57f168b](https://github.com/equinor/sepes-web/commit/57f168bd450c3908455088bf4ce78ef2fb021d78))
* **dataset:** much shorter redirect time for creating a dataset. Now … ([#496](https://github.com/equinor/sepes-web/issues/496)) ([9a509bc](https://github.com/equinor/sepes-web/commit/9a509bc9ce5489d2f3bfb69b089083c4e9bcb960))
* **dataset:** Validate datasetId and do not allow anything but whole … ([#522](https://github.com/equinor/sepes-web/issues/522)) ([eab3d3e](https://github.com/equinor/sepes-web/commit/eab3d3eb82bb4730171cfde1820bd64323523e09)), closes [#516](https://github.com/equinor/sepes-web/issues/516)
* **study:** now supporting a much lighter dto from backend ([#510](https://github.com/equinor/sepes-web/issues/510)) ([ea4ee75](https://github.com/equinor/sepes-web/commit/ea4ee757f4a6c7f27c1a96db597b17b1d4bfa94b))
* **vm:** users now have to pick os before picking a usernames. This is because what usernames is allowed is affected by operating system ([aba5bd9](https://github.com/equinor/sepes-web/commit/aba5bd983d0accec9f989c2119883e4c0e370aa2)), closes [#481](https://github.com/equinor/sepes-web/issues/481)
* add table hover color and make entire rows clickable ([da017f3](https://github.com/equinor/sepes-web/commit/da017f31f273dfb42dbbca99ae557b19a8c35deb))
* issue where space were not allowed for study, sandbox and vm name ([b267018](https://github.com/equinor/sepes-web/commit/b267018fc89588762b47a544c8191510f6bcd962))
* make entire sandbox cell in a study clickable ([bb2faed](https://github.com/equinor/sepes-web/commit/bb2faedb143ced555ed83c7c184f4cae95eb079b)), closes [#506](https://github.com/equinor/sepes-web/issues/506)
* make name of sandbox, vm and study names required to have a length of minimum 3 and consist of only letters and numbers ([71f0ac7](https://github.com/equinor/sepes-web/commit/71f0ac737589009cc94f8e4d54ff9ec89bf74a55))
* package.json & package-lock.json to reduce vulnerabilities ([d58643d](https://github.com/equinor/sepes-web/commit/d58643d5d619069ad92be530919de3c1884c300c))
* package.json & package-lock.json to reduce vulnerabilities ([285cfd6](https://github.com/equinor/sepes-web/commit/285cfd62d32231a89ce9a4100ecc45122bb1de22))
* remove study defaults tab, remove top bar until datasets functuinality comes back, fixed spelling error, increase margin for Hardware Requirements ([fc58571](https://github.com/equinor/sepes-web/commit/fc58571a00b8466c62e85e0814f1d21c77d1c185))
* **dataset:** edit meta data for dataset displayed the "you do not have access" screen when the user had access ([e65bd13](https://github.com/equinor/sepes-web/commit/e65bd13b8b36848913ccca5e201d981da3c94b76)), closes [#480](https://github.com/equinor/sepes-web/issues/480)
* **participants:** added fixed width of add participant button ([625b349](https://github.com/equinor/sepes-web/commit/625b3497657d9a8443ddac3588d8b0bf649aa79c)), closes [#482](https://github.com/equinor/sepes-web/issues/482)

### [0.1.12](https://github.com/equinor/sepes-web/compare/0.1.11...0.1.12) (2021-01-27)

### [0.1.11](https://github.com/equinor/sepes-web/compare/0.1.10...0.1.11) (2021-01-26)

### [0.1.10](https://github.com/equinor/sepes-web/compare/0.1.9...0.1.10) (2021-01-21)


### Bug Fixes

* **dataset:** bug where notfound page displayed for a second before general dataset. (not study specifi) ([6ce3b20](https://github.com/equinor/sepes-web/commit/6ce3b20a8e20017b64d5f4e3476ed2659696916c)), closes [#455](https://github.com/equinor/sepes-web/issues/455)
* **dataset:** disable the create button when the location field is not filled out ([844f90d](https://github.com/equinor/sepes-web/commit/844f90d07694b3041fb76e5e414b55c3b8e7bbc1)), closes [#441](https://github.com/equinor/sepes-web/issues/441)
* **participants:** delay search so that the user can finish typing before making an api call ([#474](https://github.com/equinor/sepes-web/issues/474)) ([22971d6](https://github.com/equinor/sepes-web/commit/22971d6b03feeb4a049951f59c55115af02b6223)), closes [#467](https://github.com/equinor/sepes-web/issues/467)
* **participants:** issue where removing yourself as a participant redirected you even though you still had other roles active in Sepes ([c654553](https://github.com/equinor/sepes-web/commit/c65455346a2c5cfc9798b34c182b50fe50ec034b)), closes [#466](https://github.com/equinor/sepes-web/issues/466)
* **sandbox:** add password validation input so it is easier for the user to know the password is valid or not. Also fixed an issue where an 8 character long password was valid, when the minimum should be 12 ([6458b5b](https://github.com/equinor/sepes-web/commit/6458b5b4bfd91f452ca4cbc1b3f05852b78f75a7)), closes [#427](https://github.com/equinor/sepes-web/issues/427)
* **sandbox:** dataset list not automatically refreshed when a new dataset was added to the study ([212398a](https://github.com/equinor/sepes-web/commit/212398a2f00317ae4ca86beefb9634eee0be0166)), closes [#452](https://github.com/equinor/sepes-web/issues/452)
* **sandbox:** dataset list not updating when going out and back into a sandbox ([7495d41](https://github.com/equinor/sepes-web/commit/7495d41182491f15f6bc78b2cbd0d025b566e39e)), closes [#449](https://github.com/equinor/sepes-web/issues/449)
* **sandbox:** disable make available button if there is no data set added to the sandbox ([7d2cbc2](https://github.com/equinor/sepes-web/commit/7d2cbc2c88ba0b757a121018e883f9b01e9c2f7c)), closes [#432](https://github.com/equinor/sepes-web/issues/432)
* **sandbox:** error when clicking checkbox very fast could make the state of the checkbox false ([5d9d029](https://github.com/equinor/sepes-web/commit/5d9d029d53294119ccc4bad3561f646c22330be0)), closes [#433](https://github.com/equinor/sepes-web/issues/433)
* **sandbox:** update sandbox resource list on user actions and not only on a set interval ([e5bab90](https://github.com/equinor/sepes-web/commit/e5bab90b8b15052a19a91f4ec1d86db74f2c4e70)), closes [#430](https://github.com/equinor/sepes-web/issues/430)
* **study:** checkbox for hidden/not hidden should default to be not hidden ([#472](https://github.com/equinor/sepes-web/issues/472)) ([efdc005](https://github.com/equinor/sepes-web/commit/efdc0055bc8b4f3f9dac791ad1383963272f545c)), closes [#469](https://github.com/equinor/sepes-web/issues/469)
* **study:** fixed some margins on resize ([12bdc3c](https://github.com/equinor/sepes-web/commit/12bdc3c7e88c40232f18e112ee5d66535b3799fe))
* **study:** increase max width of tabs so they fill out the window with normal resolutions ([c3f735c](https://github.com/equinor/sepes-web/commit/c3f735ca72cafee40b3de133c727472d0209806c))
* **study:** increase white space when many datasets are added to a study ([a9335be](https://github.com/equinor/sepes-web/commit/a9335be2636dd6be0607fe4f28d30e87680b9a63)), closes [#457](https://github.com/equinor/sepes-web/issues/457)
* **study:** moved settings wheel to top right corner ([973a902](https://github.com/equinor/sepes-web/commit/973a902cbbe60b711247b039b149e714d1bb1d05)), closes [#464](https://github.com/equinor/sepes-web/issues/464)
* **vm:** issue caused when writing question mark in the study name as a part of the vm name. ([#473](https://github.com/equinor/sepes-web/issues/473)) ([95f1985](https://github.com/equinor/sepes-web/commit/95f1985454588bb0fae90b43823f88e926f7837a)), closes [#468](https://github.com/equinor/sepes-web/issues/468)
* **vm:** updated to new endpoint for getting cost of vm ([dadbcfe](https://github.com/equinor/sepes-web/commit/dadbcfe274990c5397caed033a85f6df9f1ee896))
* **vm:** validate username. Some username is not allowed and will not show a text explaining which names are not allowed ([#471](https://github.com/equinor/sepes-web/issues/471)) ([a48a578](https://github.com/equinor/sepes-web/commit/a48a5787718bd71c31998b9475a7237c58f7fdde)), closes [#470](https://github.com/equinor/sepes-web/issues/470)
* general codeql warnings and notes ([8606a8b](https://github.com/equinor/sepes-web/commit/8606a8b71e2b878ee15a0444851f942622e9c60d))
* issue with permission when going to next phase in a sandbox. Open internet should be disabled for everyone except for admins ([1fe5631](https://github.com/equinor/sepes-web/commit/1fe56315990da16444aaa5faeaae0a38bb47383f))
* loading screen on deleting resources now display immediately aft… ([#463](https://github.com/equinor/sepes-web/issues/463)) ([cf58270](https://github.com/equinor/sepes-web/commit/cf582700758bc76bba76117e26cd9d027c53477e)), closes [#462](https://github.com/equinor/sepes-web/issues/462)

### [0.1.9](https://github.com/equinor/sepes-web/compare/0.1.8...0.1.9) (2021-01-05)


### Features

* **files:** added progress bar ([0820f0b](https://github.com/equinor/sepes-web/commit/0820f0bfcae54e5e10ed88bd576e3f54739d8f08)), closes [#398](https://github.com/equinor/sepes-web/issues/398)
* **sandbox:** data can now be made available to sandbox ([8e917d5](https://github.com/equinor/sepes-web/commit/8e917d5b8ac57579e600fbd0d7648e032b045622))


### Bug Fixes

* **sandbox:** make available button resized on load ([a518abc](https://github.com/equinor/sepes-web/commit/a518abcb696ec755cc97412a1208680e06e67f8b))
*  bug where an error happened when switching tab right after creating a study ([7ae794f](https://github.com/equinor/sepes-web/commit/7ae794fac87934df92040e8548634bac7ca96402))
* bug where data sets in sandbox where not always checking. Also added tooltip to make available button in sandbox ([d0e5f85](https://github.com/equinor/sepes-web/commit/d0e5f858281aa279772d5980ab33aa4712725e3c)), closes [#428](https://github.com/equinor/sepes-web/issues/428)
* not found page showing on create study ([100d479](https://github.com/equinor/sepes-web/commit/100d4796b6a2c0c9a40e159d97ff810b6769f996))
* **create dataset:** added tooltip on create VM button. Changed colors of input icons on textfields. Updated EDS to latest version ([70f7096](https://github.com/equinor/sepes-web/commit/70f70966d7705801c2f20098597f5e8c95a57ed7))
* **create sandbox:** can not select region ([c5f77d6](https://github.com/equinor/sepes-web/commit/c5f77d6556da309eded40643ba7fcf3855d27977))
* **create vm:** Creating vms should be possible on step 2 ([b87b3e2](https://github.com/equinor/sepes-web/commit/b87b3e23bb95a44fec6ca8584c5f3c25fc2fcde2))
* **datasets:** bug ([b908829](https://github.com/equinor/sepes-web/commit/b908829fbccf62a23b0a9fa45d2488881ea2bca4))
* **datasets:** cache bug when remove/add files ([ae977bc](https://github.com/equinor/sepes-web/commit/ae977bc60696e3cbe26243a10bbe5b3adfb7fc7b))
* **delete sandbox:** fixed a bug where sepes tried to find resources for a deleted study ([4f70028](https://github.com/equinor/sepes-web/commit/4f70028a5e938b316f8ccd030e106ef0644349fd)), closes [#298](https://github.com/equinor/sepes-web/issues/298)
* **file upload:** support all file types ([edb55c4](https://github.com/equinor/sepes-web/commit/edb55c442e981f2da641feaa5b5139301055adc1))
* **login:** removed user.read scope from login url ([#406](https://github.com/equinor/sepes-web/issues/406)) ([fb926e7](https://github.com/equinor/sepes-web/commit/fb926e7f5cb4aaadc5c4552008c3c2eefcff0fcf))
* **results and learnings:** stop fetching if user do not have permission to read ([44caa0d](https://github.com/equinor/sepes-web/commit/44caa0d0ce1ac3d0c90b62b056448d176c1f8a60))
* **sandbox:** bug where step would not increase if user clicked Make available" ([4931bd4](https://github.com/equinor/sepes-web/commit/4931bd4f398394613abb130ff1ac68fa7380ec0b))
* **sandbox:** disable make available button if not all resources have status OK or there is no VMs in the sandbox ([5ab394e](https://github.com/equinor/sepes-web/commit/5ab394ea45cfd1c63692a900f6022fcf283956ce))
* **sandbox:** disable open internet button on phase 2. Disable Make available button when user clicks so it is not possbile to make multiple calls ([4443b68](https://github.com/equinor/sepes-web/commit/4443b68f1e0c6f169f9459c419b56d6824e89325))
* **sandbox:** enable make available button if next phase call fails ([b33ee73](https://github.com/equinor/sepes-web/commit/b33ee7346c03f1a6c6d8128b1cd7ccf770a22207))
* **sandbox:** if sandbox was in phase 2, the ui would jump between phase 1 and 2 first ([161e76a](https://github.com/equinor/sepes-web/commit/161e76a6e826f474fc192ab6cb62409c83e635ef))
* **sandbox:** make open internet button available on phase 2 for those who have permission ([deacf46](https://github.com/equinor/sepes-web/commit/deacf46f86dc7a142cd17c09b3c198dca03a74f5))
* **sandbox:** name of sandbox dissapeared on phase 2 ([8cd8b71](https://github.com/equinor/sepes-web/commit/8cd8b71be638c1f334510d89204568da7225c05c))
* **sandbox resources:** stop calling api if this call fails ([5c1280f](https://github.com/equinor/sepes-web/commit/5c1280fd3df6eee1a3db31f5001d25db55d99841)), closes [#408](https://github.com/equinor/sepes-web/issues/408)
* **sandox:** center loading icon when clickimg make available ([4754ce6](https://github.com/equinor/sepes-web/commit/4754ce6be78fe898b4223211053331cb714fbb35))
* **study and sandbox:** add loading screen if deleting a study or sandbox takes a while. For instance if a study needs to delete datasets as well as the study when user deletes study ([d23d9ee](https://github.com/equinor/sepes-web/commit/d23d9eeb7551e176b5aef62367e15b4c570674d9)), closes [#413](https://github.com/equinor/sepes-web/issues/413)
* **study logo:** fixed bug where user did not be able to reselect logo ([d38c8c1](https://github.com/equinor/sepes-web/commit/d38c8c1023628cde9f99e2010bf2ee5a0551627e)), closes [#401](https://github.com/equinor/sepes-web/issues/401)
* **tab control:** update tab focus on dropdown so it drops on focus. Also autofocuses fields where it makes sense ([1bfdb38](https://github.com/equinor/sepes-web/commit/1bfdb38ece1f76d8fc7d74f94fd56cfcd3772a9a)), closes [#202](https://github.com/equinor/sepes-web/issues/202)
* **vm:** remove label on create button when creating a vm is in progress ([6622c59](https://github.com/equinor/sepes-web/commit/6622c596a1d441b6780e6ded32fd5fc588e1cef3))
* added general notfound page to datasets and sandboxes. As well as any other paths/urls that does not match resources ([e4f0f10](https://github.com/equinor/sepes-web/commit/e4f0f102a0daca18b7449b2147ece7dccf8d17a7))
* added not found page if user types an id to a study that does not exist or has been deleted ([a1aec69](https://github.com/equinor/sepes-web/commit/a1aec6949502c93f5fb1e527aeea4d6bd8ae51b0)), closes [#409](https://github.com/equinor/sepes-web/issues/409)
* codeql warnings and notes ([a2ee820](https://github.com/equinor/sepes-web/commit/a2ee8206907dd5330e035a652f99cf8ab6b078bf)), closes [#425](https://github.com/equinor/sepes-web/issues/425)
* console errors on all pages ([7759228](https://github.com/equinor/sepes-web/commit/7759228df1ba8697e640b560a9c1b6cf9d5bd6f9))
* update codeql analysis tool to be more strict ([a838fc3](https://github.com/equinor/sepes-web/commit/a838fc3d6748a2c03dd3d76b05930d115bc9dd82))

### [0.1.8](https://github.com/equinor/sepes-web/compare/0.1.7...0.1.8) (2020-12-10)


### Features

* **datasets:** add files upload ([029714e](https://github.com/equinor/sepes-web/commit/029714e809c86350d8a964a561040a867577cbb2))
* **datasets:** user can now delete datasets ([2bcf19c](https://github.com/equinor/sepes-web/commit/2bcf19c10b77f5a519f8428a8645ae7432e56c1f))


### Bug Fixes

* **api calls:** fix some cache issues and refactor api call hook ([4086307](https://github.com/equinor/sepes-web/commit/40863075a94665a7cb7284e81d9b109a8a655131)), closes [#389](https://github.com/equinor/sepes-web/issues/389)
* **create dataset:** hide storage account name ([a8cc67d](https://github.com/equinor/sepes-web/commit/a8cc67dc241bc011cd7fedd0f7038f3072ea46f7))
* **notification:** remove http code from popup ([6e38fa2](https://github.com/equinor/sepes-web/commit/6e38fa2ce0afd509c6400e9c9e7a35a7691ce773)), closes [#371](https://github.com/equinor/sepes-web/issues/371)
* **participant:** redirect user if they remove themselves as a participant in a study ([2ca781e](https://github.com/equinor/sepes-web/commit/2ca781e63c28f1e27947e4f932cc74f7e298ee76)), closes [#374](https://github.com/equinor/sepes-web/issues/374)
* **participants:** stop call to api if user do not have permission to add participants to a study ([29a4230](https://github.com/equinor/sepes-web/commit/29a4230344e06faa00d3ec57f11e157e919fb577))
* **results and learnings:** fixed a bug where study metadata and results and learnings overwrited eachother ([60ed6ea](https://github.com/equinor/sepes-web/commit/60ed6eaeb8dabc54d04d987e34c91bfa47af1d42)), closes [#390](https://github.com/equinor/sepes-web/issues/390)
* **studies:** update list when a study has been deleted ([0a70eff](https://github.com/equinor/sepes-web/commit/0a70effce4752059e594f72c210c8fc31f804099))
* **vm rules:** add input check IP and port number ([ffb8e80](https://github.com/equinor/sepes-web/commit/ffb8e809b22fff0929757add3a5cf0cdf67e7fa8))
* **vm rules:** disable save button if user writes inavlid port number ([abaf653](https://github.com/equinor/sepes-web/commit/abaf6539ba2843ad1c9693a198c0f80cd4f04dbd))

### [0.1.7](https://github.com/equinor/sepes-web/compare/0.1.6...0.1.7) (2020-12-02)


### Features

* add tooltips on buttons and controllable components to help users. Mainly information about why a button is disabled ([2e17355](https://github.com/equinor/sepes-web/commit/2e1735515d9c61457f052e9087bc439e6b1a6089))
* **study:** disable/enable functionality based on role ([#335](https://github.com/equinor/sepes-web/issues/335)) ([e6ffb68](https://github.com/equinor/sepes-web/commit/e6ffb689b4ebf5a9bd442e565685d21729dc6be2))
* added study and sandbox button dropdown ([a1a26f6](https://github.com/equinor/sepes-web/commit/a1a26f6daf18191bf71ed52418fabcf8c75ab2a3))
* **sandbox:** new delete button. Added a settings icon where the delete button is now placed ([a5049f9](https://github.com/equinor/sepes-web/commit/a5049f92ded554e651406af007ede570fc67e1c3))


### Bug Fixes

* **create study:** fixed bug where clicking new study made an api call ([6f42e43](https://github.com/equinor/sepes-web/commit/6f42e43e9216939c0c102db4c078040ea74b3bb6))
* **create study:** removed settings bar when creating a study. This option is not needed here, only when editing an exisiting study. ([0f7aaa5](https://github.com/equinor/sepes-web/commit/0f7aaa50711d0ce0a2374c623c1fe2b16a357ad4))
* **create study dataset:** issue with displaying no access screen when user had access. ([1683ab3](https://github.com/equinor/sepes-web/commit/1683ab35655d667992544f146428cd493086333e)), closes [#325](https://github.com/equinor/sepes-web/issues/325)
* **create vm:** updated helper text for VM Size options ([6b96155](https://github.com/equinor/sepes-web/commit/6b961555bbab51b7ac4e5f1432124cc3c6b470a1))
* **dataset details:** disabled edit metadata button if user do not have access ([58176c8](https://github.com/equinor/sepes-web/commit/58176c80f759c6546f385db0b37b9fd4fe98f348))
* **datasets:** disable create data set based on permission ([1ced3cb](https://github.com/equinor/sepes-web/commit/1ced3cbfca2b0df03cac1ecd4aaf8d2d3acc5d5a))
* **datasets:** remember selected columns filter for the table ([fff2cbf](https://github.com/equinor/sepes-web/commit/fff2cbfa696a1996cf52ef1f5b7088f7ec35369c))
* **edit dataset:** bug where the edit metadata button was disabled when the user had access ([73d9081](https://github.com/equinor/sepes-web/commit/73d9081a62489cde33758b593a3b0675cd44b71f))
* **sandbox:** stop call to api when user do not have permission to create a vm ([0f4e5bd](https://github.com/equinor/sepes-web/commit/0f4e5bd28416aa4276368c5ad8510a2e022f9179))
* **study:** tabs are now remembered when user navigates sepes ([acf3762](https://github.com/equinor/sepes-web/commit/acf37623ae800c0f9ad8e9ee0637c649f5ab766e)), closes [#331](https://github.com/equinor/sepes-web/issues/331)
* **study details:** fixed a bug where old info still displayed if you saved a study, went to the main screen and then back ([d5fd365](https://github.com/equinor/sepes-web/commit/d5fd3655397afed710b18585b7b0f3b52ae1f49f))
* **vm:** fixed a bug where vm rules reset when status turned to OK ([6d3ccd5](https://github.com/equinor/sepes-web/commit/6d3ccd531693104bd287182543f62e61a1b21b15)), closes [#322](https://github.com/equinor/sepes-web/issues/322)
* **vm rules:** add port validation ([100a036](https://github.com/equinor/sepes-web/commit/100a036fb13a1652025bc91c6fd9899c1b598c3a)), closes [#349](https://github.com/equinor/sepes-web/issues/349)
* **vm rules:** disable save button if two rules are equal ([c7bf898](https://github.com/equinor/sepes-web/commit/c7bf898a7d5b29d5856fb84c4ee132f9ca442296)), closes [#339](https://github.com/equinor/sepes-web/issues/339)
* issue with token renewal ([4cabba0](https://github.com/equinor/sepes-web/commit/4cabba06bfcd837473e9b8ba01996ff653fa27a2)), closes [#340](https://github.com/equinor/sepes-web/issues/340)
* **vm rules:** fixed dropdown and textfield for protocols. When clicking HTPP/S it now fills out field with correct value ([57494be](https://github.com/equinor/sepes-web/commit/57494be6f2bcf447ba68c6df67af79497f927eab))

### [0.1.6](https://github.com/equinor/sepes-web/compare/0.1.5...0.1.6) (2020-11-19)

### [0.1.5](https://github.com/equinor/sepes-web/compare/0.1.4...0.1.5) (2020-11-18)


### Features

* **sandbox:** add link to cost analysis ([d511caf](https://github.com/equinor/sepes-web/commit/d511caff71db02568869207d0a5244231a7b1bf2))
* **sandbox:** add resource status spinner/checkmark ([db40ee9](https://github.com/equinor/sepes-web/commit/db40ee988614228b8a426dcdd35b97b52fc1af2a))
* **study:** added delete functionality ([6c601ff](https://github.com/equinor/sepes-web/commit/6c601ff50eb6eb7676ad75b7cfcf7b484e4392e3))
* **studydetails datasets:** user can now see which sandbox a given datasets has been used in ([3d594e0](https://github.com/equinor/sepes-web/commit/3d594e0a0930dc35f4033bf02e53a99889b97e19))
* **vm details:** user can now set outboud rule ([f545ea6](https://github.com/equinor/sepes-web/commit/f545ea65508642fad56ea4e58c02efbca2bb898d))


### Bug Fixes

* refresh study when adding datasets to sandbox, make sandboxs for datasets clickable links, fixed styling of study details on resize ([c0ba613](https://github.com/equinor/sepes-web/commit/c0ba613d0ad82cee656d00cdd16ad9b705ba52f3))
* **create dataset:** added link to guidelines and data inventory ([e607a95](https://github.com/equinor/sepes-web/commit/e607a9591595fbf9ac86a35c7900184285fd12f3))
* **create vm:** added cache for sizes, os and disks ([68d0358](https://github.com/equinor/sepes-web/commit/68d03589a801715750f12101e21212170ab60a83))
* **create vm:** added required meta to all required fields ([3babf26](https://github.com/equinor/sepes-web/commit/3babf26b02bf47fd91a53c7a9643cc57cc2df415))
* **linting, formatting:** added prettier and new linting rules ([150b404](https://github.com/equinor/sepes-web/commit/150b404abe0696e8017b1ca37013f672028ececc))
* **sandbox:** increase interval of which resources table is updated ([8e801e9](https://github.com/equinor/sepes-web/commit/8e801e91a8ab141eccd9dfdcf21ca7a152819f86))
* removed loggins in console, fixed styling of but- ([da9a83f](https://github.com/equinor/sepes-web/commit/da9a83f5917c3951057185f57bf239330283fa2e))
* tooltip user top bar, margin participant table, clicking outside datasets filter closes it ([74a1f1c](https://github.com/equinor/sepes-web/commit/74a1f1cb93aed200b6b418dc92758437a22086be))
* update styling of create dataset page, datasets, vm and other pages to match figma. ([adfb08f](https://github.com/equinor/sepes-web/commit/adfb08f3a5c418758f118f6c39b20fab6a3dfe7f))
* **vm rules:** disable save button on cancel ([e623be1](https://github.com/equinor/sepes-web/commit/e623be1edac3a0647fc43ee31bd3b7a9dd65c3c6))
* **vm rules:** issue when creating new rule ([2127d7e](https://github.com/equinor/sepes-web/commit/2127d7e67f6283d2882673093dd92522a5c396a6))

### [0.1.4](https://github.com/equinor/sepes-web/compare/0.1.3...0.1.4) (2020-11-16)

### [0.1.3](https://github.com/equinor/sepes-web/compare/0.1.2...0.1.3) (2020-11-16)

### [0.1.2](https://github.com/equinor/sepes-web/compare/0.1.1...0.1.2) (2020-11-12)

### 0.1.1 (2020-11-11)
