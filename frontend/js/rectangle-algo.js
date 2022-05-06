
window['RectangleAlgo'] = function() {

  this.getFirstColumnForYear = (year) => {
    return [
      { size: 2 },
      { size: 2 },
      { text: "Mon", size: 2 },
      { size: 2 },
      { text: "Wed" },
      { size: 2 },
      { text: "Fri" },
      { size: 2 }
    ]
  }

  const getDataForMonth = (year, month) => {
    const firstDate = new Date(year, month, 1)
    const daysOfWeek = [0,1,2,3,4,5,6]

    let rectanglesCount = 0
    if(daysOfWeek.indexOf(firstDate.getDay()) === 0) {
      rectanglesCount++
    }
    const lastDate = new Date(year, month+1, 0)
    let currentDate = Object.assign(firstDate)

    while(Number(new Date(Number(currentDate) + 7*24*60*60*1000)) <= Number(lastDate)) {
      rectanglesCount++
      currentDate = new Date(Number(Number(currentDate) + 7*24*60*60*1000))
    }
    if(daysOfWeek.indexOf(currentDate.getDay()) > daysOfWeek.indexOf(lastDate.getDay())) {
      rectanglesCount++
    }
    let currentDayCounter = 1
    return Array.from(Array(rectanglesCount)).map((_, index) => {
      let currentMonthCounter = month
      let currentDay = 0

      if(index === 0) {
        if(firstDate.getDay() === 0) {
          const newDays = []
          let currentDay = 0
          while(currentDay < 7) {
            if(currentDay < firstDate.getDay()) {
              newDays.push({month: currentMonthCounter, date: new Date(Number(firstDate) - (firstDate.getDay() - currentDay) * 24*60*60*1000).getDate()})
            } else {
              newDays.push({month: currentMonthCounter, date: currentDayCounter})
              currentDayCounter++
            }
            currentDay++
          }
          return newDays
        } else {
          while(new Date(Number(firstDate) + (currentDayCounter-1)*24*60*60*1000).getDay() !== 0) {
            currentDayCounter++
          }
        }
      }

      const newDays = []
      while(currentDay < 7) {
        if(currentDayCounter <= lastDate.getDate()) {
          newDays.push({month: currentMonthCounter, date: currentDayCounter})
          currentDayCounter++
        } else {
          currentMonthCounter +=1
          currentDayCounter = 1
          newDays.push({month: currentMonthCounter, date: currentDayCounter})
          currentDayCounter++
        }
        currentDay++
      }

      return newDays
    })
  }

  this.getDataForYear = (year) => {
    const monthRectangles = [0,1,2,3,4,5,6,7,8,9,10,11].map((month) => {
      return {
        month: month,
        data: getDataForMonth(year, month)
      }
    })
    // console.log(JSON.stringify(monthRectangles))

    return monthRectangles
  }
  this.fillOutData = (dataForYear, startYear, startMonth, startDate, endYear, endMonth, endDate, selectionLevel) => {
    const newDataForYear = JSON.parse(JSON.stringify(dataForYear)).map((month) => {
      month['data'] = month['data'].map((week) => {
        return week.map((day) => {
          if(Number(new Date(startYear, day.month, day.date)) >= Number(new Date(startYear, startMonth, startDate))
            && Number(new Date(startYear, day.month, day.date)) <= Number(new Date(endYear, endMonth, endDate))) {
            return {
              ...day,
              selected: true,
              selectionLevel
            }
          }
          return day
        })
      })

      return month
    })
    return newDataForYear
  }

  this.constructHorizontalRectangles = (dataForYear) => {
    const newDataForYear = dataForYear[0].data[0].map((item) => { return [] })

    for(let i = 0; i < dataForYear.length; i++) {
      for(let j = 0; j < dataForYear[i].data.length; j++) {
        for(let k = 0; k < dataForYear[i].data[j].length; k++) {
          newDataForYear[k] = newDataForYear[k].concat(dataForYear[i].data[j][k])
        }
      }
    }

    return newDataForYear
  }
  this.getHeaderForYear = (filledData) => {
    return [{size: 2}].concat(filledData.map((month) => {
      return {
        size: month.data.length
      }
    }))
  }
}