/**
 * Seconds to Milliseconds conversion factor
 */
const MILLISECONDS = 1000
/**
 * Days to Seconds conversion factor
 */
const DAYS = 86400
/**
 * Hours to Seconds conversion factor
 */
const HOURS = 3600
/**
 * Minutes to Seconds conversion factor
 */
const MINUTES = 60
/**
 * Percentage conversion factor
 */
const PERCENT = 100
/**
 * Factor to scale timer interval
 */
const INTERVAL_SCALE_FACTOR = 1
/**
 * Factor to scale accumulator delta per interval
 */
const DELTA_SCALE_FACTOR = 1
/**
 * Time per interval tick
 */
const SCALED_INTERVAL = MILLISECONDS * INTERVAL_SCALE_FACTOR
/**
 * Accumulator delta per interval tick
 */
const SCALED_DELTA = MILLISECONDS * DELTA_SCALE_FACTOR

/*
Morning:
#9BB4C8
#E0B162
Daytime:
#3797D0
#FFC218
Evening:
#323E50
#A74B20
Night:
#4C007D
#07203C
*/

/**
 * Reference handle to timer
 */
let timer = null
/**
 * Accumulator
 */
let timeDelta = 0
/**
 * Time simulation begins
 */
const startTime = new Date();
/**
 * Current simulation time
 */
const currentTime = new Date(startTime.getTime());
/**
 * Start a timer with the given interval and callback and return a reference to it
 */
const initializeTimer = (callback, interval = SCALED_INTERVAL) => {
  return setInterval(callback, interval)
}
/**
 * Increment the accumulator by the delta and calculate new simulation time
 */
const incrementTime = (delta = SCALED_DELTA) => {
  timeDelta += delta
  const deltafiedTime = startTime.getTime() + timeDelta
  currentTime.setTime(deltafiedTime)
  return currentTime
}

/**
 * Gets the simulation epoch (number of seconds since last midnight)
 */
const getSimulationEpoch = (time = currentTime) => {
  const hours = time.getHours()
  const minutes = time.getMinutes()
  const seconds = time.getSeconds()
  const epoch = seconds + minutes * MINUTES + hours * HOURS
  return epoch
}

/**
 * Gets the percentage of a day represented by the epoch
 */
const epochToPercent = (epoch) => {
  return epoch * PERCENT / DAYS
}


/**
 * Get the description of the current time
 */
const describeTime = (hour) => {
  let description = "Morning"
  if (hour >= 18) {
    description = "Evening"
  } else if (hour >= 12) {
    description = "Afternoon"
  }

  return description
}

const getGradientClass = (hour) => {
  let gradientClass = 'morningSky'
  if (hour >= 20) {
    gradientClass = 'nightSky'
  } else if (hour >= 17) {
    gradientClass = 'eveningSky'
  } else if (hour >= 8) {
    gradientClass = 'daySky'
  }

  return gradientClass
}

/**
 * Update the welcome text with the current greeting.
 */
const updateWelcome = (hour) => {
  $('.welcome').html(`Good&nbsp;${describeTime(hour)}.`)
}

const updateSky = (hour) => {
  const colors = ['morningSky', 'nightSky', 'eveningSky', 'daySky']
  const skyColor = getGradientClass(hour)
  const sky = $('.hero-wrapper')
  const shouldTransition = !sky.hasClass(skyColor)
  if (shouldTransition) {
    sky.addClass(skyColor)
    colors.filter(color => color !== skyColor).forEach(color => sky.removeClass(color))
  }

}

/**
 * Start the simulation
 */
const start = () => {
  const time =
  timer = initializeTimer(() => {
    const time = incrementTime()
    const hour = time.getHours()
    updateWelcome(hour)
    updateSky(hour)
  })
  return timer
}

$(start)
