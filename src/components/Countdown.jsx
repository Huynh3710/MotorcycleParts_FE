import React, { useState, useEffect } from 'react';

function CountdownTimer({ timeLeft }) {
    const [remainingTime, setRemainingTime] = useState(calculateTimeLeft(timeLeft));

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(calculateTimeLeft(timeLeft));
        }, 1000);

        return () => clearInterval(timer);
    }, [timeLeft]);

    function calculateTimeLeft(timeLeft) {
        let currentTime = Date.now();
        let timeUntilCountdown = timeLeft - currentTime;

        if (timeUntilCountdown <= 0) {
            return { days: 0, hours: 0, minutes: 0, seconds: 0 };
        }

        let days = Math.floor(timeUntilCountdown / (1000 * 60 * 60 * 24));
        let remainingTimeInDay = timeUntilCountdown % (1000 * 60 * 60 * 24);
        let hours = Math.floor(remainingTimeInDay / (1000 * 60 * 60));
        let minutes = Math.floor((remainingTimeInDay % (1000 * 60 * 60)) / (1000 * 60));
        let seconds = Math.floor((remainingTimeInDay % (1000 * 60)) / 1000);

        return { days, hours, minutes, seconds };
    }

    return (
        <span className='d-inline'>
            {remainingTime.days > 0 && (
                <p className='p-0 m-0 d-inline '>{remainingTime.days} ngày</p>
            )}
            <p className='p-0 m-0 d-inline '>{remainingTime.hours} giờ, {remainingTime.minutes} phút, {remainingTime.seconds} giây</p>
        </span>
    );
}

export default CountdownTimer;
