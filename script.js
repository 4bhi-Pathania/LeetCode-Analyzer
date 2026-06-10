let chart;
async function compareUsers() {
  let user1 = document.getElementById("user1").value;
  let user2 = document.getElementById("user2").value;

  let res1 = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${user1}`);
  let res2 = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${user2}`);

  let data1 = await res1.json();
  let data2 = await res2.json();

  if (!data1.totalSolved || !data2.totalSolved) {
    document.getElementById("stats").innerText = "Invalid username ❌";
    return;
  }

  document.getElementById("stats").innerText =
    `${user1} vs ${user2}`;

  //document.getElementById("total").innerText = data1.totalSolved;
  //document.getElementById("easy").innerText = data1.easySolved;
  //document.getElementById("medium").innerText = data1.mediumSolved;
  //document.getElementById("hard").innerText = data1.hardSolved;

  document.getElementById("total").innerText =
  `${data1.totalSolved} vs ${data2.totalSolved}`;

document.getElementById("easy").innerText =
  `${data1.easySolved} vs ${data2.easySolved}`;

document.getElementById("medium").innerText =
  `${data1.mediumSolved} vs ${data2.mediumSolved}`;

document.getElementById("hard").innerText =
  `${data1.hardSolved} vs ${data2.hardSolved}`;

  renderCompareChart(data1, data2, user1, user2);
}
async function getStats() {
  let username = document.getElementById("username").value;

  document.getElementById("stats").innerText = "Loading...";

  let res = await fetch(`https://leetcode-api-faisalshohag.vercel.app/${username}`);
  let data = await res.json();

  // ✅ PUT IT HERE
  if (data.status === "error") {
    alert("Invalid username");
    return;
  }

  document.getElementById("stats").innerText =
    `Total: ${data.totalSolved} | Easy: ${data.easySolved} | Medium: ${data.mediumSolved} | Hard: ${data.hardSolved}`;

  renderChart(data.easySolved, data.mediumSolved, data.hardSolved);
}

function renderCompareChart(d1, d2, user1, user2) {
  const ctx = document.getElementById("chart");
  chart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['Easy', 'Medium', 'Hard'],
    datasets: [
      {
        label: user1,
        data: [d1.easySolved, d1.mediumSolved, d1.hardSolved],
        backgroundColor: '#3b82f6'
      },
      {
        label: user2,
        data: [d2.easySolved, d2.mediumSolved, d2.hardSolved],
        backgroundColor: '#ef4444'
      }
    ]
  },
  options: {
    responsive: true,
    plugins: {
      legend: {
        labels: {
          color: 'white'
        }
      }
    },
    scales: {
      x: {
        ticks: { color: 'white' }
      },
      y: {
        ticks: { color: 'white' }
      }
    }
  }
});
}
