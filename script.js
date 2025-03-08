document.getElementById("contact-form").addEventListener("submit", async (e) => {
    e.preventDefault();
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);

    const response = await fetch("/api/contact", { 
        method: "POST", 
        headers: { "Content-Type": "application/json" }, 
        body: JSON.stringify(data) 
    });

    const result = await response.json();
    alert(result.success || result.error);
});
