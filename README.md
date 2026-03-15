# Shore Leave

A beautiful booking website for a coastal cottage on Bailey Island, Maine.

## What This Is

**Shore Leave** — the peaceful stillness along the coast at sunset. This website lets friends and family reserve weekend getaways at a private cottage, with a password-protected booking system backed by Google Sheets.

## Features

✨ **Beautiful Design** — Sunset-inspired color palette with smooth animations  
📅 **Weekend Booking** — Shows all 22 weekends from May–September 2026  
🔒 **Password Protected** — Only people with the password can make reservations  
📊 **Google Sheets Backend** — No database needed, just a simple spreadsheet  
🚀 **GitHub Pages Hosting** — Free, fast, and reliable  
📱 **Mobile Responsive** — Works perfectly on phones, tablets, and desktops  

## Project Structure

```
yunagi-cottage/
├── index.html              # Home page
├── about.html              # About the cottage
├── schedule.html           # Booking/schedule page
├── css/
│   └── style.css          # Shared stylesheet
├── js/
│   └── schedule.js        # Booking logic & API integration
├── apps-script/
│   ├── Code.gs            # Google Apps Script backend
│   └── sheet-structure.md # How to set up the Google Sheet
├── SETUP.md               # Complete deployment guide
└── README.md              # This file
```

## Getting Started

**Follow the [SETUP.md](SETUP.md) guide** for complete step-by-step deployment instructions.

Quick overview:
1. Create a Google Sheet with weekend data
2. Deploy the Apps Script as a web app
3. Create a GitHub repository and upload the website files
4. Update `js/schedule.js` with your Apps Script URL
5. Enable GitHub Pages
6. Share the URL and password with your guests!

## Color Palette

- **Coral:** `#FF6B47` — Warm sunset glow
- **Gold:** `#FFB347` — Golden hour light
- **Ocean Teal:** `#4ECDC4` — Coastal waters
- **Sand:** `#F7DC6F` — Beach tones
- **Warm White:** `#FFF8F0` — Soft background
- **Charcoal:** `#2C3E50` — Text and anchors

## Typography

- **Headings:** Playfair Display (serif, elegant)
- **Body:** Inter (sans-serif, clean and modern)

## Technology Stack

- **Frontend:** Pure HTML, CSS, JavaScript (no frameworks!)
- **Backend:** Google Apps Script (serverless API)
- **Database:** Google Sheets
- **Hosting:** GitHub Pages
- **Cost:** $0 (completely free)

## Customization

All the placeholder content can be edited:

- **About page:** Update cottage details, amenities, directions
- **Color scheme:** Modify CSS variables in `style.css`
- **Weekend dates:** Edit the Google Sheet to change or add weekends
- **Password:** Change in the Google Sheet Config tab (cell B1)

## Security

- Reservation password is required to book weekends
- Password is validated server-side in Google Apps Script
- Guest names are stored in the sheet but NOT exposed via the API
- Only "Available" or "Taken" status is shown publicly

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This is a private project for personal use. Feel free to adapt it for your own cottage or vacation rental!

---

Built with ❤️ for coastal getaways and sunset watching 🌅

夕凪 — *May you find your evening calm*
