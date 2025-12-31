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
    if (!params) return null;

    try {
        const safeAtob = (str) => {
            if (!str) return '';
            try {
                return atob(str);
            } catch (e) {
                console.warn('Decode failed:', str);
                return str;
            }
        };

        const safeDecodeURI = (str) => {
            try { return decodeURIComponent(str); } catch (e) { return str; }
        };

        // Handle both URLSearchParams and plain objects if needed
        const has = (key) => params.has ? params.has(key) : !!params[key];
        const get = (key) => params.get ? params.get(key) : params[key];

        if (!has('name') && !has('date')) {
            return null;
        }

        const nameParam = get('name');
        const dateParam = get('date');
        const imgParam = get('img');
        const themeParam = get('theme');

        const name = nameParam ? safeDecodeURI(safeAtob(nameParam)) : 'Event';
        const date = dateParam ? safeAtob(dateParam) : new Date().toISOString();
        const bgImg = imgParam ? safeAtob(imgParam) : '';

        return {
            name,
            date,
            theme: themeParam || 'purple-blue',
            bgImg
        };
    } catch (error) {
        console.error('Error in decodeCountdownData:', error);
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
