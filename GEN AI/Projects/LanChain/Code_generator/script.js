
document.addEventListener('DOMContentLoaded', () => {
    const navButtons = document.querySelectorAll('.nav-buttons button');
    const sections = document.querySelectorAll('.section');

    navButtons.forEach(button => {
        button.addEventListener('click', () => {
            navButtons.forEach(btn => btn.classList.remove('active-nav'));
            button.classList.add('active-nav');
            
            sections.forEach(section => section.classList.remove('active'));
            const targetSectionId = button.id.replace('Btn', 'Section');
            document.getElementById(targetSectionId).classList.add('active');

            if (targetSectionId !== 'stopwatchSection') {
                stopStopwatch();
            }
            if (targetSectionId !== 'timerSection') {
                resetTimer();
            }
        });
    });

    const clockHours = document.getElementById('clockHours');
    const clockMinutes = document.getElementById('clockMinutes');
    const clockSeconds = document.getElementById('clockSeconds');
    const clockPeriod = document.getElementById('clockPeriod');
    const clockDate = document.getElementById('clockDate');

    function updateClock() {
        const now = new Date();
        let h = now.getHours();
        const m = now.getMinutes();
        const s = now.getSeconds();
        const period = h >= 12 ? 'PM' : 'AM';
        h = h % 12;
        h = h ? h : 12;

        clockHours.textContent = h.toString().padStart(2, '0');
        clockMinutes.textContent = m.toString().padStart(2, '0');
        clockSeconds.textContent = s.toString().padStart(2, '0');
        clockPeriod.textContent = period;

        const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        clockDate.textContent = now.toLocaleDateString(undefined, options);
    }
    setInterval(updateClock, 1000);
    updateClock();

    const swHours = document.getElementById('swHours');
    const swMinutes = document.getElementById('swMinutes');
    const swSeconds = document.getElementById('swSeconds');
    const swMilliseconds = document.getElementById('swMilliseconds');
    const swStartBtn = document.getElementById('swStart');
    const swStopBtn = document.getElementById('swStop');
    const swResetBtn = document.getElementById('swReset');
    const swLapBtn = document.getElementById('swLap');
    const swLapsList = document.getElementById('swLaps');

    let swStartTime;
    let swElapsedTime = 0;
    let swAnimationId;
    let swIsRunning = false;
    let swLapCounter = 0;

    function formatTime(ms) {
        const totalSeconds = Math.floor(ms / 1000);
        const milliseconds = Math.floor((ms % 1000) / 10);
        const seconds = totalSeconds % 60;
        const totalMinutes = Math.floor(totalSeconds / 60);
        const minutes = totalMinutes % 60;
        const hours = Math.floor(totalMinutes / 60);

        return {
            hours: hours.toString().padStart(2, '0'),
            minutes: minutes.toString().padStart(2, '0'),
            seconds: seconds.toString().padStart(2, '0'),
            milliseconds: milliseconds.toString().padStart(2, '0')
        };
    }

    function updateStopwatchDisplay() {
        const currentTime = Date.now();
        const currentElapsedTime = swElapsedTime + (currentTime - swStartTime);
        const formatted = formatTime(currentElapsedTime);
        swHours.textContent = formatted.hours;
        swMinutes.textContent = formatted.minutes;
        swSeconds.textContent = formatted.seconds;
        swMilliseconds.textContent = formatted.milliseconds;
        swAnimationId = requestAnimationFrame(updateStopwatchDisplay);
    }

    function startStopwatch() {
        if (!swIsRunning) {
            swStartTime = Date.now() - swElapsedTime;
            swIsRunning = true;
            updateStopwatchDisplay();
            swStartBtn.disabled = true;
            swStopBtn.disabled = false;
            swLapBtn.disabled = false;
        }
    }

    function stopStopwatch() {
        if (swIsRunning) {
            cancelAnimationFrame(swAnimationId);
            swElapsedTime += Date.now() - swStartTime;
            swIsRunning = false;
            swStartBtn.disabled = false;
            swStopBtn.disabled = true;
            swLapBtn.disabled = true;
        }
    }

    function resetStopwatch() {
        stopStopwatch();
        swElapsedTime = 0;
        swLapCounter = 0;
        const formatted = formatTime(0);
        swHours.textContent = formatted.hours;
        swMinutes.textContent = formatted.minutes;
        swSeconds.textContent = formatted.seconds;
        swMilliseconds.textContent = formatted.milliseconds;
        swLapsList.innerHTML = '';
        swStartBtn.disabled = false;
        swStopBtn.disabled = true;
        swLapBtn.disabled = true;
    }

    function lapStopwatch() {
        if (swIsRunning) {
            swLapCounter++;
            const lapTime = swElapsedTime + (Date.now() - swStartTime);
            const formatted = formatTime(lapTime);
            const lapItem = document.createElement('li');
            lapItem.textContent = `Lap ${swLapCounter}: ${formatted.hours}:${formatted.minutes}:${formatted.seconds}.${formatted.milliseconds}`;
            swLapsList.prepend(lapItem);
        }
    }

    swStartBtn.addEventListener('click', startStopwatch);
    swStopBtn.addEventListener('click', stopStopwatch);
    swResetBtn.addEventListener('click', resetStopwatch);
    swLapBtn.addEventListener('click', lapStopwatch);
    swStopBtn.disabled = true;
    swLapBtn.disabled = true;

    const timerHoursInput = document.getElementById('timerHoursInput');
    const timerMinutesInput = document.getElementById('timerMinutesInput');
    const timerSecondsInput = document.getElementById('timerSecondsInput');
    const timerHoursDisplay = document.getElementById('timerHours');
    const timerMinutesDisplay = document.getElementById('timerMinutes');
    const timerSecondsDisplay = document.getElementById('timerSeconds');
    const timerStartBtn = document.getElementById('timerStart');
    const timerPauseBtn = document.getElementById('timerPause');
    const timerResetBtn = document.getElementById('timerReset');

    let timerTotalDuration = 0;
    let timerRemainingTime = 0;
    let timerIntervalId;
    let isTimerRunning = false;

    function setTimerDuration() {
        const h = parseInt(timerHoursInput.value || '0');
        const m = parseInt(timerMinutesInput.value || '0');
        const s = parseInt(timerSecondsInput.value || '0');
        timerTotalDuration = (h * 3600 + m * 60 + s) * 1000;
        if (!isTimerRunning && timerRemainingTime === 0) {
            timerRemainingTime = timerTotalDuration;
        }
        updateTimerDisplay();
    }

    function updateTimerDisplay() {
        const totalSeconds = Math.max(0, Math.floor(timerRemainingTime / 1000));
        const s = totalSeconds % 60;
        const m = Math.floor(totalSeconds / 60) % 60;
        const h = Math.floor(totalSeconds / 3600);

        timerHoursDisplay.textContent = h.toString().padStart(2, '0');
        timerMinutesDisplay.textContent = m.toString().padStart(2, '0');
        timerSecondsDisplay.textContent = s.toString().padStart(2, '0');

        if (timerRemainingTime <= 0) {
            timerEnd();
        }
    }

    function startTimer() {
        if (!isTimerRunning) {
            if (timerRemainingTime === 0 && timerTotalDuration === 0) {
                setTimerDuration();
            }
            if (timerRemainingTime <= 0) return;

            isTimerRunning = true;
            timerStartBtn.disabled = true;
            timerPauseBtn.disabled = false;
            timerIntervalId = setInterval(() => {
                timerRemainingTime -= 1000;
                updateTimerDisplay();
            }, 1000);
        }
    }

    function pauseTimer() {
        if (isTimerRunning) {
            clearInterval(timerIntervalId);
            isTimerRunning = false;
            timerStartBtn.disabled = false;
            timerPauseBtn.disabled = true;
        }
    }

    function resetTimer() {
        clearInterval(timerIntervalId);
        isTimerRunning = false;
        timerTotalDuration = 0;
        timerRemainingTime = 0;
        timerHoursInput.value = '0';
        timerMinutesInput.value = '0';
        timerSecondsInput.value = '0';
        updateTimerDisplay();
        timerStartBtn.disabled = false;
        timerPauseBtn.disabled = true;
    }

    function timerEnd() {
        clearInterval(timerIntervalId);
        isTimerRunning = false;
        alert('Timer finished!');
        resetTimer();
    }

    timerHoursInput.addEventListener('input', setTimerDuration);
    timerMinutesInput.addEventListener('input', setTimerDuration);
    timerSecondsInput.addEventListener('input', setTimerDuration);
    timerStartBtn.addEventListener('click', startTimer);
    timerPauseBtn.addEventListener('click', pauseTimer);
    timerResetBtn.addEventListener('click', resetTimer);
    timerPauseBtn.disabled = true;

    const timezoneSelect = document.getElementById('timezoneSelect');
    const tzHours = document.getElementById('tzHours');
    const tzMinutes = document.getElementById('tzMinutes');
    const tzSeconds = document.getElementById('tzSeconds');
    const tzPeriod = document.getElementById('tzPeriod');
    const tzDate = document.getElementById('tzDate');

    const timezones = [
        'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
        'Europe/Berlin', 'Asia/Tokyo', 'Asia/Shanghai', 'Asia/Dubai',
        'Australia/Sydney', 'Africa/Cairo', 'America/Sao_Paulo', 'Indian/Maldives'
    ];

    function populateTimezones() {
        timezones.forEach(zone => {
            const option = document.createElement('option');
            option.value = zone;
            option.textContent = zone.replace(/_/g, ' ');
            timezoneSelect.appendChild(option);
        });
        timezoneSelect.value = 'UTC';
    }

    function updateTimezoneClock() {
        const selectedTimezone = timezoneSelect.value;
        const now = new Date();

        const timeOptions = {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true,
            timeZone: selectedTimezone
        };
        const dateOptions = {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            timeZone: selectedTimezone
        };

        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        const dateString = now.toLocaleDateString('en-US', dateOptions);

        const [timePart, periodPart] = timeString.split(' ');
        const [h, m, s] = timePart.split(':');

        tzHours.textContent = h;
        tzMinutes.textContent = m;
        tzSeconds.textContent = s;
        tzPeriod.textContent = periodPart;
        tzDate.textContent = dateString;
    }

    timezoneSelect.addEventListener('change', updateTimezoneClock);
    setInterval(updateTimezoneClock, 1000);
    populateTimezones();
    updateTimezoneClock();
});
