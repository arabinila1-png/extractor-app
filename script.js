let extractedData = [];
let currentIndex = 0;

function extractFile() {
  const file = document.getElementById("fileInput").files[0];
  if (!file) {
    alert("Please upload a file first!");
    return;
  }

  const reader = new FileReader();
  reader.onload = function(e) {
    const text = e.target.result;
    // CSV/TXT থেকে Name,Email ধরবে
    extractedData = text.split("\n").map(line => line.trim()).filter(line => line.includes(","));
    currentIndex = 0;
    showData();
  };
  reader.readAsText(file);
}

function showData() {
  const infoList = document.getElementById("infoList");
  infoList.innerHTML = "";

  let endIndex = Math.min(currentIndex + 5, extractedData.length);
  for (let i = currentIndex; i < endIndex; i++) {
    let li = document.createElement("li");
    li.textContent = `${i+1}) ${extractedData[i]}`;
    li.onclick = () => copyInfo(extractedData[i]);
    infoList.appendChild(li);
  }
}

function nextData() {
  if (currentIndex + 5 < extractedData.length) {
    currentIndex += 5;
    showData();
  } else {
    alert("No more data!");
  }
}

function copyInfo(info) {
  navigator.clipboard.writeText(info);
  alert("Copied: " + info);
}

function loadWebsite() {
  const link = document.getElementById("websiteLink").value;
  if (!link.startsWith("http")) {
    alert("Please enter full URL with http/https");
    return;
  }
  document.getElementById("webFrame").src = link;
}