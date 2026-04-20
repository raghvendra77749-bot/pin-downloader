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
        // Updated Stable API URL
        const response = await fetch(`https://api.social-downloader.com/pinterest?url=${encodeURIComponent(link)}`);
        
        if (!response.ok) throw new Error('API Down');
        
        const data = await response.json();
        loader.style.display = "none";

        // Alag-alag APIs ka data structure alag hota hai, ye common formats check karega
        const finalUrl = data.url || data.link || (data.data ? data.data.url : null);

        if (finalUrl) {
            resultDiv.innerHTML = `
                <p style="color: #4bb543;">Media Ready!</p>
                <a href="${finalUrl}" target="_blank" class="download-btn">Download Now</a>
                <p style="font-size: 12px; color: #888; margin-top:10px;">Note: Agar button se download na ho, toh link open karke 'Save As' karein.</p>
            `;
        } else {
            resultDiv.innerHTML = "<p style='color: #ff9494;'>Media link nahi mila. Dusra link try karein.</p>";
        }
    } catch (error) {
        loader.style.display = "none";
        // Agar pehli API fail ho toh ye message dikhayega
        resultDiv.innerHTML = `
            <p style='color: #ff9494;'>Primary Server Down.</p>
            <p style='font-size:13px;'>Bhai, Pinterest ne temporary block kiya hai. 5 min baad try karo ya kisi aur Pin ka link check karo.</p>
        `;
    }
}
