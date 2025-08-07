
// 🚫 INSPECT BLOCKING FUNCTIONALITY
// Disable right-click context menu
document.addEventListener('contextmenu', function(e) {
    e.preventDefault();
    return false;
});

// Disable F12, Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+U, Ctrl+Shift+C
document.addEventListener('keydown', function(e) {
    // F12
    if (e.keyCode === 123) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+I (Developer Tools)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 73) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+J (Console)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 74) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+U (View Source)
    if (e.ctrlKey && e.keyCode === 85) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+C (Element Inspector)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 67) {
        e.preventDefault();
        return false;
    }
    
    // Ctrl+Shift+K (Console in Firefox)
    if (e.ctrlKey && e.shiftKey && e.keyCode === 75) {
        e.preventDefault();
        return false;
    }
    
    // F5 and Ctrl+R (Refresh) - Optional, uncomment if needed
    // if (e.keyCode === 116 || (e.ctrlKey && e.keyCode === 82)) {
    //     e.preventDefault();
    //     return false;
    // }
});

// Text selection is now ENABLED for user convenience

// Disable drag and drop
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});

// Detect DevTools opening (basic detection)
let devtools = {
    open: false,
    orientation: null
};

const threshold = 160;

setInterval(function() {
    if (window.outerHeight - window.innerHeight > threshold || 
        window.outerWidth - window.innerWidth > threshold) {
        if (!devtools.open) {
            devtools.open = true;
            // Redirect or show warning when DevTools detected
            document.body.innerHTML = '<div style="position:fixed;top:0;left:0;width:100%;height:100%;background:#000;color:#fff;display:flex;align-items:center;justify-content:center;font-size:24px;z-index:999999;">⚠️ Developer Tools Detected - Access Restricted</div>';
        }
    } else {
        devtools.open = false;
    }
}, 500);

// Disable console.log and other console methods
if (typeof console !== 'undefined') {
    console.log = function() {};
    console.warn = function() {};
    console.error = function() {};
    console.info = function() {};
    console.debug = function() {};
    console.clear = function() {};
    console.dir = function() {};
    console.dirxml = function() {};
    console.table = function() {};
    console.trace = function() {};
    console.group = function() {};
    console.groupCollapsed = function() {};
    console.groupEnd = function() {};
    console.time = function() {};
    console.timeEnd = function() {};
    console.profile = function() {};
    console.profileEnd = function() {};
    console.count = function() {};
}

// Disable common debugging functions
window.eval = function() { return false; };
window.Function = function() { return false; };

// Clear console periodically
setInterval(function() {
    if (typeof console !== 'undefined' && console.clear) {
        console.clear();
    }
}, 1000);

// Disable print functionality
window.print = function() {
    return false;
};

// Block common developer shortcuts (but allow text selection)
document.addEventListener('keydown', function(e) {
    // Allow Ctrl+A (Select All) for text selection
    // Allow Ctrl+C (Copy) for copying text
    
    // Block Ctrl+S (Save)
    if (e.ctrlKey && e.keyCode === 83) {
        e.preventDefault();
        return false;
    }
    
    // Block Ctrl+P (Print)
    if (e.ctrlKey && e.keyCode === 80) {
        e.preventDefault();
        return false;
    }
});

// Disable image saving
document.addEventListener('dragstart', function(e) {
    if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
    }
});

// Loading Screen
window.addEventListener('load', function () {
    const loading = document.getElementById('loading');
    setTimeout(() => {
        loading.classList.add('hidden');
    }, 1000);
});

// Scroll Progress Bar & Scroll to Top Button
window.addEventListener('scroll', function () {
    const scrollProgress = document.getElementById('scrollProgress');
    const scrollToTop = document.getElementById('scrollToTop');
    const scrollTop = window.pageYOffset;
    const docHeight = document.body.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;

    // Update progress bar
    scrollProgress.style.width = scrollPercent + '%';

    // Show/hide scroll to top button
    if (scrollTop > 300) {
        scrollToTop.classList.add('visible');
    } else {
        scrollToTop.classList.remove('visible');
    }
});

// Scroll to Top Button Click Handler
document.getElementById('scrollToTop').addEventListener('click', function () {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Navbar Scroll Effect
window.addEventListener('scroll', function () {
    const navbar = document.getElementById('navbar');
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Navigation Toggle
const navToggle = document.getElementById('navToggle');
const navMenu = document.getElementById('navMenu');

navToggle.addEventListener('click', function () {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function () {
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth Scrolling for Navigation Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Animated Counter for Hero Stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    const timer = setInterval(() => {
        start += increment;
        element.textContent = Math.floor(start);
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        }
    }, 16);
}

// Initialize counters when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.querySelectorAll('.stat-number').forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            heroObserver.unobserve(entry.target);
        }
    });
});

heroObserver.observe(document.querySelector('.hero-stats'));

// Tab Functionality
document.querySelectorAll('.tab').forEach(tab => {
    tab.addEventListener('click', function () {
        const tabId = this.getAttribute('data-tab');

        // Remove active class from all tabs and content
        document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));

        // Add active class to clicked tab and corresponding content
        this.classList.add('active');
        document.getElementById('tab-' + tabId).classList.add('active');
    });
});

