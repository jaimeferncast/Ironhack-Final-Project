const differenceInCalendarDays = require("date-fns/differenceInCalendarDays")
const addDays = require("date-fns/addDays")
const format = require("date-fns/format")

export const countNights = (arrivalDate, departureDate) => differenceInCalendarDays(new Date(departureDate), new Date(arrivalDate))

export const fillArrayWithDates = (arrivalDate, nNights) => {
  const datesArray = []
  for (let i = 0; i < nNights; i++) datesArray.push(addDays(new Date(arrivalDate), i))
  return datesArray
}

export const formatDates = (date) => format(date, "dd/MM/yyyy")

export const truncateString = (text, maxLength) => text.substring(0, maxLength)
