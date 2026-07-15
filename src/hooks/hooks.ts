import { Before, After, BeforeAll, AfterAll, Status } from '@cucumber/cucumber';
import { CustomWorld } from '../support/world';
import * as fs from 'fs';
import * as path from 'path';

BeforeAll(async function () {
  // Ensure reports directory exists
  const reportsDir = path.join(process.cwd(), 'reports');
  if (!fs.existsSync(reportsDir)) {
    fs.mkdirSync(reportsDir, { recursive: true });
  }
  console.log('\n🎭 Stripe Login BDD Suite starting...');
});

Before(async function (this: CustomWorld, scenario) {
  console.log(`\n▶ Starting: ${scenario.pickle.name}`);
  await this.init();
});

After(async function (this: CustomWorld, scenario) {
  if (scenario.result?.status === Status.FAILED) {
    try {
      const screenshotDir = path.join(process.cwd(), 'reports', 'screenshots');
      if (!fs.existsSync(screenshotDir)) {
        fs.mkdirSync(screenshotDir, { recursive: true });
      }
      const sanitizedName = scenario.pickle.name
        .replace(/[^a-z0-9]/gi, '_')
        .toLowerCase()
        .substring(0, 60);
      const screenshotPath = path.join(screenshotDir, `${sanitizedName}_${Date.now()}.png`);
      await this.page.screenshot({ path: screenshotPath, fullPage: true });
      console.log(`  📸 Screenshot saved: ${screenshotPath}`);

      const screenshot = fs.readFileSync(screenshotPath);
      this.attach(screenshot, 'image/png');
    } catch (e) {
      console.error('  ⚠ Screenshot failed:', e);
    }
  }

  const statusIcon = scenario.result?.status === Status.PASSED ? '✅' : '❌';
  console.log(`${statusIcon} Finished: ${scenario.pickle.name} [${scenario.result?.status}]`);

  await this.teardown();
});

AfterAll(async function () {
  console.log('\n🏁 Stripe Login BDD Suite completed.');
});