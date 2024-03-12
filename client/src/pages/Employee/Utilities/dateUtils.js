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
