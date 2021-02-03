# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
