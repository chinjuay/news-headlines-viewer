const button = document.getElementById("loadNews");
const newsList = document.getElementById("newsList");

const API_KEY = "21ba3e56-7691-4c53-9af3-1118eda985d6";

button.addEventListener("click", () => {
  fetch(`https://content.guardianapis.com/search?api-key=${API_KEY}&show-fields=trailText&order-by=newest&page-size=5`)
    .then(response => response.json())
    .then(data => {
      newsList.innerHTML = ""; // ล้างข้อมูลเก่า

      data.response.results.forEach(news => {
        const li = document.createElement("li");
        li.innerHTML = `
          <h3>${news.webTitle}</h3>
          <p>${news.fields?.trailText || "ไม่มีคำอธิบาย"}</p>
          <small>เผยแพร่: ${new Date(news.webPublicationDate).toLocaleString()}</small>
          <hr>
        `;
        newsList.appendChild(li);
      });
    })
    .catch(error => {
      console.error("เกิดข้อผิดพลาด:", error);
    });
});