// Cost Calculator
function updateCostCalculator() {
    const apiCalls = parseInt(document.getElementById('apiCalls').value) || 0;
    const tokensPerCall = parseInt(document.getElementById('tokensPerCall').value) || 0;
    const totalTokens = apiCalls * tokensPerCall;

    // Pricing per 1M tokens (approximate)
    const gpt4Price = 20; // $20 per 1M tokens
    const ossHostingCost120b = 2.1; // $2.10 per 1M tokens (hosting cost)
    const ossHostingCost20b = 0.85; // $0.85 per 1M tokens (hosting cost)

    const gpt4Cost = (totalTokens / 1000000) * gpt4Price;
    const oss120bCost = (totalTokens / 1000000) * ossHostingCost120b;
    const oss20bCost = (totalTokens / 1000000) * ossHostingCost20b;

    document.getElementById('gpt4Cost').textContent = '$' + Math.round(gpt4Cost).toLocaleString();
    document.getElementById('gptOss120bCost').textContent = '$' + Math.round(oss120bCost).toLocaleString();
    document.getElementById('gptOss20bCost').textContent = '$' + Math.round(oss20bCost).toLocaleString();

    const savings20b = ((gpt4Cost - oss20bCost) / gpt4Cost * 100).toFixed(1);
    document.getElementById('maxSavings').textContent = savings20b + '%';
}

// Initialize cost calculator
document.getElementById('apiCalls').addEventListener('input', updateCostCalculator);
document.getElementById('tokensPerCall').addEventListener('input', updateCostCalculator);
updateCostCalculator();

// Performance Chart
const ctx = document.getElementById('performanceChart').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['MMLU', 'AIME 2024', 'HealthBench', 'Codeforces', 'TauBench'],
        datasets: [
            {
                label: 'GPT-OSS 120B',
                data: [90.0, 96.6, 57.6, 85, 92.1],
                backgroundColor: 'rgba(52, 168, 83, 0.8)',
                borderColor: 'rgba(52, 168, 83, 1)',
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            },
            {
                label: 'GPT-OSS 20B',
                data: [85.3, 96.0, 42.5, 82, 89.7],
                backgroundColor: 'rgba(142, 68, 173, 0.8)',
                borderColor: 'rgba(142, 68, 173, 1)',
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            },
            {
                label: 'o4-mini',
                data: [93.0, 98.7, 60.2, 88, 93.4],
                backgroundColor: 'rgba(158, 158, 158, 0.6)',
                borderColor: 'rgba(158, 158, 158, 1)',
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            },
            {
                label: 'o3-mini',
                data: [87.0, 87.3, 45.8, 76, 88.2],
                backgroundColor: 'rgba(189, 189, 189, 0.6)',
                borderColor: 'rgba(189, 189, 189, 1)',
                borderWidth: 2,
                borderRadius: 4,
                borderSkipped: false,
            }
        ]
    },
    options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            title: {
                display: true,
                text: 'Model Performance Across Key Benchmarks',
                color: '#ffffff',
                font: {
                    size: 16,
                    weight: 'bold'
                },
                padding: {
                    top: 10,
                    bottom: 30
                }
            },
            legend: {
                display: true,
                position: 'top',
                labels: {
                    color: '#ffffff',
                    usePointStyle: true,
                    padding: 20,
                    font: {
                        size: 12,
                        weight: '600'
                    }
                }
            },
            tooltip: {
                backgroundColor: 'rgba(0, 0, 0, 0.8)',
                titleColor: '#ffffff',
                bodyColor: '#ffffff',
                borderColor: 'rgba(255, 255, 255, 0.1)',
                borderWidth: 1,
                callbacks: {
                    label: function (context) {
                        return `${context.dataset.label}: ${context.parsed.y}%`;
                    }
                }
            }
        },
        scales: {
            x: {
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 12,
                        weight: '500'
                    }
                }
            },
            y: {
                beginAtZero: true,
                max: 100,
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)',
                    drawBorder: false
                },
                ticks: {
                    color: '#ffffff',
                    font: {
                        size: 12
                    },
                    callback: function (value) {
                        return value + '%';
                    }
                },
                title: {
                    display: true,
                    text: 'Accuracy (%)',
                    color: '#ffffff',
                    font: {
                        size: 14,
                        weight: '600'
                    }
                }
            }
        },
        interaction: {
            intersect: false,
            mode: 'index'
        },
        animation: {
            duration: 2000,
            easing: 'easeInOutQuart'
        }
    }
});

// Initialize AOS (Animate On Scroll)
AOS.init({
    duration: 800,
    easing: 'ease-in-out',
    once: true,
    offset: 100
});

// Parallax Effect for Hero Section
window.addEventListener('scroll', function () {
    const scrolled = window.pageYOffset;
    const parallax = document.querySelector('.animated-bg');
    const speed = scrolled * 0.5;
    parallax.style.transform = `translateY(${speed}px)`;
});

// Add scroll-triggered animations for elements without AOS
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for scroll animations
document.querySelectorAll('.fade-in, .slide-in-left, .slide-in-right, .scale-in').forEach(el => {
    observer.observe(el);
});
