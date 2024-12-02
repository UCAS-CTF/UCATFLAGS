const ctx = document.getElementById('scoreChart').getContext('2d');

let scoreChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: [], // X轴标签，初始为空
        datasets: [{
            label: 'Team Scores',
            data: [], // Y轴数据，初始为空
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: false
            }
        }
    }
});

function fetchData() {
    axios.get('http://124.16.75.162:31114/api/v1/scoreboard/top/10')
        .then(response => {
            const data = response.data.data;
            const scores = [];
            const labels = [];
            Object.keys(data).forEach(key => {
                const team = data[key];
                labels.push(team.name);
                let totalScore = team.solves.reduce((sum, solve) => sum + solve.value, 0);
                scores.push(totalScore);
            });

            scoreChart.data.labels = labels;
            scoreChart.data.datasets[0].data = scores;
            scoreChart.update();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

// 初始加载数据
fetchData();

// 每5分钟更新一次数据
setInterval(fetchData, 300000);