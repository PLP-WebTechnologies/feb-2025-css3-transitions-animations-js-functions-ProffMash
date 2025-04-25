document.addEventListener('DOMContentLoaded', function() {
    // Get DOM elements
    const animationToggle = document.getElementById('animation-toggle');
    const themeToggle = document.getElementById('theme-toggle');
    const bgColorPicker = document.getElementById('bg-color');
    const animateBtn = document.getElementById('animate-btn');
    const animatedBox = document.getElementById('animated-box');
    const body = document.body;
    
    // Load preferences from localStorage
    loadPreferences();
    
    // Event listeners
    animationToggle.addEventListener('change', toggleAnimations);
    themeToggle.addEventListener('change', toggleTheme);
    bgColorPicker.addEventListener('input', changeBackgroundColor);
    animateBtn.addEventListener('click', triggerBoxAnimation);
    
    // Add hover effect to gallery images
    document.querySelectorAll('.gallery-img').forEach(img => {
        img.addEventListener('mouseenter', () => {
            if (animationToggle.checked) {
                img.style.transform = 'scale(1.05) rotate(2deg)';
            }
        });
        
        img.addEventListener('mouseleave', () => {
            if (animationToggle.checked) {
                img.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });
    
    // Function to load saved preferences
    function loadPreferences() {
        // Animation preference
        const animationsEnabled = localStorage.getItem('animationsEnabled');
        if (animationsEnabled !== null) {
            animationToggle.checked = animationsEnabled === 'true';
            if (!animationToggle.checked) {
                disableAnimations();
            }
        }
        
        // Theme preference
        const darkModeEnabled = localStorage.getItem('darkModeEnabled');
        if (darkModeEnabled !== null) {
            themeToggle.checked = darkModeEnabled === 'true';
            if (themeToggle.checked) {
                body.classList.add('dark-mode');
            }
        }
        
        // Background color preference
        const bgColor = localStorage.getItem('bgColor');
        if (bgColor) {
            body.style.backgroundColor = bgColor;
            bgColorPicker.value = bgColor;
        }
    }
    
    // Function to toggle animations
    function toggleAnimations() {
        const enabled = animationToggle.checked;
        localStorage.setItem('animationsEnabled', enabled);
        
        if (enabled) {
            enableAnimations();
        } else {
            disableAnimations();
        }
    }
    
    function enableAnimations() {
        animateBtn.classList.add('pulse');
        document.querySelectorAll('.gallery-img').forEach(img => {
            img.style.transition = 'all 0.5s ease';
        });
    }
    
    function disableAnimations() {
        animateBtn.classList.remove('pulse');
        document.querySelectorAll('.gallery-img').forEach(img => {
            img.style.transition = 'none';
        });
    }
    
    // Function to toggle dark mode
    function toggleTheme() {
        const darkMode = themeToggle.checked;
        localStorage.setItem('darkModeEnabled', darkMode);
        
        if (darkMode) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
    }
    
    // Function to change background color
    function changeBackgroundColor() {
        const color = bgColorPicker.value;
        body.style.backgroundColor = color;
        localStorage.setItem('bgColor', color);
    }
    
    // Function to trigger box animation
    function triggerBoxAnimation() {
        if (!animationToggle.checked) return;
        
        animatedBox.classList.add('animate-box');
        
        // Remove the class after animation completes to allow re-triggering
        setTimeout(() => {
            animatedBox.classList.remove('animate-box');
        }, 1500);
    }
    
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (mediaQuery.matches) {
        animationToggle.checked = false;
        disableAnimations();
        animationToggle.disabled = true;
        document.querySelector('label[for="animation-toggle"]').textContent += ' (disabled by system preferences)';
    }
});