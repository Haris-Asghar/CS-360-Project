import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const MyCalendar = ({ markedDates }) => {
    const [date, setDate] = useState(new Date());

    // Function to determine the tile class
    const tileClassName = ({ date, view }) => {
        if (markedDates) {
            const timezoneOffset = date.getTimezoneOffset() * 60000;
            const localDate = new Date(date.getTime() - timezoneOffset);
            const dateStr = localDate.toISOString().split('T')[0];
            const markedDate = markedDates.find(d => d.date === dateStr);
            if (markedDate && markedDate.type) {
                return markedDate.type;
            }
        }
    };

    return (
        <Calendar
            onChange={setDate}
            value={date}
            tileClassName={tileClassName}
        />
    );
};

export default MyCalendar;