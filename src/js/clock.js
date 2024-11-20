LEN = 15;

function calculateTimeDifference(targetDate, targetTime) {
    const now = new Date();
    const targetDateTime = new Date(targetDate + ' ' + targetTime);

    // 计算时间差
    const differenceInMilliseconds = targetDateTime - now;
    const differenceInSeconds = Math.floor(differenceInMilliseconds / 1000);
    const differenceInMinutes = Math.floor(differenceInSeconds / 60);
    const differenceInHours = Math.floor(differenceInMinutes / 60);
    const differenceInDays = Math.floor(differenceInHours / 24);

    // 计算剩余的时间
    let remainingHours = differenceInHours % 24;
    let remainingMinutes = differenceInMinutes % 60;
    let remainingSeconds = differenceInSeconds % 60;

    // 格式化输出
    let timeDifferenceStr = '';
    timeDifferenceStr += differenceInDays + 'd ';
    timeDifferenceStr += remainingHours.toString().padStart(2, '0') + 'h ';
    timeDifferenceStr += remainingMinutes.toString().padStart(2, '0') + 'm ';
    timeDifferenceStr += remainingSeconds.toString().padStart(2, '0') + 's';

    return timeDifferenceStr.padStart(LEN, "0");
}
// function updateTimeAndDate() {
//     const displayStr = calculateTimeDifference('2024-11-26', '08:00:00');
//     for (let i = 0; i < LEN; i++) { 
//         document.getElementById('char' + i + '1').textContent = displayStr[i]; 
//         document.getElementById('char' + i + '2').textContent = displayStr[i];
//     }
// }
// updateTimeAndDate(); 
// setInterval(updateTimeAndDate, 100);

function updateTimeAndDate() {
    const displayStr = calculateTimeDifference('2024-11-30', '08:00:00');
    for (let i = 0; i < LEN; i++) { 
        document.getElementById('char' + i + '1').textContent = displayStr[i]; 
        document.getElementById('char' + i + '2').textContent = displayStr[i];
    }
    requestAnimationFrame(updateTimeAndDate);
}

updateTimeAndDate();