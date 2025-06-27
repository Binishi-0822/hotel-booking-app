import {test, expect} from "@playwright/test";
import path from "path";

const UI_URL = "http://localhost:5173/";

test.beforeEach(async ({page}) => {
     await page.goto(UI_URL);
    
        await page.getByRole("link", { name: "Sign In" }).click();
    
        await expect(page.getByRole("heading", {name: "Sign In"})).toBeVisible();
    
        await page.locator("[name=email]").fill('test_register_1121@test.com');
    
        await page.locator("[name=password]").fill("1234567");
    
        await page.getByRole("button", {name: "Login"}).click();
    
        await expect(page.getByText("Login Successful!")).toBeVisible();
    
})

test("should allow user to add a hotel", async ({page}) => {
    await page.goto(`${UI_URL}add-hotel`);

    await page.locator('[name="name"]').fill("Test hotel");

    await page.locator('[name="country"]').fill("Test Country");

    await page.locator('[name="description"]').fill("This is a description for Test Hotel");

    await page.locator('[name="pricePerNight"]').fill("100");

    await page.selectOption('select[name="starRating"]', "3");

    await page.getByText("Budget").click();

    await page.getByLabel("Free Wifi").check();

    await page.getByLabel("Parking").check();

    await page.locator('[name="adultCount"]').fill("2");

    await page.locator('[name="childCount"]').fill("4");

    await page.setInputFiles('[name="imagesFiles"]', [
        path.join(__dirname,"files", "image1.png"),
        path.join(__dirname,"files", "image2.png"), 
    ])

    await page.getByRole("button", {name: "Save"}).click();

    await expect(page.getByText("Hotel Saved!")).toBeVisible();

})

