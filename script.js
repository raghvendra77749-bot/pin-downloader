async function getMedia() {
    const link = document.getElementById('pinLink').value;
    const resultDiv = document.getElementById('result');
    const loader = document.getElementById('loader');

    if (!link) {
        alert("Pehle link toh dalo bhai!");
        return;
    }

    loader.style.display = "block";
    resultDiv.innerHTML = "";

    try {
        // Hum ek free API use kar rahe hain jo link extract karti hai
        const response = await fetch(`https://api.punit.workers.dev/api/pinterest?url=${link}`);
        const data = await response.json();

        loader.style.display = "none";

        if (data.url) {
            const isVideo = data.url.includes(".mp4");
            resultDiv.innerHTML = `
                <p style="color: #4bb543;">Media Found!</p>
                <a href="${data.url}" target="_blank" class="download-btn" download>Download ${isVideo ? 'Video' : 'Image'}</a>
            `;
        } else {
            resultDiv.innerHTML = "<p style='color: #ff9494;'>Media nahi mila. Link check karein.</p>";
        }
    } catch (error) {
        loader.style.display = "none";
        resultDiv.innerHTML = "<p style='color: #ff9494;'>Error: Server busy hai, thodi der baad try karein.</p>";
    }
}
