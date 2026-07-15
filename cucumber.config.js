const common = {
  paths: ['src/features/**/*.feature'],
  require: ['src/step-definitions/**/*.ts', 'src/hooks/**/*.ts'],
  requireModule: ['ts-node/register'],
  format: [
    'progress-bar',
    'json:reports/cucumber-report.json',
    'html:reports/cucumber-report.html'
  ],
  formatOptions: { snippetInterface: 'async-await' },
  publishQuiet: true,
  parallel: 1,
  timeout: 60000
};

module.exports = { default: common };