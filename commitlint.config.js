const Configuration = {
  /*
   * Resolve and load @commitlint/config-conventional from node_modules.
   * Referenced packages must be installed
   */
  extends: ['@commitlint/config-conventional'],

  /*
   * Any rules defined here will override rules from @commitlint/config-conventional
   */
  rules: {
    'body-leading-blank': [2, 'always'],
    'header-max-length': [2, 'always', 50],
    'header-case': [2, 'always', 'lower-case'],
    'footer-leading-blank': [2, 'always'],
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'wip',
        'build',
        'ci',
        'docs',
        'style',
        'refactor',
        'perf',
        'test',
        'chore'
      ]
    ],
  },

  /*
  * Custom URL to show upon failure
  */
  helpUrl:
    'https://github.com/equinor/sdscoredev-handbook#git-commits',
};

module.exports = Configuration;
