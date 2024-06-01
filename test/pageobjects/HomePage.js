const { $ } = require('@wdio/globals')
const Page = require('./page');

class HomePage extends Page{
    get close_button_fancybox(){
        return $("//*[@class='modal-content fancybox-opened']//button[@class='close fancybox-close']//span")
    }
    get location_from(){
        return $('//*[@data-id="flight_from" and @name = "From"]')
    }
    get location_input_from(){
        return $('//input[@type="text" and @data-id="flight_from" and not(@name)]')
    }
    get location_to(){
        return $('//*[@data-id="flight_to" and @name="To"]')
    }
    get location_input_to(){
        return $('//input[@type="text" and @data-id="flight_to" and not(@name)]')
    }

    get departure_date(){
        return $('//input[@id="departure_date_flight"]')
    }
    get returning_date(){
        return $('//input[@id="returning_date_flight"]')
    }
    get ui_datepicker(){
            return $('//*[@id="ui-datepicker-div"]')
    }
    get flight_passenger(){
        return $('//*[@id="flight_passenger"]')
    }
    get table_resuilt(){
        return $('//*[@id="flight_data_content_depart"]')
    }
    get search_button(){
        return $('//*[@id="search_button"]')
    } 
    async close_fancybox(){
     const close_button_fancybox_isDisplayed= await this.close_button_fancybox.isExisting() 
        if(close_button_fancybox_isDisplayed)
            await this.close_button_fancybox.click()
    }
    async select_location_from(from){
        console.log("start select_location_from")
          await  this.location_from.click()
          await    this.location_input_from.setValue(from);
          console.log("KKKKKKKKKKK")
          await  $('//*[@class="tt-dataset-0"]//*[contains(text(),"'+from+'")]').click()
          const locationFrom = await (await this.location_from).getValue();
          expect(locationFrom).toContain(from)
          console.log("end select_location_from")
    }

    async select_location_to(to){
        console.log("start select_location_to")

        // await  this.location_to.click()
        await    this.location_input_to.setValue(to);
        await  $('//*[@class="tt-dataset-1"]//*[contains(text(),"'+to+'")]').click()
        const locationTo = await (await this.location_to).getValue();
        expect(locationTo).toContain(to)
        console.log("end select_location_to")
  }

  async select_departure_date(departure_date){
    console.log("start select_departure_date")
    const departureDate= departure_date.split("/")
    const day = departureDate[0]
    const month = departureDate[1]-1
    const year = departureDate[2]
    await this.departure_date.click()
    expect(this.ui_datepicker).toBeDisplayed()
    await $('//*[@data-handler="selectDay" and @data-month="'+month+'" and @data-year="'+year+'"]//*[text()='+day+']').click();
    await browser.pause(500)
    var ui_datepicker_isDisplay =  await this.ui_datepicker.isDisplayed()
    expect(ui_datepicker_isDisplay).toEqual(false)
    console.log("end select_departure_date")
  }

  async select_returning_date_flight(returning_date_flight){
    console.log("start select_returning_date_flight")

    const returningDateFlight= returning_date_flight.split("/")
    const day = returningDateFlight[0]
    const month = returningDateFlight[1]-1
    const year = returningDateFlight[2]
    await this.returning_date.click()
    await expect(this.ui_datepicker).toBeDisplayed()
    await $('//*[@data-handler="selectDay" and @data-month="'+month+'" and @data-year="'+year+'"]//*[text()='+day+']').click();
    await browser.pause(500)
    var ui_datepicker_isDisplay = await this.ui_datepicker.isDisplayed()
    expect(ui_datepicker_isDisplay).toEqual(false)
    console.log("end select_returning_date_flight")
  }
  async select_number_passenger(number_passenger){
    console.log("start select_number_passenger")

    await this.flight_passenger.click();
    let total_passenger = 1;
    let type_and_number_pasenger=number_passenger.split("|")
    for(let i=0;i<type_and_number_pasenger.length;i++)
        {
           let type_and_number = type_and_number_pasenger[i].split(":")
           for(let j=0;j<type_and_number[1];j++)
            {
                $('//*[ contains(@class,"popover-content") and not(contains(@class,"hide"))]//*[@class="control-label" and contains(text(),"'+type_and_number[0]+'")]/ancestor::div[@class="row"]//*[contains(@class,"btn-plus")]').click()
                browser.pause(500)
                total_passenger++
            }
        }
    let number_passenge_displayed= await this.flight_passenger.getValue()
    console.log("number_passenge_displayed"+number_passenge_displayed)
    expect(number_passenge_displayed).toContain(total_passenger.toString())
    console.log("End select_number_passenger")

}
async click_search_button(){
    await this.search_button.click()
    expect(this.table_resuilt).toBeExisting()

}
}
module.exports = new HomePage();
