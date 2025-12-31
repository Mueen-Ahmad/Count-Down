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
        name: btoa(encodeURIComponent(data.name)),
        date: btoa(data.date),
        theme: data.theme,
        img: btoa(data.bgImg || '')
    });
    return params.toString();
}

/**
 * Decode countdown data from URL parameters
 * @param {URLSearchParams} params - URL search parameters
 * @returns {Object|null} Decoded countdown data or null if invalid
 */
export function decodeCountdownData(params) {
    try {
        // Safe check for required params
        // Check if params object exists and has required keys
        if (!params || !params.has || (!params.has('name') && !params.get('name'))) {
            return null;
        }

        // Helper for safe decoding
        const safeAtob = (str) => {
            try {
                return atob(str);
            } catch (e) {
                console.warn('Failed to decode base64:', str);
                return str; // Return raw string if decode fails
            }
        };

        const safeDecodeURI = (str) => {
            try {
                return decodeURIComponent(str);
            } catch (e) {
                return str;
            }
        };

        const nameParam = params.get('name');
        const dateParam = params.get('date');
        const imgParam = params.get('img');
        const themeParam = params.get('theme');

        // Decode Name: URI Decode -> Base64 Decode -> URI Decode (just in case)
        // Note: encodeCountdownData does: btoa(encodeURIComponent(name))
        const name = nameParam ? safeDecodeURI(safeAtob(nameParam)) : 'Event';

        // Decode Date: Base64 Decode
        // Note: encodeCountdownData does: btoa(date)
        const date = dateParam ? safeAtob(dateParam) : new Date().toISOString();

        // Decode Image: Base64 Decode if present
        const bgImg = imgParam ? safeAtob(imgParam) : '';

        return {
            name,
            date,
            theme: themeParam || 'purple-blue',
            bgImg
        };
    } catch (error) {
        console.error('Error decoding countdown data:', error);
        return null; // Return null if catastrophic failure
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
