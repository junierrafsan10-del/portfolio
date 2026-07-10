
function updateTime() {
    const timeElement = document.getElementById('live-time');
    if (timeElement) {
        const now = new Date();
        // আমাদের লোকাল টাইম ফরম্যাটে সুন্দর করে সাজানো
        timeElement.innerText = now.toLocaleTimeString(); 
    }
}

// প্রতি ১০০০ মিলিসেকেন্ড (১ সেকেন্ড) পর পর updateTime ফাংশনটি রান হবে
setInterval(updateTime, 1000);

// পেজ লোড হওয়া মাত্রই প্রথমবার রান করার জন্য
updateTime();