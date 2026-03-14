// Yūnagi Cottage - Schedule & Booking JavaScript

// ========== Configuration ==========
// IMPORTANT: Replace this URL with your deployed Google Apps Script web app URL
const API_URL = 'https://script.google.com/macros/s/AKfycbxfJx7sL2ivA6ddTcaczO30IzqPwsv4CZUlu4uCOxsy1P5QVYspaCfiJT27GNso3ANr/exec';

// ========== DOM Elements ==========
const loadingEl = document.getElementById('loading');
const errorMessageEl = document.getElementById('error-message');
const weekendsGridEl = document.getElementById('weekends-grid');
const modalEl = document.getElementById('reservation-modal');
const modalWeekendLabel = document.getElementById('modal-weekend-label');
const reservationForm = document.getElementById('reservation-form');
const weekendIdInput = document.getElementById('weekend-id');
const closeModalBtn = document.querySelector('.close-modal');
const cancelBtn = document.getElementById('cancel-btn');
const submitBtn = document.getElementById('submit-btn');
const formErrorEl = document.getElementById('form-error');

// ========== State ==========
let weekendsData = [];

// ========== Initialize ==========
document.addEventListener('DOMContentLoaded', () => {
    loadWeekends();
    setupModalHandlers();
});

// ========== Load Weekends Data ==========
async function loadWeekends() {
    try {
        showLoading(true);
        hideError();

        const response = await fetch(API_URL);
        
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        if (data.error) {
            throw new Error(data.error);
        }

        weekendsData = data.weekends || data;
        renderWeekends();
        
    } catch (error) {
        console.error('Error loading weekends:', error);
        showError('Unable to load weekend availability. Please try again later.');
    } finally {
        showLoading(false);
    }
}

// ========== Render Weekends ==========
function renderWeekends() {
    weekendsGridEl.innerHTML = '';

    weekendsData.forEach(weekend => {
        const card = createWeekendCard(weekend);
        weekendsGridEl.appendChild(card);
    });
}

// ========== Create Weekend Card ==========
function createWeekendCard(weekend) {
    const card = document.createElement('div');
    const isAvailable = weekend.status === 'Available';
    
    // Get events for this weekend
    const events = typeof getEventsForWeekend === 'function' ? getEventsForWeekend(weekend.id) : [];
    const hasEvents = events && events.length > 0;
    
    card.className = `weekend-card ${isAvailable ? 'available' : 'taken'}`;
    
    let eventsHtml = '';
    if (hasEvents) {
        eventsHtml = `
            <div class="weekend-events">
                <div class="events-label">What's Happening:</div>
                <ul class="events-list">
                    ${events.map(event => `<li>${event}</li>`).join('')}
                </ul>
            </div>
        `;
    }
    
    card.innerHTML = `
        <div class="weekend-info">
            <div class="weekend-date">${weekend.label}</div>
            <div class="weekend-status ${isAvailable ? 'available' : 'taken'}">
                ${isAvailable ? '✓ Available' : '✗ Reserved'}
            </div>
        </div>
        ${hasEvents ? eventsHtml : '<div></div>'}
        ${isAvailable ? `
            <button class="btn btn-primary reserve-btn" data-weekend-id="${weekend.id}" data-weekend-label="${weekend.label}">
                Reserve This Weekend
            </button>
        ` : `
            <button class="btn btn-secondary" disabled>
                Unavailable
            </button>
        `}
    `;

    // Add event listener to reserve button
    if (isAvailable) {
        const reserveBtn = card.querySelector('.reserve-btn');
        reserveBtn.addEventListener('click', () => {
            openReservationModal(weekend.id, weekend.label);
        });
    }

    return card;
}

// ========== Modal Handlers ==========
function setupModalHandlers() {
    // Close modal on X button
    closeModalBtn.addEventListener('click', closeModal);
    
    // Close modal on cancel button
    cancelBtn.addEventListener('click', closeModal);
    
    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === modalEl) {
            closeModal();
        }
    });

    // Handle form submission
    reservationForm.addEventListener('submit', handleReservation);
}

