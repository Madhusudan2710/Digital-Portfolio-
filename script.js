// Navigation toggle
const navToggle = document.getElementById("navToggle")
const navMenu = document.querySelector(".nav-menu")

navToggle.addEventListener("click", () => {
  navToggle.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close menu when clicking on a nav link
document.querySelectorAll(".nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navToggle.classList.remove("active")
    navMenu.classList.remove("active")
  })
})

// Header scroll effect
window.addEventListener("scroll", () => {
  const header = document.querySelector("header")
  if (window.scrollY > 50) {
    header.classList.add("scrolled")
  } else {
    header.classList.remove("scrolled")
  }
})

// Back to top button
const backToTopBtn = document.getElementById("backToTop")

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTopBtn.classList.add("active")
  } else {
    backToTopBtn.classList.remove("active")
  }
})

// Portfolio filter
const filterBtns = document.querySelectorAll(".filter-btn")
const portfolioItems = document.querySelectorAll(".portfolio-item")

filterBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    // Remove active class from all buttons
    filterBtns.forEach((btn) => btn.classList.remove("active"))

    // Add active class to clicked button
    btn.classList.add("active")

    // Get filter value
    const filterValue = btn.getAttribute("data-filter")

    // Filter portfolio items
    portfolioItems.forEach((item) => {
      if (filterValue === "all" || item.getAttribute("data-category") === filterValue) {
        item.style.display = "block"
      } else {
        item.style.display = "none"
      }
    })
  })
})

// Animate skill bars on scroll
const skillBars = document.querySelectorAll(".skill-progress")
const skillSection = document.querySelector(".skills")

const animateSkills = () => {
  const sectionPos = skillSection.getBoundingClientRect().top
  const screenPos = window.innerHeight / 1.3

  if (sectionPos < screenPos) {
    skillBars.forEach((bar) => {
      const width = bar.getAttribute("data-width") || bar.style.width.replace('%', '') || bar.getAttribute("style")?.match(/width: (\d+)%/)?.[1] || 0
      bar.style.width = "0%"
      setTimeout(() => {
        bar.style.width = `${width}%`
      }, 100)
    })

    // Remove event listener after animation
    window.removeEventListener("scroll", animateSkills)
  }
}

window.addEventListener("scroll", animateSkills)

// Contact form submission - IMPROVED VERSION
const contactForm = document.getElementById("contactForm")
const submitBtn = document.getElementById("submit-btn")
const formMessage = document.getElementById("form-message")

