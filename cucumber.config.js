module.exports = {
  default: {
    paths: ['src/features/**/*.feature'],
    require: ['src/support/world.ts', 'src/hooks/hooks.ts', 'src/step-definitions/**/*.ts'],
    requireModule: ['ts-node/register'],
    format: [
      'progress-bar',
      'json:reports/cucumber-report.json',
      'html:reports/cucumber-report.html'
    ],
    formatOptions: { snippetInterface: 'async-await' },
    parallel: 1,
    publishQuiet: true
  }
};