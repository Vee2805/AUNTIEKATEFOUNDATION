// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileToggle = document.getElementById('mobileToggle');
    const navLinks = document.getElementById('navLinks');
    
    if (mobileToggle && navLinks) {
        mobileToggle.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileToggle.classList.toggle('active');
        });
    }
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (navLinks && navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                    mobileToggle.classList.remove('active');
                }
                
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // News filtering functionality
    const categoryButtons = document.querySelectorAll('.category-btn');
    const newsCards = document.querySelectorAll('.news-card');
    
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            const category = this.getAttribute('data-category');
            
            // Filter news cards
            newsCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
    
    // Donation functionality
    const amountOptions = document.querySelectorAll('.amount-option');
    const customAmountInput = document.getElementById('custom-amount-input');
    const typeOptions = document.querySelectorAll('.type-option');
    const programSelect = document.getElementById('program-select');
    const programDesc = document.getElementById('program-desc');
    const paymentMethods = document.querySelectorAll('.payment-method');
    const paymentInstructions = document.querySelectorAll('.payment-instructions');
    
    // Amount selection
    amountOptions.forEach(option => {
        option.addEventListener('click', function() {
            amountOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const amount = this.getAttribute('data-amount');
            updateDonationSummary('amount', amount);
            
            // Update M-Pesa amount
            const mpesaAmount = document.getElementById('mpesa-amount');
            if (mpesaAmount) {
                mpesaAmount.textContent = `KSh ${amount}`;
            }
        });
    });
    
    // Custom amount input
    if (customAmountInput) {
        customAmountInput.addEventListener('input', function() {
            const amount = this.value;
            if (amount) {
                amountOptions.forEach(opt => opt.classList.remove('active'));
                updateDonationSummary('amount', amount);
                
                // Update M-Pesa amount
                const mpesaAmount = document.getElementById('mpesa-amount');
                if (mpesaAmount) {
                    mpesaAmount.textContent = `KSh ${amount}`;
                }
            }
        });
    }
    
    // Donation type selection
    typeOptions.forEach(option => {
        option.addEventListener('click', function() {
            typeOptions.forEach(opt => opt.classList.remove('active'));
            this.classList.add('active');
            
            const type = this.getAttribute('data-type');
            updateDonationSummary('frequency', type === 'one-time' ? 'One-time' : 'Monthly');
        });
    });
    
    // Program selection
    if (programSelect && programDesc) {
        programSelect.addEventListener('change', function() {
            const selectedOption = this.options[this.selectedIndex];
            const description = selectedOption.getAttribute('data-desc');
            programDesc.textContent = description;
            updateDonationSummary('program', selectedOption.text);
        });
    }
    
    // Payment method selection
    paymentMethods.forEach(method => {
        method.addEventListener('click', function() {
            paymentMethods.forEach(m => m.classList.remove('active'));
            this.classList.add('active');
            
            const methodType = this.getAttribute('data-method');
            
            // Show corresponding payment instructions
            paymentInstructions.forEach(instruction => {
                instruction.classList.remove('active');
                if (instruction.id === `${methodType}-instructions` || 
                    instruction.id === `${methodType}-payment` ||
                    instruction.id === `${methodType}-transfer`) {
                    instruction.classList.add('active');
                }
            });
        });
    });
    
    // Donation form submission
    const donationForm = document.getElementById('donation-form');
    if (donationForm) {
        donationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form data
            const formData = new FormData(this);
            const amount = document.querySelector('.amount-option.active')?.getAttribute('data-amount') || 
                          customAmountInput?.value;
            
            if (!amount || amount === '0') {
                alert('Please select or enter a donation amount.');
                return;
            }
            
            // In a real implementation, you would send this data to your server
            // For now, we'll just show a success message
            alert(`Thank you for your donation of KSh ${amount}! We appreciate your support.`);
            
            // Reset form
            this.reset();
            amountOptions.forEach(opt => opt.classList.remove('active'));
            typeOptions[0].classList.add('active');
            programSelect.selectedIndex = 0;
            updateDonationSummary();
        });
    }
    
    // Function to update donation summary
    function updateDonationSummary(type, value) {
        const summaryAmount = document.getElementById('summary-amount');
        const summaryFrequency = document.getElementById('summary-frequency');
        const summaryProgram = document.getElementById('summary-program');
        const summaryTotal = document.getElementById('summary-total');
        
        if (type === 'amount' && summaryAmount && summaryTotal) {
            summaryAmount.textContent = `KSh ${value}`;
            summaryTotal.textContent = `KSh ${value}`;
        }
        
        if (type === 'frequency' && summaryFrequency) {
            summaryFrequency.textContent = value;
        }
        
        if (type === 'program' && summaryProgram) {
            summaryProgram.textContent = value;
        }
    }
    
    // Initialize donation summary
    updateDonationSummary();
    
    // Contact form submission
    const contactForm = document.querySelector('.contact-form form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // In a real implementation, you would send this data to your server
            // For now, we'll just show a success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            this.reset();
        });
    }
    
    // Load more news functionality
    const loadMoreBtn = document.getElementById('loadMoreNews');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', function() {
            // In a real implementation, you would fetch more news from a server
            // For now, we'll just show an alert
            alert('Loading more news... In a real implementation, this would fetch additional news items from a server.');
        });
    }
    
    // Add active class to current section in navigation
    window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 100)) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
    
    // Animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.stat-item, .mission-card, .value-item, .story-card').forEach(el => {
        observer.observe(el);
    });
});