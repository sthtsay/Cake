// Set the birthday date (month: 0-11, day: 1-31)
const birthdayMonth = 8; // September (0-based index)
const birthdayDay = 10;  // 11th day of the month

// Get current date
const currentDate = new Date();

/**
 * Check if today is the birthday
 * @returns {boolean} True if today is the birthday
 */
function isBirthday() {
    return currentDate.getDate() === birthdayDay && 
           currentDate.getMonth() === birthdayMonth;
}

/**
 * Calculate time remaining until next birthday
 * @returns {Object} Object with days, hours, minutes, seconds remaining
 */
function getTimeRemaining() {
    // Create a date for the next birthday
    const nextBirthday = new Date(currentDate.getFullYear(), birthdayMonth, birthdayDay);
    
    // If this year's birthday has already passed, set for next year
    if (currentDate > nextBirthday) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }
    
    // Calculate time differences
    const total = Date.parse(nextBirthday) - Date.parse(currentDate);
    const seconds = Math.floor((total / 1000) % 60);
    const minutes = Math.floor((total / 1000 / 60) % 60);
    const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
    const days = Math.floor(total / (1000 * 60 * 60 * 24));
    
    return {
        total,
        days,
        hours,
        minutes,
        seconds
    };
}

/**
 * Update the countdown display
 */
function updateCountdown() {
    const timeRemaining = getTimeRemaining();
    
    // Update countdown elements
    document.getElementById('days').textContent = timeRemaining.days.toString().padStart(2, '0');
    document.getElementById('hours').textContent = timeRemaining.hours.toString().padStart(2, '0');
    document.getElementById('minutes').textContent = timeRemaining.minutes.toString().padStart(2, '0');
    document.getElementById('seconds').textContent = timeRemaining.seconds.toString().padStart(2, '0');
    
    // If countdown reaches 0, show unlock button
    if (timeRemaining.total <= 0) {
        document.getElementById('countdown').classList.add('hidden');
        document.getElementById('unlocked-message').classList.remove('hidden');
        document.getElementById('unlock-btn').classList.remove('hidden');
    }
}

/**
 * Initialize the page
 */
function init() {
    if (isBirthday()) {
        // If today is the birthday, show unlock button immediately
        document.getElementById('countdown').classList.add('hidden');
        document.getElementById('unlocked-message').classList.remove('hidden');
        document.getElementById('unlock-btn').classList.remove('hidden');
    } else {
        // Update countdown every second
        updateCountdown();
        setInterval(updateCountdown, 1000);
    }
    
    // Add event listener to unlock button
    document.getElementById('unlock-btn').addEventListener('click', function() {
        window.location.href = 'birthday.html'; // Navigate to birthday page
    });
}

// Start the countdown when page loads
window.onload = init;
