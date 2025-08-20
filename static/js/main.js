// Main JavaScript functionality for the Resume Parser App

document.addEventListener('DOMContentLoaded', function() {
    // Initialize tooltips
    var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });

    // File upload validation
    const fileInput = document.getElementById('resumeFile');
    if (fileInput) {
        fileInput.addEventListener('change', function(e) {
            const file = e.target.files[0];
            if (file) {
                // Check file size (max 16MB)
                if (file.size > 16 * 1024 * 1024) {
                    alert('File size must be less than 16MB');
                    this.value = '';
                    return;
                }

                // Check file type
                const allowedTypes = ['application/pdf', 'text/plain'];
                if (!allowedTypes.includes(file.type)) {
                    alert('Please upload only PDF or TXT files');
                    this.value = '';
                    return;
                }

                // Update file name display
                const fileName = document.querySelector('.file-name');
                if (fileName) {
                    fileName.textContent = `Selected: ${file.name}`;
                    fileName.classList.add('text-success');
                }
            }
        });
    }

    // Smooth scrolling for anchor links
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

    // Add loading state to form submission
    const form = document.querySelector('form[action="/pred"]');
    if (form) {
        form.addEventListener('submit', function(e) {
            const fileInput = this.querySelector('input[type="file"]');
            if (!fileInput.files.length) {
                e.preventDefault();
                alert('Please select a resume file to upload');
                return;
            }

            // Show loading state
            const submitBtn = this.querySelector('button[type="submit"]');
            const loading = document.querySelector('.loading');
            
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i>Analyzing...';
            }
            
            if (loading) {
                loading.classList.add('show');
            }
        });
    }

    // Add animation to results when they appear
    const results = document.querySelectorAll('.result-card, .card');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '0';
                entry.target.style.transform = 'translateY(20px)';
                entry.target.style.transition = 'all 0.6s ease';
                
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, 100);
            }
        });
    });

    results.forEach(result => {
        observer.observe(result);
    });

    // Add click-to-copy functionality for contact information
    const copyableElements = document.querySelectorAll('.copyable');
    copyableElements.forEach(element => {
        element.style.cursor = 'pointer';
        element.title = 'Click to copy';
        
        element.addEventListener('click', function() {
            const text = this.textContent.trim();
            navigator.clipboard.writeText(text).then(() => {
                // Show success feedback
                const originalHTML = this.innerHTML;
                this.innerHTML = '<i class="fas fa-check text-success"></i> Copied!';
                
                setTimeout(() => {
                    this.innerHTML = originalHTML;
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy text: ', err);
            });
        });
    });
});

// Utility functions
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '9999';
    notification.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 5000);
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}