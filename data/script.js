// Loading Screen
window.addEventListener('load', () => {
    setTimeout(() => {
        document.getElementById('loadingScreen').style.opacity = '0';
        setTimeout(() => {
            document.getElementById('loadingScreen').style.display = 'none';
        }, 500);
    }, 2000);
});

// Background Animation
function createCircuitAnimation() {
    const bg = document.getElementById('bgAnimation');
    for (let i = 0; i < 30; i++) {
        // Circuit lines
        const line = document.createElement('div');
        line.className = 'circuit-line';
        line.style.top = Math.random() * 100 + '%';
        line.style.animationDelay = Math.random() * 20 + 's';
        line.style.animationDuration = (15 + Math.random() * 10) + 's';
        bg.appendChild(line);

        // Nodes
        const node = document.createElement('div');
        node.className = 'circuit-node';
        node.style.left = Math.random() * 100 + '%';
        node.style.top = Math.random() * 100 + '%';
        node.style.animationDelay = Math.random() * 2 + 's';
        bg.appendChild(node);
    }
}
createCircuitAnimation();

// Tagline Animation
const taglines = ['WE BUILD', 'WE FIX'];
let currentTagline = 0;
const taglineEl = document.getElementById('tagline');

function animateTagline() {
    taglineEl.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    taglineEl.style.opacity = '0';
    taglineEl.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
        taglineEl.textContent = taglines[currentTagline];
        taglineEl.style.opacity = '1';
        taglineEl.style.transform = 'translateY(0)';
        currentTagline = (currentTagline + 1) % taglines.length;
    }, 300);
}

setInterval(animateTagline, 3000);
animateTagline(); // Initial call

// Navigation
document.querySelectorAll('.nav-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const section = btn.dataset.section;
        scrollToSection(section);
    });
});

function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.scrollIntoView({ behavior: 'smooth' });
}

// Contact Purpose
let contactPurpose = 'Type your idea...';
function setContactPurpose(purpose) {
    contactPurpose = purpose;
    document.getElementById('contactPurpose').value = purpose;
    scrollToSection('contact');
}

// Contact Form
document.getElementById('contactForm').addEventListener('submit', (e) => {
    if (!document.getElementById('termsCheckbox').checked) {
        alert('Please accept Terms & Conditions');
        e.preventDefault(); // only block if invalid
    }
});

// Reviews System
let reviews = [
    { name: 'TechCorp Inc.', text: 'BuildBugX delivered our platform 2 weeks early with exceptional quality!', rating: 5 },
    { name: 'StartupX', text: 'Fixed our critical bugs overnight. True professionals!', rating: 5 },
    { name: 'Enterprise Solutions', text: 'Best development partner we\'ve ever worked with.', rating: 5 }
];

function renderReviews() {
    const container = document.getElementById('reviewsContainer');
    container.innerHTML = '';
    reviews.forEach((review, index) => {
        const reviewEl = document.createElement('div');
        reviewEl.className = 'glass-card review-card';
        reviewEl.style.animationDelay = `${index * 0.1}s`;
        reviewEl.innerHTML = `
            <h4>${review.name}</h4>
            <div class="stars">${'★'.repeat(review.rating)}${'☆'.repeat(5 - review.rating)}</div>
            <p>"${review.text}"</p>
        `;
        container.appendChild(reviewEl);
    });
}

// Review Form
document.getElementById('reviewForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('reviewName').value;
    const text = document.getElementById('reviewText').value;
    const rating = document.getElementById('reviewRating').value;
    
    reviews.unshift({ name, text, rating: parseInt(rating) });
    renderReviews();
    
    document.getElementById('reviewForm').reset();
    document.getElementById('reviewRating').value = '5';
    updateStars();
    
    alert('Thank you for your review!');
});

// Star Rating
document.getElementById('ratingStars').addEventListener('click', (e) => {
    if (e.target.dataset.rating) {
        const rating = e.target.dataset.rating;
        document.getElementById('reviewRating').value = rating;
        updateStars();
    }
});

function updateStars() {
    const rating = document.getElementById('reviewRating').value;
    const stars = document.querySelectorAll('#ratingStars i');
    stars.forEach((star, index) => {
        star.className = index < rating ? 'fas fa-star' : 'far fa-star';
    });
}

renderReviews();
updateStars();

// Vedio Modal Functions
function openVedioModal(url) {
    const videoId = new URL(url).searchParams.get("v");

    document.getElementById('videoPlayer').src = `https://www.youtube.com/embed/${videoId}?autoplay=1`;
    document.getElementById('videoModal').style.display = 'flex';
}

function closeVedioModal() {
    document.getElementById('videoModal').style.display = 'none';
    document.getElementById('videoPlayer').src = '';
}

//Image Modal Functions
function openImageModal(src) {
    document.getElementById('modalImage').src = src;
    document.getElementById('imageModal').style.display = 'flex';
}

function closeImageModal() {
    document.getElementById('imageModal').style.display = 'none';
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all glass cards
document.querySelectorAll('.glass-card, .service-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
});

// Contact purpose input handling
document.getElementById('contactPurpose').addEventListener('focus', function() {
    if (this.value === 'Type your idea...') {
        this.value = '';
        this.style.fontStyle = 'normal';
    }
});

document.getElementById('contactPurpose').addEventListener('blur', function() {
    if (this.value === '') {
        this.value = 'Type your idea...';
        this.style.fontStyle = 'italic';
    }
});