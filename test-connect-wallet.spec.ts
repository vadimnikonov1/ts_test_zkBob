import { test, expect } from '@playwright/test';
import clipboard from 'clipboardy';

test('homepage has zkBob', async ({ page }) => {
    await page.goto('https://staging--zkbob.netlify.app/');
  
    // create a locator zkAccount
    const button_zkAccount = page.locator('//button[text()="zkAccount"]');
    await button_zkAccount.click();

    // Click the button Agree.
    const button_agree = page.locator('//button[text()="Agree"]');
    await button_agree.click();

    // create a locator button_create_from_seed_phrase
    const button_create_from_seed_phrase = page.locator('//button[text()="Create from seed phrase"]');
    await button_create_from_seed_phrase.click();

    // create a locator button_create_from_seed_phrase
    const button_copy_seed_phrase = page.locator('//button[@type="link"][text()="Copy seed phrase"]');
    await button_copy_seed_phrase.click();

    // create a locator button_continue
    const button_continue = page.locator('//button[text()="Continue"]');
    await button_continue.click();

    // Read from clipboard
    const seed_phrase_text = await clipboard.read();

    // Split string on array
    const splitted_seed_phrase = seed_phrase_text.split(" ");

    // Input seed phrase
    for (let el in splitted_seed_phrase){
        const button_word = page.locator(`//div[text()="${splitted_seed_phrase[el]}"]`);
        await button_word.click();
    }

    // Click the button Verify
    const button_verify = page.locator('//button[text()="Verify"]');
    await button_verify.click();

    // Create password and verify password
    const input_password = page.locator('//input[@type="password"][@placeholder="Password 6+ characters"]');
    await input_password.type('123Test123')

    // Create password and verify password
    const verify_password = page.locator('//input[@type="password"][@placeholder="Verify password"]');
    await verify_password.type('123Test123')

    await button_verify.click();

  });