if (contactForm) {
  // Create a direct email link as fallback
  const emailFallback = document.createElement('a');
  emailFallback.id = 'email-fallback';
  emailFallback.href = `mailto:madhusudan27102005@gmail.com?subject=Contact from Portfolio`;
  emailFallback.style.display = 'none';
  document.body.appendChild(emailFallback);
  
  contactForm.addEventListener("submit", function(e) {
    e.preventDefault(); // Prevent default form submission
    
    // Show loading state
    const originalBtnContent = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;
    
    // Clear previous messages
    formMessage.innerHTML = '';
    
    // Get form data
    const formData = new FormData(contactForm);
    const name = formData.get('name');
    const email = formData.get('email');
    const subject = formData.get('subject');
    const message = formData.get('message');
    
    // Create a timeout for the form submission
    const timeoutId = setTimeout(() => {
      // If it takes too long, show error and offer email fallback
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
      
      formMessage.innerHTML = `
        <div class="error-message">
          <p>The form is taking longer than expected. Please try sending an email directly or try again later.</p>
          <button id="email-direct-btn" class="btn secondary-btn" style="margin-top: 10px; margin-left: 0;">
            <span class="btn-content">
              <i class="fas fa-envelope"></i> Send Email Directly
            </span>
          </button>
        </div>
      `;
      
      // Add event listener to the direct email button
      document.getElementById('email-direct-btn').addEventListener('click', function() {
        // Create mailto link with form data
        const mailtoLink = `mailto:madhusudan27102005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;
      });
    }, 5000); // 5 seconds timeout
    
    // Use fetch to submit the form to formsubmit.co
    fetch('https://formsubmit.co/ajax/madhusudan27102005@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: name,
        email: email,
        subject: subject,
        message: message
      })
    })
    .then(response => {
      clearTimeout(timeoutId); // Clear the timeout
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Show success message
      showSuccessMessage();
    })
    .catch(error => {
      clearTimeout(timeoutId); // Clear the timeout
      console.error('Error:', error);
      
      // Show error message with fallback option
      submitBtn.innerHTML = originalBtnContent;
      submitBtn.disabled = false;
      
      formMessage.innerHTML = `
        <div class="error-message">
          <p>There was an error sending your message. Please try sending an email directly or try again later.</p>
          <button id="email-direct-btn" class="btn secondary-btn" style="margin-top: 10px; margin-left: 0;">
            <span class="btn-content">
              <i class="fas fa-envelope"></i> Send Email Directly
            </span>
          </button>
        </div>
      `;
      
      // Add event listener to the direct email button
      document.getElementById('email-direct-btn').addEventListener('click', function() {
        // Create mailto link with form data
        const mailtoLink = `mailto:madhusudan27102005@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`;
        window.location.href = mailtoLink;
      });
    });
  });
}

function showSuccessMessage() {
  // Replace form with success message
  const contactFormContainer = contactForm.parentElement
  contactFormContainer.innerHTML = `
    <div class="success-message">
      <div class="success-icon">
        <i class="fas fa-check-circle"></i>
      </div>
      <h3>Message Sent Successfully!</h3>
      <p>Thank you for reaching out. I'll get back to you soon.</p>
      <button class="btn primary-btn" id="send-another-btn">
        Send Another Message
      </button>
    </div>
  `
  
  // Add event listener to "Send Another Message" button
  const sendAnotherBtn = document.getElementById('send-another-btn')
  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', function() {
      // Reload the contact form
      location.reload()
    })
  }
}

// Certification tabs functionality
const tabButtons = document.querySelectorAll(".certification-tabs-list button")
const tabContents = document.querySelectorAll(".certification-grid")

tabButtons.forEach((button) => {
  button.addEventListener("click", () => {
    // Remove active class from all buttons and contents
    tabButtons.forEach((btn) => btn.classList.remove("active"))
    tabContents.forEach((content) => content.classList.remove("active"))

    // Add active class to clicked button
    button.classList.add("active")

    // Show corresponding content
    const tabId = button.getAttribute("data-tab")
    document.getElementById(`${tabId}-tab`).classList.add("active")
  })
})

// Certificate Modal Functionality
document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('certificate-modal');
  const modalImage = document.getElementById('modal-image');
  const modalTitle = document.getElementById('modal-title');
  const closeModal = document.querySelector('.close-modal');
  const certificateImages = document.querySelectorAll('.certificate-image');
  
  // Open modal when certificate is clicked
  certificateImages.forEach(img => {
    img.addEventListener('click', function() {
      const imgSrc = this.getAttribute('src');
      const imgTitle = this.getAttribute('data-title') || 'Certificate';
      
      modalImage.src = imgSrc;
      modalTitle.textContent = imgTitle;
      
      modal.classList.add('show');
      document.body.style.overflow = 'hidden'; // Prevent scrolling when modal is open
    });
  });
  
  // Close modal when X is clicked
  closeModal.addEventListener('click', () => {
    modal.classList.remove('show');
    setTimeout(() => {
      modalImage.src = '';
      document.body.style.overflow = ''; // Re-enable scrolling
    }, 300); // Wait for animation to complete
  });
  
  // Close modal when clicking outside of it
  window.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('show');
      setTimeout(() => {
        modalImage.src = '';
        document.body.style.overflow = ''; // Re-enable scrolling
      }, 300);
    }
  });
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('show')) {
      modal.classList.remove('show');
      setTimeout(() => {
        modalImage.src = '';
        document.body.style.overflow = ''; // Re-enable scrolling
      }, 300);
    }
  });
  
  // Prevent right-click on images
  document.addEventListener('contextmenu', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });
  
  // Prevent image dragging
  document.querySelectorAll('img').forEach(img => {
    img.addEventListener('dragstart', (e) => {
      e.preventDefault();
    });
  });
  
  // Fix scrolling issues with navbar
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      
      // Get the target section
      const targetId = this.getAttribute('href');
      const targetSection = document.querySelector(targetId);
      
      if (targetSection) {
        // Calculate position with offset for fixed header
        const headerHeight = 80; // Height of your fixed header
        const targetPosition = targetSection.getBoundingClientRect().top + window.pageYOffset - headerHeight;
        
        // Smooth scroll to target
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
        
        // Close mobile menu if open
        navToggle.classList.remove('active');
        navMenu.classList.remove('active');
      }
    });
  });

  // Check if we came back from form submission
  if (window.location.search.includes('success=true')) {
    // Show success message
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
      showSuccessMessage();
    }
    
    // Clean up the URL
    window.history.replaceState({}, document.title, window.location.pathname);
  }
});