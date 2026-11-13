/**
 * Little Orbit Preschool - Client Configuration & Dependency References
 * Mirrored from .env for browser runtime usage.
 */
window.APP_CONFIG = {
    appName: "Little Orbit Preschool",
    shortName: "Little Orbit",
    academicYear: "2026-2027",
    admissionsStatus: "OPEN",
    contact: {
        phone: "+91 93560 62067",
        phoneRaw: "919356062067",
        whatsapp: "+91 98509 71075",
        whatsappRaw: "919850971075",
        email: "admissions@littleorbitpreschool.com",
        address: "Plot No. 42, Sunshine Garden Road, Near Central Park, Pune, Maharashtra 411001",
        timings: "Mon - Fri: 8:30 AM - 1:30 PM | Sat: 9:00 AM - 12:30 PM"
    },
    dependencies: {
        tailwindcss: {
            name: "Tailwind CSS",
            version: "3.4.1",
            cdn: "https://cdn.tailwindcss.com"
        },
        fontAwesome: {
            name: "Font Awesome Free",
            version: "6.4.0",
            cdn: "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
        },
        googleFonts: {
            name: "Google Fonts",
            families: ["Fredoka", "Outfit", "Quicksand"],
            cdn: "https://fonts.googleapis.com/css2?family=Fredoka:wght@400;500;600;700&family=Outfit:wght@400;500;600;700;800&family=Quicksand:wght@500;600;700&display=swap"
        }
    }
};
