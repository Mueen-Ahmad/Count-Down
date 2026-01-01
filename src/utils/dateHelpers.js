// Date and Time Helper Functions

/**
 * Calculate time remaining until target date
 * @param {string|Date} targetDate - Target date/time
 * @returns {Object} Object with days, hours, minutes, seconds, and distance
 */
export function calculateTimeRemaining(targetDate) {
    // Parse the target date
    let target;

    // Handle different date formats
    if (typeof targetDate === 'string') {
        // Try to parse ISO string or other formats
        target = new Date(targetDate).getTime();
    } else if (targetDate instanceof Date) {
        target = targetDate.getTime();
    } else {
        target = new Date(targetDate).getTime();
    }

    // Validate the parsed date
    if (isNaN(target)) {
        console.error('Invalid target date:', targetDate);
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            distance: 0,
            isFinished: true,
            error: 'Invalid date'
        };
    }

    const now = new Date().getTime();
    const distance = target - now;

    // If countdown is finished
    if (distance < 0) {
        return {
            days: 0,
            hours: 0,
            minutes: 0,
            seconds: 0,
            distance: distance,
            isFinished: true
        };
    }

    // Calculate time components
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    return {
        days,
        hours,
        minutes,
        seconds,
        distance,
        isFinished: false
    };
}

/**
 * Format number with leading zero
 * @param {number} num - Number to format
 * @returns {string} Formatted number
 */
export function padZero(num) {
    return String(num).padStart(2, '0');
}

/**
 * Encode countdown data for URL sharing
 * @param {Object} data - Countdown data
 * @returns {string} Encoded URL parameters
 */
export function encodeCountdownData(data) {
    const params = new URLSearchParams({
        name: data.name,
        date: data.date,
        theme: data.theme || 'purple-blue'
    });

    if (data.bgImg) {
        params.append('img', data.bgImg);
    }

    return params.toString();
}

/**
 * Decode countdown data from URL parameters
 * @param {URLSearchParams} params - URL search parameters
 * @returns {Object|null} Decoded countdown data or null if invalid
 */
export function decodeCountdownData(params) {
    try {
        const name = params.get('name');
        const date = params.get('date');

        if (!name || !date) {
            return null;
        }

        return {
            name: name,
            date: date,
            theme: params.get('theme') || 'purple-blue',
            bgImg: params.get('img') || ''
        };
    } catch (error) {
        console.error('Error decoding countdown data:', error);
        return null;
    }
}

/**
 * Format date for display
 * @param {string|Date} date - Date to format
 * @returns {string} Formatted date string
 */
export function formatDate(date) {
    return new Date(date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
}
