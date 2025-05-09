document.addEventListener("DOMContentLoaded", function() {
    // Mobile menu toggle functionality
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navMenu = document.querySelector('.nav-menu');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(event) {
        if (!navMenu.contains(event.target) && !mobileMenuBtn.contains(event.target) && navMenu.classList.contains('active')) {
            navMenu.classList.remove('active');
            mobileMenuBtn.classList.remove('active');
        }
    });
    
    // Navigation links functionality
    document.querySelectorAll("nav ul li a").forEach(link => {
        const handleNavigation = function(e) {
            e.preventDefault();
            const section = this.getAttribute("href").substring(1);
            
            // Hide mobile menu when clicking on a link
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                mobileMenuBtn.classList.remove('active');
            }
            
            document.getElementById("content").innerHTML = `<h2>${section}</h2><p>Content for ${section}</p>`;
        };
        
        link.addEventListener("click", handleNavigation);
        link.addEventListener("touchstart", handleNavigation); // For touch devices
    });
    
    // Name typing effect
    const nameElement = document.querySelector(".name");
    if (nameElement) {
        const nameText = "Karthik";
        let index = 0;
        
        function typeWriter() {
            if (index < nameText.length) {
                nameElement.textContent += nameText.charAt(index);
                index++;
                setTimeout(typeWriter, 150);
            } else {
                nameElement.style.borderRight = "none"; // Remove cursor after typing
                
                // Start glow effect after typing completes
                setTimeout(() => {
                    nameElement.classList.add("typed");
                }, 500);
            }
        }
        
        typeWriter();
    }
});

// Form validation
function validateForm() {
    let name = document.getElementById("name").value.trim();
    let phone = document.getElementById("phone").value.trim();
    let message = document.getElementById("message").value.trim();
   
    if (name === "" || phone === "" || message === "") {
        alert("All fields are required.");
        return false;
    }
    
    // Validate phone number (10-digit Indian number)
    let phoneRegex = /^[6-9]\d{9}$/;
    if (!phoneRegex.test(phone)) {
        alert("Enter a valid 10-digit phone number.");
        return false;
    }
    
    return true;
}

// Form submission handler
document.addEventListener("DOMContentLoaded", function() {
    const contactForm = document.getElementById("contactForm");
    
    if (contactForm) {
        contactForm.addEventListener("submit", function(event) {
            event.preventDefault(); // Prevent form from reloading the page
            
            if (validateForm()) {
                var formData = new FormData(this);
                
                fetch("/submit-form", {
                    method: "POST",
                    body: formData
                })
                .then(response => response.text())
                .then(data => {
                    alert("Message sent successfully!");
                    contactForm.reset(); // Clear the form
                })
                .catch(error => {
                    console.error("Error:", error);
                    alert("There was an error sending your message. Please try again.");
                });
            }
        });
    }
});