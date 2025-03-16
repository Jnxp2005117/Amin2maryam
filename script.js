document.addEventListener('DOMContentLoaded', () => {
    const noBtn = document.querySelector('.no-btn');
    const yesBtn = document.querySelector('.yes-btn');
    const message = document.querySelector('.message');
    const floatingHearts = document.querySelector('.floating-hearts');
    const heartsBg = document.querySelector('.hearts-bg');
    const loadingScreen = document.querySelector('.loading-screen');
    const mainContent = document.querySelector('.main-content');
    const progressBar = document.querySelector('.progress-bar');
    const heartsProgress = document.querySelector('.hearts-progress');
    const loveMeterHearts = document.querySelector('.love-meter-hearts');
    
    // Create hearts for love meter
    const createLoveMeterHearts = () => {
        const heartCount = 10;
        for (let i = 0; i < heartCount; i++) {
            const heart = document.createElement('div');
            heart.innerHTML = '<i class="fas fa-heart"></i>';
            heart.style.position = 'absolute';
            heart.style.left = `${(i / heartCount) * 100}%`;
            heart.style.transform = 'translateX(-50%)';
            heart.style.animationDelay = `${(i / heartCount) * 3 + 0.5}s`;
            loveMeterHearts.appendChild(heart);
        }
    };
    
    // Initialize love meter
    createLoveMeterHearts();

    // Loading animation
    let progress = 0;
    const loadingDuration = 3000; // 3 seconds
    const heartCount = 10; // Number of hearts in the progress bar
    
    // Create hearts for the progress bar
    for (let i = 0; i < heartCount; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.position = 'absolute';
        heart.style.left = `${(i / heartCount) * 100}%`;
        heart.style.fontSize = '16px';
        heart.style.opacity = '0';
        heart.style.transition = 'all 0.3s ease';
        heart.style.transform = 'translateY(0)';
        heartsProgress.appendChild(heart);
    }

    // Loading animation
    const updateLoading = () => {
        progress += 1;
        progressBar.style.width = `${progress}%`;
        
        // Update hearts visibility and animation
        const hearts = heartsProgress.children;
        const heartIndex = Math.floor((progress / 100) * heartCount);
        
        for (let i = 0; i < hearts.length; i++) {
            if (i <= heartIndex) {
                hearts[i].style.opacity = '1';
                hearts[i].style.transform = 'translateY(-2px)';
            }
        }
        
        if (progress < 100) {
            setTimeout(updateLoading, loadingDuration / 100);
        } else {
            // Loading complete
            setTimeout(() => {
                loadingScreen.style.opacity = '0';
                mainContent.style.display = 'block';
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 200);
        }
    };

    // Start loading animation
    loadingScreen.style.transition = 'opacity 0.5s ease';
    setTimeout(updateLoading, 100);

    // Fun messages for the No button
    const noBtnMessages = [
        "No please! 🥺",
        "Don't do this! 💔",
        "HELPPP! 😭",
        "Come back! ❤️",
        "Pretty please! 🙏",
        "Think again! 💝",
        "Are you sure? 🥺",
        "I'm scared! 😢",
        "Don't leave me! 💕",
        "Please stay! 🌹"
    ];
    
    // Create background hearts
    for (let i = 0; i < 20; i++) {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.position = 'absolute';
        heart.style.fontSize = Math.random() * 20 + 10 + 'px';
        heart.style.opacity = '0.2';
        heart.style.left = Math.random() * 100 + 'vw';
        heart.style.top = Math.random() * 100 + 'vh';
        heart.style.color = '#ff1493';
        heart.style.animation = `float ${Math.random() * 5 + 5}s linear infinite`;
        heartsBg.appendChild(heart);
    }

    // Function to create floating heart
    const createFloatingHeart = (x, y) => {
        const heart = document.createElement('div');
        heart.innerHTML = '<i class="fas fa-heart"></i>';
        heart.style.position = 'absolute';
        heart.style.left = x + 'px';
        heart.style.top = y + 'px';
        heart.style.fontSize = '24px';
        heart.style.color = '#ff1493';
        heart.style.pointerEvents = 'none';
        heart.style.animation = 'floatUp 1.5s ease-out forwards';
        floatingHearts.appendChild(heart);
        
        setTimeout(() => {
            floatingHearts.removeChild(heart);
        }, 1500);
    };

    // Function to handle the celebration
    const celebrate = () => {
        message.textContent = "I knew you loved me too! ";
        message.innerHTML += '<i class="fas fa-heart"></i>';
        message.classList.add('show');
        yesBtn.style.transform = 'scale(1.2)';
        
        // Create celebration hearts
        for (let i = 0; i < 30; i++) {
            setTimeout(() => {
                createFloatingHeart(
                    Math.random() * window.innerWidth,
                    window.innerHeight
                );
            }, i * 100);
        }
    };

    // Handle No button interactions
    noBtn.addEventListener('mouseover', () => {
        noBtn.innerHTML = '<i class="fas fa-heart"></i> Yes';
        noBtn.classList.add('yes-btn');
        noBtn.classList.remove('no-btn');
        createFloatingHeart(
            noBtn.offsetLeft + noBtn.offsetWidth / 2,
            noBtn.offsetTop + noBtn.offsetHeight / 2
        );
    });

    noBtn.addEventListener('mouseout', () => {
        noBtn.innerHTML = '<i class="fas fa-times"></i> No';
        noBtn.classList.remove('yes-btn');
        noBtn.classList.add('no-btn');
    });

    noBtn.addEventListener('click', () => {
        celebrate();
    });

    // Handle Yes button click
    yesBtn.addEventListener('click', celebrate);
});

// Add CSS animation for floating hearts
const style = document.createElement('style');
style.textContent = `
    @keyframes floatUp {
        0% {
            transform: translateY(0) scale(1);
            opacity: 1;
        }
        100% {
            transform: translateY(-100px) scale(1.5);
            opacity: 0;
        }
    }
    @keyframes float {
        0% {
            transform: translateY(0) rotate(0deg);
        }
        50% {
            transform: translateY(-20px) rotate(180deg);
        }
        100% {
            transform: translateY(0) rotate(360deg);
        }
    }
`;
document.head.appendChild(style); 