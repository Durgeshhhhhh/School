# 🪐 Little Orbit Preschool Website

A joyful, vibrant, fast, and fully responsive website built for **Little Orbit Preschool** (Pre-Primary School).

---

## 🚀 How to Run the Website

### Option 1: One-Click Launcher (Windows)
Double-click **`Open_Website.bat`** (or open **`index.html`** directly in Chrome, Edge, Brave, or Firefox).

### Option 2: Local HTTP Server (Node / NPM)
If you have Node.js installed:
```bash
npm install
npm run dev
# Or
npm run start
```

---

## ⚙️ Environment Configuration & Dependencies (`.env`)

All project dependencies, external CDNs, API endpoints, school contact details, and local development configurations are centralized in `.env` (and documented in `.env.example`):

| Parameter / Dependency | Source / Value | Description |
|---|---|---|
| **`DEPENDENCY_TAILWIND_CDN`** | `https://cdn.tailwindcss.com` | Tailwind CSS v3.4.1 runtime engine |
| **`DEPENDENCY_FONTAWESOME_CDN`** | `https://cdnjs.cloudflare.com/...` | Font Awesome Free v6.4.0 vector icons |
| **`DEPENDENCY_GOOGLE_FONTS_CDN`** | `https://fonts.googleapis.com/...` | Fredoka, Outfit & Quicksand fonts |
| **`APP_NAME`** | `Little Orbit Preschool` | School brand identity |
| **`APP_ACADEMIC_YEAR`** | `2026-2027` | Admissions cycle |
| **`SCHOOL_PHONE`** | `+91 93560 62067` | Contact phone |
| **`SCHOOL_WHATSAPP`** | `+91 98509 71075` | WhatsApp click-to-chat inquiry number |
| **`PORT`** | `3000` | Local development server port |

---

## 📋 How Staff Can View Appointments (Hidden & PIN Protected)

To keep parent contact data completely private, the appointments viewer is **100% hidden** from regular visitors and secured with a PIN (Default: `1234`).

### 2 Secret Ways for School Staff to Open the Appointments Dashboard:
1. **Secret Triple-Click Gesture**:
   - Rapidly click **3 times** on the copyright line at the very bottom of the website (`© 2026 Little Orbit Preschool`).
2. **Secret URL**:
   - Add `#admin` to the website URL (e.g., `index.html#admin`).

Enter PIN `1234` when prompted. You can then:
- View all parent appointment bookings & admission inquiries.
- Click to direct call or WhatsApp the parent.
- Click **"Export to Excel / CSV"** to save them to an Excel spreadsheet.

---

## 📸 Events & Real Photos Included (11 Live Event Photos)

All 11 actual school event photos uploaded have been analyzed, categorized, and added to the gallery:

### 1. 🪔 Festivals & Cultural Traditions (`festivals`)
- **Janmashtami & Dahi Handi Utsav** (`janmashtami-dahi-handi.jpg`): Little Krishnas & Radhas, Govinda Aala Re butter-pot breaking, floral swing.
- **Raksha Bandhan Celebration** (`raksha-bandhan.jpg`): Traditional attire, handmade rakhis craft, aarti thali, brother-sister bonding.
- **Bail Pola Festival** (`bail-pola-festival.jpg`): Decorated clay bullocks with floral rangoli and bells, celebrating agriculture and respect for nature/animals.

### 2. 🎤 Competitions & Stage Recitations (`competitions`)
- **Shlok Recitation Competition - Part 1** (`shlok-competition-part1.jpg`): "संस्कार • संस्कृती • ज्ञान" Goddess Saraswati stage, little tots reciting Sanskrit shlokas.
- **Shlok Recitation & Elocution - Part 2** (`shlok-competition-part2.jpg`): Developing speech fluency, mic handling, and stage confidence.
- **Independence Day Recitation - Part 1** (`independence-day-part1.jpg`): Army costume, tricolor wristbands, patriotic speech recitation.
- **Independence Day Recitation - Part 2** (`independence-day-part2.jpg`): Tiranga speeches and poems in front of student handprinted flags.

### 3. 🎉 Special Celebrations & Milestones (`celebrations`)
- **Grand Opening & Inauguration** (`grand-inauguration.jpg`): Auspicious ribbon-cutting, welcome of dignitaries, parents & Little Orbit teachers.
- **Happy Teacher's Day Celebration** (`teachers-day-celebration.jpg`): Little teachers roleplay (wearing sarees, teaching ABCs) and gifting green saplings.

### 4. 🎨 Theme Days & Campus Life (`activities`)
- **Blue Day & Ocean Fun Fiesta** (`blue-day-ocean-fun.jpg`): Blue dress code, baby shark photobooth, dolphin & octopus sea life crafts.
- **Welcome Day & Morning Assembly** (`welcome-day-morning-drills.jpg`): Daily morning prayers (namaste hands), stretching drills, and welcome kits.

---

## 📂 Project Structure
```text
school/
│
├── .env                         # Centralized environment configuration & dependency registry
├── .env.example                 # Example environment template
├── .gitignore                   # Standard git ignore file
├── package.json                 # NPM package metadata, dependencies & scripts
├── index.html                   # Main website file (SEO, Schema.org, FAQ, Gallery, Contact)
├── Open_Website.bat             # 1-Click desktop launcher for Windows
├── README.md                    # Guide & documentation
├── css/
│   └── style.css                # Kid-friendly typography, shadows, animations & styling
├── js/
│   ├── config.js                # Browser-side mirror of .env parameters
│   └── main.js                  # Gallery filter, photo Lightbox modal, FAQ accordion, tour modal
└── images/
    ├── events/                  # Actual event photos used on the website (11 photos)
    │   ├── grand-inauguration.jpg
    │   ├── janmashtami-dahi-handi.jpg
    │   ├── shlok-competition-part1.jpg
    │   ├── shlok-competition-part2.jpg
    │   ├── teachers-day-celebration.jpg
    │   ├── raksha-bandhan.jpg
    │   ├── independence-day-part1.jpg
    │   ├── independence-day-part2.jpg
    │   ├── bail-pola-festival.jpg
    │   ├── blue-day-ocean-fun.jpg
    │   └── welcome-day-morning-drills.jpg
    └── gallery/                 # Source uploaded event photos
```

---

## 🏷️ Filter Categories
The gallery provides 1-click tabs:
- **All Moments (11)**: Shows all event photos.
- **Festivals & Culture (3)**: Janmashtami, Raksha Bandhan, Bail Pola.
- **Competitions & Recitations (4)**: Shlok Recitations & Independence Day speeches.
- **Special Celebrations (2)**: Grand Inauguration, Teacher's Day.
- **Theme Days & Activities (2)**: Blue Day, Morning Assembly & Drills.