function openReservationModal(weekendId, weekendLabel) {
    weekendIdInput.value = weekendId;
    modalWeekendLabel.textContent = weekendLabel;
    reservationForm.reset();
    weekendIdInput.value = weekendId; // Reset clears hidden input, so set it again
    hideFormError();
    modalEl.style.display = 'block';
    document.body.style.overflow = 'hidden'; // Prevent background scrolling
}

function closeModal() {
    modalEl.style.display = 'none';
    document.body.style.overflow = 'auto';
    reservationForm.reset();
    hideFormError();
}

// ========== Handle Reservation Submission ==========
async function handleReservation(e) {
    e.preventDefault();
    
    hideFormError();
    setSubmitLoading(true);

    const formData = {
        weekendId: parseInt(document.getElementById('weekend-id').value),
        name: document.getElementById('guest-name').value.trim(),
        email: document.getElementById('guest-email').value.trim(),
        guests: parseInt(document.getElementById('guest-count').value),
        password: document.getElementById('password').value
    };

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData)
        });

        const data = await response.json();

        if (data.error) {
            throw new Error(data.error);
        }

        if (data.success) {
            // Success! Update the UI
            showSuccess(formData.weekendId);
            closeModal();
            // Reload weekends to show updated status
            await loadWeekends();
        } else {
            throw new Error('Reservation failed. Please try again.');
        }

    } catch (error) {
        console.error('Error submitting reservation:', error);
        showFormError(error.message || 'Failed to submit reservation. Please check your information and try again.');
    } finally {
        setSubmitLoading(false);
    }
}

// ========== Success Message ==========
function showSuccess(weekendId) {
    // Create a temporary success banner
    const successBanner = document.createElement('div');
    successBanner.className = 'success-banner';
    successBanner.style.cssText = `
        position: fixed;
        top: 100px;
        left: 50%;
        transform: translateX(-50%);
        background: #4ECDC4;
        color: white;
        padding: 1.5rem 3rem;
        border-radius: 10px;
        box-shadow: 0 5px 20px rgba(0,0,0,0.3);
        z-index: 2000;
        animation: slideDown 0.3s ease;
        text-align: center;
        font-weight: 600;
    `;
    successBanner.innerHTML = `
        <div style="font-size: 2rem; margin-bottom: 0.5rem;">✓</div>
        <div>Reservation Confirmed!</div>
        <div style="font-size: 0.9rem; margin-top: 0.5rem; opacity: 0.9;">You'll receive a confirmation email shortly.</div>
    `;
    
    document.body.appendChild(successBanner);
    
    // Remove after 5 seconds
    setTimeout(() => {
        successBanner.style.animation = 'fadeOut 0.3s ease';
        setTimeout(() => successBanner.remove(), 300);
    }, 5000);
}

// ========== UI Helper Functions ==========
function showLoading(show) {
    loadingEl.style.display = show ? 'block' : 'none';
}

function showError(message) {
    errorMessageEl.textContent = message;
    errorMessageEl.style.display = 'block';
}

function hideError() {
    errorMessageEl.style.display = 'none';
}

function showFormError(message) {
    formErrorEl.textContent = message;
    formErrorEl.style.display = 'block';
}

function hideFormError() {
    formErrorEl.style.display = 'none';
}

function setSubmitLoading(loading) {
    const btnText = submitBtn.querySelector('.btn-text');
    const btnSpinner = submitBtn.querySelector('.btn-spinner');
    
    if (loading) {
        submitBtn.disabled = true;
        btnText.style.display = 'none';
        btnSpinner.style.display = 'inline-block';
    } else {
        submitBtn.disabled = false;
        btnText.style.display = 'inline';
        btnSpinner.style.display = 'none';
    }
}

// ========== Add fadeOut animation ==========
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeOut {
        from { opacity: 1; }
        to { opacity: 0; }
    }
`;
document.head.appendChild(style);
