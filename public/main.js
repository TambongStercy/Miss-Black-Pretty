// image swap
let currentImageIndex = 0;
const imageSources = [
    "img/Home-hero-background.png",
    "img/Home-hero-background-2.png", 
    "img/Home-hero-background-3.png"   
];
const interval = 15000; // 

function changeHeroImage() {
    const heroImage = document.getElementById("hero-image");
    currentImageIndex = (currentImageIndex + 1) % imageSources.length;

    heroImage.classList.add("swap-animation");
    setTimeout(() => {
        heroImage.src = imageSources[currentImageIndex]; // Change the image source
        heroImage.classList.remove("swap-animation");
    }, 500); // Adjust this time to match your desired animation duration
}

// Initial image change
changeHeroImage();

// Set an interval to change the image every 15 seconds
setInterval(changeHeroImage, interval);


//End of image swap
// Countdown start
    // Set the target date for the countdown (YYYY, MM, DD, HH, MM, SS)
    const targetDate = new Date("2023-12-31 00:00:00").getTime();

    // Update the countdown every second
    const countdown = setInterval(function() {
        const now = new Date().getTime();
        const timeRemaining = targetDate - now;

        if (timeRemaining <= 0) {
            clearInterval(countdown); // Countdown has expired
        } else {
            const days = Math.floor(timeRemaining / (1000 * 60 * 60 * 24));
            const hours = Math.floor((timeRemaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutes = Math.floor((timeRemaining % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((timeRemaining % (1000 * 60)) / 1000);

            document.querySelector(".days").textContent = String(days).padStart(2, "0");
            document.querySelector(".hours").textContent = String(hours).padStart(2, "0");
            document.querySelector(".minutes").textContent = String(minutes).padStart(2, "0");
            document.querySelector(".seconds").textContent = String(seconds).padStart(2, "0");
        }
    }, 1000); // Update every second
//Count down end