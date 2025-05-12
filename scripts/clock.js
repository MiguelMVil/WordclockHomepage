// times, top half of the clock
const quarter = document.querySelectorAll('#quarter')
const twenty = document.querySelectorAll('#twenty')
const five = document.querySelectorAll('#five')
const half = document.querySelectorAll('#half')
const ten = document.querySelectorAll('#ten')
const to = document.querySelectorAll('#to')
const past = document.querySelectorAll('#past')
const a = document.querySelectorAll('#a')

// hours, bottom half of the clock
const ONE = document.querySelectorAll('#ONE')
const TWO = document.querySelectorAll('#TWO')
const THREE = document.querySelectorAll('#THREE')
const FOUR = document.querySelectorAll('#FOUR')
const FIVE = document.querySelectorAll('#FIVE')
const SIX = document.querySelectorAll('#SIX')
const SEVEN = document.querySelectorAll('#SEVEN')
const EIGHT = document.querySelectorAll('#EIGHT')
const NINE = document.querySelectorAll('#NINE')
const TEN = document.querySelectorAll('#TEN')
const ELEVEN = document.querySelectorAll('#ELEVEN')
const TWELVE = document.querySelectorAll('#TWELVE')
const OCLOCK = document.querySelectorAll('#OCLOCK')

//dates from the top-right portion of the clock
const date1 = document.getElementById('date-1')
const date2 = document.getElementById('date-2')
const date3 = document.getElementById('date-3')
const date4 = document.getElementById('date-4')

// sets of words that should be on per set time
const fiveMins = [five, past]
const tenMins = [ten, past]
const fifteenMins = [a, quarter, past]
const twentyMins = [twenty, past]
const twentyFiveMins = [twenty, five, past]
const thirtyMins = [half, past]
const thirtyFiveMins = [twenty, five, to]
const fortyMins = [twenty, to]
const fortyFiveMins = [quarter, to]
const fiftyMins = [ten, to]
const fiftyFiveMins = [five, to]
const oclock = [OCLOCK]

const time_values = [oclock, fiveMins, tenMins,
                     fifteenMins, twentyMins, twentyFiveMins, 
                     thirtyMins, thirtyFiveMins, fortyMins, 
                     fortyFiveMins, fiftyMins, fiftyFiveMins]
const hour_values = [ONE, TWO, THREE,
                     FOUR, FIVE, SIX, 
                     SEVEN, EIGHT, NINE, 
                     TEN, ELEVEN, TWELVE]
const allComponents = [quarter, twenty, five, half, ten, to, past, ONE, TWO, THREE, FOUR, FIVE, SIX, SEVEN, EIGHT, NINE, TEN, ELEVEN, TWELVE, OCLOCK, a]

const greeting = document.querySelector('.greeting')

function updateTime() {
    const now = new Date()

    const month = now.getMonth()
    const day = now.getDate()

    console.log(month)
    console.log(day)

    updateDate(month, day)

    // setting hours to a 12-based clock
    let hour = now.getHours()
    let minute = now.getMinutes()

    updateClock(hour, minute)

    updateTimeOfDay(hour)
}

function updateTimeOfDay(hour) {
    if (hour < 12) {
        greeting.textContent = 'Good Morning!'
    } else if (hour < 18) {
        greeting.textContent = 'Good Afternoon!'
    } else {
        greeting.textContent = 'Good Evening!'
    }
}

// changes the date in the top-right portion of the clock
function updateDate(month, day) {
    let month_editable = month + 1

    // for month 
    if (month_editable < 10) {
        date1.textContent = '0'
    } else {
        date1.textContent = '1'
    }

    if (month_editable < 10) {
        date2.textContent = month_editable.toString()[0]
    } else {
        date2.textContent = month_editable.toString()[1]
    }

    if (day < 10) {
        date3.textContent = '0'
        date4.textContent = day.toString()[0]
    } else {
        date3.textContent = day.toString()[0]
        date4.textContent = day.toString()[1]
    }
}

function updateClock(hour, minute) {
    let hour_editable = hour
    let minute_editable = minute

    // sets all the words to off
    allComponents.forEach(component => {
        component.forEach(item => {
            // remove the turned-on class
            item.classList.remove('turned-on')
            // add the turned-off class
            item.classList.add('turned-off')
        })
    })

    // Round to nearest 5 minutes instead of floor
    let index = Math.round(minute_editable / 5) % 12

    console.log("minute", index, minute_editable)
    time_values[index].forEach(component => {
        component.forEach(item => {
            // add the turned-on class
            item.classList.add('turned-on')
            // remove the turned-off class
            item.classList.remove('turned-off')
        })
    })

    // Convert to 12-hour format
    if (hour_editable > 12) {
        hour_editable = hour_editable - 12
    } else if (hour_editable === 0) {
        hour_editable = 12
    }

    // Adjust hour for "to" times (after 30 minutes)
    if (minute_editable > 30) {
        hour_editable = (hour_editable % 12) + 1
    }
    
    console.log(hour_editable)
    // Ensure hour index is always valid (1-12 mapped to 0-11)
    const hourIndex = ((hour_editable - 1) % 12)
    hour_values[hourIndex].forEach(element => {
        element.classList.add('turned-on')
        element.classList.remove('turned-off')
    })
}


updateTime()
setInterval(updateTime, 1000)