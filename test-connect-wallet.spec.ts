import { test, expect } from '@playwright/test';
import clipboard from 'clipboardy';


test('Create zkAccount and transfer', async ({ page }) => {
    let password_for_new_account = '123Test123'
    let restore_seed_phrase = 'decrease cereal panic mix hollow demand cushion clump physical judge genius choose'
    let restore_password = '23fg7G@s!n'


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

    //Click the button zkAccount
    const button_account = page.locator('//div//span[contains(text(), "zk")]');
    await button_account.click();

    //Click the button Generate receiving address
    const button_generate_receiving_address = page.locator('//button[text()="Generate receiving address"]');
    await button_generate_receiving_address.click();

    //Click the button copy receiving address
    const button_copy_receiving_address = page.locator('//span[text()="zkAccount"]//..//following-sibling::div[2]/span');
    await button_copy_receiving_address.click();

    const receiving_address = await clipboard.read()


    //Change zkAccount


    //Click the button change account
    const button_change_account = page.locator('//button[text()="Change"]');
    await button_change_account.click();

    //Click the button restore account
    const button_restore_account = page.locator('//button[text()="Restore account"]');
    await button_restore_account.click();

    //Input seed phrase for restore account
    const button_input_restore_seed_phrase = page.locator('//textarea');
    await button_input_restore_seed_phrase.type(restore_seed_phrase);
    await button_restore_account.click();

    //Input password
    await input_password.type(restore_password)

    //Verify password
    await verify_password.type(restore_password)

    //Click the verify button
    await button_verify.click()


    // To do transfer


    // Go to the Transfer Tab
    const button_transfer_tab = page.locator('//div[text()="Transfer"]');
    await button_transfer_tab.click();

    // Input amount of Bob
    const input_bob = page.locator('//input[@placeholder="0"]');
    await input_bob.type('0.1');

    // Enter address of zkBob receiver
    const enter_receiver_address = page.locator('//input[@placeholder="Enter address of zkBob receiver"]');
    await enter_receiver_address.type(receiving_address);

    // Click the Transfer button
    const button_transfer = page.locator('//button[text()="Transfer"]');
    await button_transfer.click();

    //Click the Confirm button
    const button_confirm = page.locator('//button[text()="Confirm"]');
    await button_confirm.click();

    // Check phrase "Transfer is completed"
    await expect(page.locator('//span[text()="Transfer is completed"]')).toBeVisible();

    // Reload page
    await page.goto('https://staging--zkbob.netlify.app/');

    // Input password for sign in after refresh
    const input_password_for_sing_in = page.locator('//input[@placeholder="Password"]');
    await input_password_for_sing_in.type(restore_password);

    // Click the Sing in button
    const button_sign_in = page.locator('//button[text()="Sign in"]');
    await button_sign_in.click();



    // Change zkAccount
    await button_account.click();
    await button_change_account.click();
    await button_restore_account.click();
    await button_input_restore_seed_phrase.type(seed_phrase_text);
    await button_restore_account.click();
    await input_password.type(password_for_new_account)
    await verify_password.type(password_for_new_account)
    await button_verify.click()

    // Check the history tab

    // Go to the History Tab
    const button_history_tab = page.locator('//div[text()="History"]');
    await button_history_tab.click();

    // Check the history of refills
    const check_the_history_of_refills = page.locator('//span[text()="+"]/span');
    await expect(check_the_history_of_refills).toHaveText('0.1');

});
