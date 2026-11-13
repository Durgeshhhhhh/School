// Main JavaScript for Little Orbit Pre-Primary & Preschool Website

document.addEventListener('DOMContentLoaded', () => {
    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            const isExpanded = mobileMenuBtn.getAttribute('aria-expanded') === 'true';
            mobileMenuBtn.setAttribute('aria-expanded', !isExpanded);
            mobileMenu.classList.toggle('hidden');
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileMenu.classList.add('hidden');
                mobileMenuBtn.setAttribute('aria-expanded', 'false');
            });
        });
    }

    // 2. Active Navigation Link on Scroll using IntersectionObserver (Efficient & Smooth)
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.desktop-nav-link');

    if ('IntersectionObserver' in window) {
        const observerOptions = {
            root: null,
            rootMargin: '-20% 0px -70% 0px',
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute('id');
                    navLinks.forEach(link => {
                        if (link.getAttribute('href') === `#${id}`) {
                            link.classList.add('text-brand-orange', 'font-bold');
                            link.classList.remove('text-gray-700');
                        } else {
                            link.classList.remove('text-brand-orange', 'font-bold');
                            link.classList.add('text-gray-700');
                        }
                    });
                }
            });
        }, observerOptions);

        sections.forEach(section => observer.observe(section));
    }

    // 3. Gallery Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button state
            filterBtns.forEach(b => {
                b.classList.remove('active', 'bg-amber-500', 'text-white');
                b.classList.add('bg-white', 'text-gray-700');
                b.setAttribute('aria-pressed', 'false');
            });
            
            btn.classList.add('active', 'bg-amber-500', 'text-white');
            btn.classList.remove('bg-white', 'text-gray-700');
            btn.setAttribute('aria-pressed', 'true');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    requestAnimationFrame(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    });
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.96)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 200);
                }
            });
        });
    });

    // 4. Photo Lightbox Modal with Keyboard & Mobile Touch Swipe
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxCategory = document.getElementById('lightboxCategory');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');

    let currentGalleryIndex = 0;
    const visibleGalleryCards = () => Array.from(galleryItems).filter(item => item.style.display !== 'none');

    function openLightbox(index) {
        const items = visibleGalleryCards();
        if (items.length === 0) return;

        currentGalleryIndex = (index + items.length) % items.length;
        const targetItem = items[currentGalleryIndex];

        const img = targetItem.querySelector('img');
        const title = targetItem.getAttribute('data-title') || img.alt || 'School Event';
        const category = targetItem.getAttribute('data-category-name') || 'Event';

        lightboxImg.src = img.src;
        lightboxImg.alt = title;
        lightboxTitle.textContent = title;
        lightboxCategory.textContent = category;

        lightboxModal.classList.remove('hidden');
        lightboxModal.classList.add('flex');
        lightboxModal.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        if (lightboxClose) lightboxClose.focus();
    }

    function closeLightbox() {
        lightboxModal.classList.add('hidden');
        lightboxModal.classList.remove('flex');
        lightboxModal.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = 'auto';
    }

    galleryItems.forEach((item) => {
        // Click to open
        item.addEventListener('click', (e) => {
            e.preventDefault();
            const items = visibleGalleryCards();
            const index = items.indexOf(item);
            openLightbox(index);
        });

        // Keyboard accessible (Enter or Space)
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                const items = visibleGalleryCards();
                const index = items.indexOf(item);
                openLightbox(index);
            }
        });
    });

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(currentGalleryIndex - 1);
        });
    }

    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => {
            e.stopPropagation();
            openLightbox(currentGalleryIndex + 1);
        });
    }

    if (lightboxModal) {
        lightboxModal.addEventListener('click', (e) => {
            if (e.target === lightboxModal) closeLightbox();
        });
    }

    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (lightboxModal && !lightboxModal.classList.contains('hidden')) {
            if (e.key === 'Escape') closeLightbox();
            if (e.key === 'ArrowLeft') openLightbox(currentGalleryIndex - 1);
            if (e.key === 'ArrowRight') openLightbox(currentGalleryIndex + 1);
        }
    });

    // Touch Swipe Support for Lightbox (Mobile friendly)
    let touchStartX = 0;
    let touchEndX = 0;

    if (lightboxModal) {
        lightboxModal.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });

        lightboxModal.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].screenX;
            handleSwipe();
        }, { passive: true });
    }

    function handleSwipe() {
        const swipeThreshold = 50;
        if (touchEndX < touchStartX - swipeThreshold) {
            openLightbox(currentGalleryIndex + 1); // Swipe Left -> Next Image
        } else if (touchEndX > touchStartX + swipeThreshold) {
            openLightbox(currentGalleryIndex - 1); // Swipe Right -> Prev Image
        }
    }

    // 5. Interactive FAQ Accordion
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const btn = item.querySelector('.faq-btn');
        const content = item.querySelector('.faq-content');

        if (btn && content) {
            btn.addEventListener('click', () => {
                const isOpen = !content.classList.contains('hidden');

                // Close other open items
                faqItems.forEach(otherItem => {
                    const otherContent = otherItem.querySelector('.faq-content');
                    const otherBtn = otherItem.querySelector('.faq-btn');
                    if (otherContent && otherContent !== content) {
                        otherContent.classList.add('hidden');
                        otherItem.classList.remove('active');
                        if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
                    }
                });

                if (isOpen) {
                    content.classList.add('hidden');
                    item.classList.remove('active');
                    btn.setAttribute('aria-expanded', 'false');
                } else {
                    content.classList.remove('hidden');
                    item.classList.add('active');
                    btn.setAttribute('aria-expanded', 'true');
                }
            });
        }
    });

    // =========================================================================
    // 6. Appointments & Leads Management (Storage, Viewer & WhatsApp alert)
    // =========================================================================
    const LEADS_STORAGE_KEY = 'little_orbit_admissions_leads';

    function getStoredLeads() {
        try {
            return JSON.parse(localStorage.getItem(LEADS_STORAGE_KEY)) || [];
        } catch (e) {
            return [];
        }
    }

    function saveLead(leadData) {
        const leads = getStoredLeads();
        leads.unshift({
            id: 'LEAD-' + Date.now(),
            timestamp: new Date().toLocaleString('en-IN', {
                day: '2-digit',
                month: 'short',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true
            }),
            ...leadData
        });
        localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(leads));
        updateLeadsCounter();
    }

    function updateLeadsCounter() {
        const leads = getStoredLeads();
        const badge = document.getElementById('leadsCounterBadge');
        const adminTotalBadge = document.getElementById('adminTotalBadge');
        if (badge) badge.textContent = leads.length;
        if (adminTotalBadge) adminTotalBadge.textContent = `${leads.length} Inquir${leads.length === 1 ? 'y' : 'ies'}`;
    }

    function renderLeadsTable() {
        const container = document.getElementById('adminLeadsBody');
        if (!container) return;
        const leads = getStoredLeads();

        if (leads.length === 0) {
            container.innerHTML = `
                <div class="text-center py-12 text-gray-400">
                    <div class="w-16 h-16 rounded-full bg-amber-50 text-amber-500 flex items-center justify-center text-3xl mx-auto mb-3">
                        <i class="fa-solid fa-inbox"></i>
                    </div>
                    <h4 class="font-fun text-lg font-bold text-gray-700">No Appointments Received Yet</h4>
                    <p class="text-xs text-gray-500 mt-1 max-w-sm mx-auto">
                        When parents fill out the "Book a Campus Tour" modal or "Admissions Inquiry" form, their appointment details will appear right here.
                    </p>
                </div>
            `;
            return;
        }

        let html = `
            <div class="overflow-x-auto">
                <table class="w-full text-left text-xs text-gray-700">
                    <thead class="bg-amber-50/80 text-gray-800 uppercase text-[11px] font-bold">
                        <tr>
                            <th class="py-3 px-3 rounded-l-lg">Date / Time</th>
                            <th class="py-3 px-3">Type</th>
                            <th class="py-3 px-3">Parent Name</th>
                            <th class="py-3 px-3">Phone / WhatsApp</th>
                            <th class="py-3 px-3">Child &amp; Program</th>
                            <th class="py-3 px-3">Preferred Day / Notes</th>
                            <th class="py-3 px-3 text-right rounded-r-lg">Actions</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-gray-100">
        `;

        leads.forEach(item => {
            const isTour = item.type === 'Campus Tour';
            const phoneClean = (item.phone || '').replace(/[^0-9]/g, '');
            const waPhone = phoneClean.length === 10 ? '91' + phoneClean : phoneClean;
            html += `
                <tr class="hover:bg-amber-50/30 transition-colors">
                    <td class="py-3 px-3 whitespace-nowrap text-gray-500 font-mono text-[11px]">${item.timestamp}</td>
                    <td class="py-3 px-3 whitespace-nowrap">
                        <span class="px-2 py-0.5 rounded-full text-[10px] font-bold ${isTour ? 'bg-orange-100 text-orange-800' : 'bg-sky-100 text-sky-800'}">
                            ${item.type}
                        </span>
                    </td>
                    <td class="py-3 px-3 font-bold text-gray-900">${item.parentName || '—'}</td>
                    <td class="py-3 px-3 whitespace-nowrap">
                        <div class="flex items-center gap-2">
                            <span class="font-mono font-medium">${item.phone || '—'}</span>
                            ${item.phone ? `
                                <a href="tel:${item.phone}" class="text-orange-600 hover:text-orange-700 p-1" title="Call Parent">
                                    <i class="fa-solid fa-phone"></i>
                                </a>
                                <a href="https://wa.me/${waPhone}?text=Hello%20${encodeURIComponent(item.parentName || 'Parent')}%2C%20thank%20you%20for%20contacting%20Little%20Orbit%20Preschool!" target="_blank" class="text-emerald-600 hover:text-emerald-700 p-1" title="Chat on WhatsApp">
                                    <i class="fa-brands fa-whatsapp"></i>
                                </a>
                            ` : ''}
                        </div>
                    </td>
                    <td class="py-3 px-3">
                        <div class="font-medium text-gray-900">${item.program || 'Not specified'}</div>
                        <div class="text-[11px] text-gray-500">${item.childAge ? `Child: ${item.childAge}` : ''}</div>
                    </td>
                    <td class="py-3 px-3 text-gray-600 max-w-xs truncate" title="${item.day || item.message || ''}">
                        ${item.day || item.message || '—'}
                    </td>
                    <td class="py-3 px-3 text-right whitespace-nowrap">
                        <button data-delete-id="${item.id}" class="delete-single-lead-btn text-gray-400 hover:text-rose-600 p-1.5 transition-colors cursor-pointer" title="Delete record">
                            <i class="fa-solid fa-trash-can"></i>
                        </button>
                    </td>
                </tr>
            `;
        });

        html += `
                    </tbody>
                </table>
            </div>
        `;

        container.innerHTML = html;

        // Attach delete listeners
        container.querySelectorAll('.delete-single-lead-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-delete-id');
                if (confirm('Delete this inquiry record?')) {
                    const updated = getStoredLeads().filter(l => l.id !== id);
                    localStorage.setItem(LEADS_STORAGE_KEY, JSON.stringify(updated));
                    renderLeadsTable();
                    updateLeadsCounter();
                }
            });
        });
    }

    function exportLeadsToCsv() {
        const leads = getStoredLeads();
        if (leads.length === 0) {
            alert('No appointments to export yet.');
            return;
        }

        const headers = ['Date', 'Type', 'Parent Name', 'Phone', 'Child Info', 'Program', 'Preferred Day / Note', 'Email'];
        const rows = leads.map(l => [
            `"${l.timestamp || ''}"`,
            `"${l.type || ''}"`,
            `"${(l.parentName || '').replace(/"/g, '""')}"`,
            `"${(l.phone || '').replace(/"/g, '""')}"`,
            `"${(l.childAge || '').replace(/"/g, '""')}"`,
            `"${(l.program || '').replace(/"/g, '""')}"`,
            `"${(l.day || l.message || '').replace(/"/g, '""')}"`,
            `"${(l.email || '').replace(/"/g, '""')}"`
        ]);

        const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
        const encodedUri = encodeURI(csvContent);
        const link = document.createElement('a');
        link.setAttribute('href', encodedUri);
        link.setAttribute('download', `Little_Orbit_Appointments_${new Date().toISOString().slice(0, 10)}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }

    // Admin Modal Controls (Hidden from normal public users)
    const adminLeadsModal = document.getElementById('adminLeadsModal');
    const closeAdminLeadsBtn = document.getElementById('closeAdminLeadsBtn');
    const closeAdminLeadsBtns = document.querySelectorAll('.close-admin-leads-btn');
    const exportLeadsCsvBtn = document.getElementById('exportLeadsCsvBtn');
    const clearLeadsBtn = document.getElementById('clearLeadsBtn');
    const footerCopyright = document.getElementById('footerCopyright');

    // Secret Admin PIN (Default: 1234)
    const ADMIN_PIN = "1234";

    function openAdminModal() {
        if (!adminLeadsModal) return;

        // Prompt for Admin PIN if not already authenticated in this browser session
        if (sessionStorage.getItem('little_orbit_admin_authed') !== 'true') {
            const enteredPin = prompt('🔒 Little Orbit Staff Access\nPlease enter Admin PIN:');
            if (enteredPin === null) return; // Cancelled
            if (enteredPin.trim() !== ADMIN_PIN) {
                alert('Access Denied: Incorrect PIN.');
                return;
            }
            sessionStorage.setItem('little_orbit_admin_authed', 'true');
        }

        renderLeadsTable();
        updateLeadsCounter();
        adminLeadsModal.classList.remove('hidden');
        adminLeadsModal.classList.add('flex');
        document.body.style.overflow = 'hidden';
    }

    function closeAdminModal() {
        if (!adminLeadsModal) return;
        adminLeadsModal.classList.add('hidden');
        adminLeadsModal.classList.remove('flex');
        document.body.style.overflow = 'auto';
        if (window.location.hash === '#admin') {
            history.replaceState(null, null, ' ');
        }
    }

    if (closeAdminLeadsBtn) closeAdminLeadsBtn.addEventListener('click', closeAdminModal);
    closeAdminLeadsBtns.forEach(btn => btn.addEventListener('click', closeAdminModal));
    if (exportLeadsCsvBtn) exportLeadsCsvBtn.addEventListener('click', exportLeadsToCsv);
    if (clearLeadsBtn) {
        clearLeadsBtn.addEventListener('click', () => {
            const leads = getStoredLeads();
            if (leads.length === 0) return alert('No appointments to clear.');
            if (confirm(`Are you sure you want to delete all ${leads.length} inquiry records? This cannot be undone.`)) {
                localStorage.removeItem(LEADS_STORAGE_KEY);
                renderLeadsTable();
                updateLeadsCounter();
            }
        });
    }

    if (adminLeadsModal) {
        adminLeadsModal.addEventListener('click', (e) => {
            if (e.target === adminLeadsModal) closeAdminModal();
        });
    }

    // Secret Trigger 1: Triple-click copyright text in footer
    if (footerCopyright) {
        let clickCount = 0;
        let clickTimer = null;
        footerCopyright.addEventListener('click', () => {
            clickCount++;
            if (clickCount >= 3) {
                clickCount = 0;
                clearTimeout(clickTimer);
                openAdminModal();
            } else {
                clearTimeout(clickTimer);
                clickTimer = setTimeout(() => { clickCount = 0; }, 1200);
            }
        });
    }

    // Secret Trigger 2: URL hash (#admin)
    if (window.location.hash === '#admin') {
        setTimeout(openAdminModal, 300);
    }

    // Close admin modal on Escape key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && adminLeadsModal && !adminLeadsModal.classList.contains('hidden')) {
            closeAdminModal();
        }
    });

    updateLeadsCounter();

    // 7. Book Tour / Inquiry Modal
    const tourModal = document.getElementById('tourModal');
    const openTourBtns = document.querySelectorAll('.open-tour-btn');
    const closeTourBtn = document.getElementById('closeTourBtn');
    const tourForm = document.getElementById('tourForm');
    const formSuccessMessage = document.getElementById('formSuccessMessage');

    openTourBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (tourModal) {
                tourModal.classList.remove('hidden');
                tourModal.classList.add('flex');
                tourModal.setAttribute('aria-hidden', 'false');
                document.body.style.overflow = 'hidden';
            }
        });
    });

    if (closeTourBtn && tourModal) {
        closeTourBtn.addEventListener('click', () => {
            tourModal.classList.add('hidden');
            tourModal.classList.remove('flex');
            tourModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = 'auto';
            if (formSuccessMessage) formSuccessMessage.classList.add('hidden');
            if (tourForm) tourForm.reset();
        });

        tourModal.addEventListener('click', (e) => {
            if (e.target === tourModal) {
                tourModal.classList.add('hidden');
                tourModal.classList.remove('flex');
                tourModal.setAttribute('aria-hidden', 'true');
                document.body.style.overflow = 'auto';
            }
        });
    }

    if (tourForm) {
        tourForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const parentName = document.getElementById('tourParentName')?.value.trim() || '';
            const phone = document.getElementById('tourPhone')?.value.trim() || '';
            const childAge = document.getElementById('tourChildAge')?.value.trim() || '';
            const day = document.getElementById('tourDay')?.value || '';
            const program = document.getElementById('tourProgram')?.value || '';
            const notifyWhatsApp = document.getElementById('tourNotifyWhatsapp')?.checked ?? true;

            // 1. Save to local browser database
            saveLead({
                type: 'Campus Tour',
                parentName,
                phone,
                childAge,
                day,
                program
            });

            // 2. Show on-screen confirmation
            if (formSuccessMessage) formSuccessMessage.classList.remove('hidden');

            // 3. Forward copy to school's WhatsApp (9850971075)
            if (notifyWhatsApp) {
                const waText = encodeURIComponent(
                    `*New Campus Tour Appointment - Little Orbit Preschool*\n` +
                    `• Parent Name: ${parentName}\n` +
                    `• Phone Number: ${phone}\n` +
                    `• Child's Age: ${childAge || 'Not specified'}\n` +
                    `• Program: ${program}\n` +
                    `• Preferred Day: ${day}`
                );
                window.open(`https://wa.me/919850971075?text=${waText}`, '_blank');
            }

            tourForm.reset();
            setTimeout(() => {
                if (tourModal) {
                    tourModal.classList.add('hidden');
                    tourModal.classList.remove('flex');
                    tourModal.setAttribute('aria-hidden', 'true');
                    document.body.style.overflow = 'auto';
                    if (formSuccessMessage) formSuccessMessage.classList.add('hidden');
                }
            }, 3000);
        });
    }

    // 8. Contact Section Form Handler
    const contactForm = document.getElementById('contactForm');
    const contactSuccessAlert = document.getElementById('contactSuccessAlert');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const parentName = document.getElementById('contactParentName')?.value.trim() || '';
            const phone = document.getElementById('contactPhone')?.value.trim() || '';
            const child = document.getElementById('contactChild')?.value.trim() || '';
            const program = document.getElementById('contactProgram')?.value || '';
            const email = document.getElementById('contactEmail')?.value.trim() || '';
            const message = document.getElementById('contactMessage')?.value.trim() || '';

            // 1. Save to local browser database
            saveLead({
                type: 'Admission Inquiry',
                parentName,
                phone,
                childAge: child,
                program,
                email,
                message
            });

            // 2. Show on-screen confirmation
            if (contactSuccessAlert) {
                contactSuccessAlert.classList.remove('hidden');
                setTimeout(() => {
                    contactSuccessAlert.classList.add('hidden');
                }, 5000);
            }

            contactForm.reset();
        });
    }

    // 8. Back to Top Button
    const backToTopBtn = document.getElementById('backToTopBtn');
    if (backToTopBtn) {
        let isScrolling = false;
        window.addEventListener('scroll', () => {
            if (!isScrolling) {
                window.requestAnimationFrame(() => {
                    if (window.pageYOffset > 400) {
                        backToTopBtn.classList.remove('hidden', 'opacity-0');
                        backToTopBtn.classList.add('opacity-100');
                    } else {
                        backToTopBtn.classList.add('opacity-0');
                        setTimeout(() => {
                            if (window.pageYOffset <= 400) backToTopBtn.classList.add('hidden');
                        }, 300);
                    }
                    isScrolling = false;
                });
                isScrolling = true;
            }
        }, { passive: true });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
