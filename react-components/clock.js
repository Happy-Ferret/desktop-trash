// Set the clock going

/**
 * Update Clock.
 */
function updateClock() {
  var date = new Date(),
    hours = date.getHours() + '', // get hours as string
    minutes = date.getMinutes() + ''; // get minutes as string
  seconds = date.getSeconds() + ''; // get seconds as string
  daytime = "AM"

  // 12 hour clock (make optional -- but set default -- later)
  if (hours >= 12) {
    hours = hours - 12;
    daytime = "PM";
  }

  if (hours == 0) {
    hours = 12;
  }

  // pad with zero if needed
  if (hours.length < 2)
    hours = '0' + hours;
  if (minutes.length < 2)
    minutes = '0' + minutes;
  let clock = document.getElementById("clock");
  clock.textContent = hours + ':' + minutes + ':' + seconds + ' ' + daytime;
}


window.Clock = class Clock extends React.Component {

  componentDidMount() {
    updateClock();
    window.setInterval(updateClock, 1000);
  }
  
  render() {
    return (
      r("span", { id: "clock" })
    )
  }
};