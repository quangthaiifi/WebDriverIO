const { expect } = require('@wdio/globals')
const HomePage = require('../pageobjects/HomePage')
describe('Looking for flights', () => {
    it('Looking for flights', async () => {
        HomePage.open();
        browser.setTimeout(3000)
        await HomePage.close_fancybox()
       await HomePage.select_location_from("HAN")
       await HomePage.select_location_to("SGN")
       await HomePage.select_departure_date("3/6/2024")
       await HomePage.select_returning_date_flight("6/6/2024")
    await HomePage.select_number_passenger("Người lớn:4|Trẻ em:3|Em bé:1")
    await HomePage.click_search_button()
    })
})

