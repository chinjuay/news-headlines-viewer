const button = document.getElementById("loadNews");
const newsList = document.getElementById("newsList");
const loading = document.getElementById("loading");

const API_KEY = "21ba3e56-7691-4c53-9af3-1118eda985d6";

button.addEventListener("click", () => {
  loading.style.display = "block";

  fetch(`https://content.guardianapis.com/search?order-by=newest&page-size=5&show-fields=trailText&api-key=${API_KEY}`)
    .then(response => response.json())
    .then(data => {
      newsList.innerHTML = "";

      data.response.results.forEach(news => {
        const li = document.createElement("li");

        const date = new Date(news.webPublicationDate).toLocaleDateString("th-TH", {
          day: "numeric",
          month: "long",
          year: "numeric"
        });

        li.innerHTML = `
          <strong>${news.webTitle}</strong>
          <p>${news.fields?.trailText || "ไม่มีคำอธิบาย"}</p>
          <div class="news-meta">
            📰 ${news.sectionName} | 📅 ${date}
          </div>
        `;

        newsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error("เกิดข้อผิดพลาด:", error);
      newsList.innerHTML = "<li>ไม่สามารถโหลดข่าวได้</li>";
    })
    .finally(() => {
      loading.style.display = "none";
    });
});
