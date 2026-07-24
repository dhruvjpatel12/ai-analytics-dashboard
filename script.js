const WEBHOOK_URL =
"http://localhost:5678/webhook/upload-data";

const generateBtn = document.getElementById("generateBtn");
const fileInput = document.getElementById("excelFile");
const status = document.getElementById("status");

generateBtn.addEventListener("click", async () => {
    const file = fileInput.files[0];
    if (!file) {
        alert("Please select an Excel file.");
        return;
    }

    generateBtn.disabled = true;
    generateBtn.innerText = "Generating Report...";
    status.innerHTML = "📤 Uploading Excel file...";
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(WEBHOOK_URL, {
            method: "POST",
            body: formData
        });
        if (!response.ok) {
            throw new Error(`Server returned ${response.status}`);
        }
        status.innerHTML = "🤖 AI is generating your report...";
        const html = await response.text();
        status.innerHTML = "✅ Report Generated!";
        document.open();
        document.write(html);
        document.close();
    } catch (error) {
        console.error(error);
        status.innerHTML =
            "❌ Failed to generate report.<br><br>" +
            error.message;
        generateBtn.disabled = false;
        generateBtn.innerText = "Generate Report";
    }
});