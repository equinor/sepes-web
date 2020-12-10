# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

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
