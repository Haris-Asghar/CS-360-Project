export const formatCurrentDateTime = (showTime) => {
    const currentDate = new Date();
    if (showTime) {
        const options = { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true };
        return currentDate.toLocaleTimeString('en-US', options);
    } else {
        const options = { day: 'numeric', month: 'long', year: 'numeric' };
        const formattedDate = currentDate.toLocaleDateString('en-US', options);
        const day = currentDate.getDate();
        const suffix = (day === 1 || day === 21 || day === 31) ? 'st' : (day === 2 || day === 22) ? 'nd' : (day === 3 || day === 23) ? 'rd' : 'th';
        return formattedDate.replace(',', suffix + ',');
    }
};

export const datesFromTodayToStartOfMonth = () => {
    const today = new Date();
    const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const datesArray = [];

    // Loop from today to the start of the month
    for (let date = new Date(today); date >= startOfMonth; date.setDate(date.getDate() - 1)) {
        if (date.getDay() !== 0 && date.getDay() !== 6) {
            // Get the time zone offset in minutes and convert it to milliseconds
            const timezoneOffset = date.getTimezoneOffset() * 60000;
            // Create a new Date object adjusted for the time zone offset
            const localDate = new Date(date.getTime() - timezoneOffset);
            // Convert the adjusted date to the ISO string format (YYYY-MM-DD)
            const formattedDate = localDate.toISOString().split('T')[0];
            datesArray.push(formattedDate);
        }
    }
    return datesArray;
};


export const datesMatcher = (datesArray, attendanceData) => {
    const markedDates = [];

    const attendanceArray = []
    attendanceData.forEach(record => {
        attendanceArray.push(record.logDate);
    });
    const isDatePresent = (date, array) => array.includes(date);
    datesArray.forEach(date => {
        const presentInArray = isDatePresent(date, attendanceArray);
        if (presentInArray){
            markedDates.push({"date":date, type:"presentDate"})
        } else {
            markedDates.push({"date":date, type:"absentDate"})
        }
    });
    return markedDates;
};




// Function to format date
export const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    return date.toLocaleDateString('en-US', options);
};

// Function to get day of the week
export const getDayOfWeek = (dateString) => {
    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const date = new Date(dateString);
    return days[date.getDay()];
};

// Function to format time to AM/PM
export const formatTime = (timeString) => {
    const time = new Date(`2000-01-01T${timeString}`);
    return time.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', second: 'numeric', hour12: true });
};