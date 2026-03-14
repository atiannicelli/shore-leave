# Yūnagi Cottage - Setup Guide

This guide will walk you through deploying your cottage booking website. Follow each step carefully — no technical experience required!

---

## Overview

You're going to set up:
1. **A Google Sheet** — your "database" of weekend bookings
2. **Google Apps Script** — the "backend" that handles reservations
3. **A GitHub repository** — where your website files live
4. **GitHub Pages** — free hosting for your website

Total time: ~30 minutes

---

## Part 1: Set Up Google Sheet (10 minutes)

### Step 1: Create the Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Click **Blank** to create a new spreadsheet
3. Name it "Yūnagi Cottage Bookings" (click the title at the top to rename)

### Step 2: Create the "Weekends" Tab

1. Right-click the "Sheet1" tab at the bottom
2. Select **Rename**
3. Type: `Weekends`

4. In row 1, create the following headers:
   - A1: `Weekend ID`
   - B1: `Start Date`
   - C1: `End Date`
   - D1: `Display Label`
   - E1: `Status`
   - F1: `Guest Name`
   - G1: `Email`
   - H1: `Number of Guests`
   - I1: `Date Reserved`

5. **Copy all of this data** and paste it into cell A2 (this fills rows 2-23):

```
1	5/1/2026	5/3/2026	May 1–3, 2026	Available				
2	5/8/2026	5/10/2026	May 8–10, 2026	Available				
3	5/15/2026	5/17/2026	May 15–17, 2026	Available				
4	5/22/2026	5/24/2026	May 22–24, 2026	Available				
5	5/29/2026	5/31/2026	May 29–31, 2026	Available				
6	6/5/2026	6/7/2026	June 5–7, 2026	Available				
7	6/12/2026	6/14/2026	June 12–14, 2026	Available				
8	6/19/2026	6/21/2026	June 19–21, 2026	Available				
9	6/26/2026	6/28/2026	June 26–28, 2026	Available				
10	7/3/2026	7/5/2026	July 3–5, 2026	Available				
11	7/10/2026	7/12/2026	July 10–12, 2026	Available				
12	7/17/2026	7/19/2026	July 17–19, 2026	Available				
13	7/24/2026	7/26/2026	July 24–26, 2026	Available				
14	7/31/2026	8/2/2026	July 31–Aug 2, 2026	Available				
15	8/7/2026	8/9/2026	August 7–9, 2026	Available				
16	8/14/2026	8/16/2026	August 14–16, 2026	Available				
17	8/21/2026	8/23/2026	August 21–23, 2026	Available				
18	8/28/2026	8/30/2026	August 28–30, 2026	Available				
19	9/4/2026	9/6/2026	September 4–6, 2026	Available				
20	9/11/2026	9/13/2026	September 11–13, 2026	Available				
21	9/18/2026	9/20/2026	September 18–20, 2026	Available				
22	9/25/2026	9/27/2026	September 25–27, 2026	Available				
```

6. Select columns B and C (click the "B" column header, then hold Shift and click "C")
7. Click **Format** → **Number** → **Date**

### Step 3: Create the "Config" Tab

1. Click the **+** button at the bottom left to add a new sheet
2. Rename this sheet to: `Config`
3. In cell A1, type: `Password`
4. In cell B1, type: `yunagi2026` (or choose your own password)

**Important:** This password is what guests will need to make a reservation. Keep it private but easy to share with your invited guests.

Your Google Sheet is now ready! ✓

---

## Part 2: Deploy Google Apps Script (10 minutes)

### Step 4: Open Apps Script Editor

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. A new tab will open with the Apps Script editor
3. You'll see a file called `Code.gs` with some default code

### Step 5: Replace the Code

1. **Delete everything** in the Code.gs file
2. Open the file `apps-script/Code.gs` from this project
3. **Copy the entire contents** of that file
4. **Paste it** into the Apps Script editor

### Step 6: Deploy as Web App

1. Click the **Deploy** button (top right) → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Fill in the deployment settings:
   - **Description:** "Yūnagi Cottage API v1" (or whatever you want)
   - **Execute as:** Me (your email)
   - **Who has access:** Anyone

5. Click **Deploy**
6. You may see a warning: "Authorization required"
   - Click **Authorize access**
   - Choose your Google account
   - Click **Advanced** → **Go to [your project name] (unsafe)**
   - Click **Allow**

7. **IMPORTANT:** Copy the **Web app URL** that appears
   - It looks like: `https://script.google.com/macros/s/ABC123.../exec`
   - Save this somewhere — you'll need it in a moment!

8. Click **Done**

Your backend is now live! ✓

---

## Part 3: Set Up GitHub Repository (5 minutes)

### Step 7: Create a GitHub Account (if you don't have one)

1. Go to [github.com](https://github.com)
2. Click **Sign up** and follow the prompts
3. Verify your email address

### Step 8: Create a New Repository

1. Click the **+** button in the top right → **New repository**
2. Fill in the details:
   - **Repository name:** `yunagi-cottage` (or whatever you prefer)
   - **Description:** "Yūnagi Cottage booking website"
   - **Public** (required for free GitHub Pages)
   - ✅ Check "Add a README file"

3. Click **Create repository**

### Step 9: Upload Your Website Files

1. In your new repository, click **Add file** → **Upload files**
2. Drag and drop these folders/files from your computer:
   - `index.html`
   - `about.html`
   - `schedule.html`
   - `css/` folder (with style.css inside)
   - `js/` folder (with schedule.js inside)

3. Scroll down and click **Commit changes**

**Note:** Do NOT upload the `apps-script/` folder or `SETUP.md` to GitHub — those are just for your reference.

---

## Part 4: Connect Your Apps Script URL (CRITICAL!)

### Step 10: Update the API URL in schedule.js

1. In your GitHub repository, click on `js/schedule.js`
2. Click the **pencil icon** (Edit this file)
3. Find this line near the top:
   ```javascript
   const API_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```

4. Replace `'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE'` with your actual Apps Script URL from Step 6
   - Example:
   ```javascript
   const API_URL = 'https://script.google.com/macros/s/ABC123xyz.../exec';
   ```

5. Click **Commit changes** (green button at top right)

This is the critical link between your website and your Google Sheet! ✓

---

## Part 5: Enable GitHub Pages (3 minutes)

### Step 11: Turn on GitHub Pages

1. In your repository, click **Settings** (top menu)
2. Scroll down the left sidebar and click **Pages**
3. Under "Source," select:
   - **Branch:** main
   - **Folder:** / (root)

4. Click **Save**
5. Wait about 30 seconds, then refresh the page
6. You'll see a message: "Your site is live at https://[your-username].github.io/yunagi-cottage/"

### Step 12: Visit Your Website!

1. Click the URL shown in the GitHub Pages settings
2. Your website is now live! 🎉

---

## Part 6: Test Everything (5 minutes)

### Step 13: Test the Booking System

1. Go to your website
2. Click **Schedule**
3. You should see all 22 weekends listed
4. Click **Reserve This Weekend** on any available weekend
5. Fill in the form:
   - Name: Test User
   - Email: test@example.com
   - Number of Guests: 2
   - Password: `yunagi2026` (or whatever you set)

6. Click **Confirm Reservation**
7. You should see: "Reservation Confirmed!" ✓
8. The weekend card should now show "Reserved"

### Step 14: Verify in Google Sheet

1. Go back to your Google Sheet
2. Find the weekend you just booked (row 2-23)
3. You should see:
   - Column E: "Taken"
   - Column F: "Test User"
   - Column G: "test@example.com"
   - Column H: 2
   - Column I: Today's date/time

**If everything works — congratulations! Your booking system is live!** 🎊

### Step 15: Clean Up Test Data

1. In your Google Sheet, find the test booking you just made
2. Change column E back to "Available"
3. Clear columns F, G, H, and I for that row

---

## Sharing Your Website

Your website is now at: `https://[your-username].github.io/yunagi-cottage/`

Share this link with your friends! They'll need:
- The website URL
- The reservation password (from Config sheet, cell B1)

---

## Updating Content Later

### To update the website text/design:

1. Go to your GitHub repository
2. Click the file you want to edit (e.g., `about.html`)
3. Click the pencil icon to edit
4. Make your changes
5. Click **Commit changes**
6. Wait 1-2 minutes for GitHub Pages to update

### To change the password:

1. Open your Google Sheet
2. Go to the "Config" tab
3. Change cell B1 to your new password
4. That's it! No code changes needed.

### To manually block a weekend:

1. Open your Google Sheet
2. Go to the "Weekends" tab
3. Find the weekend row
4. Change column E from "Available" to "Taken"

---

## Troubleshooting

### "Unable to load weekend availability"
- Make sure you copied the Apps Script URL correctly in `js/schedule.js`
- Check that your Google Sheet has tabs named exactly "Weekends" and "Config" (case-sensitive)
- Make sure the Apps Script is deployed with "Who has access: Anyone"

### "Invalid password" when trying to book
- Check that the password in the form matches cell B1 in the "Config" tab exactly (case-sensitive)
- Make sure there are no extra spaces in the password

### Weekend doesn't update after booking
- Check your browser's console for errors (F12 → Console tab)
- Verify the Apps Script has permission to edit the sheet
- Make sure the weekend ID in the "Weekends" tab matches (column A should be 1, 2, 3... not text)

### Website shows old content after updating
- Wait 2-3 minutes for GitHub Pages to rebuild
- Hard refresh your browser (Ctrl+Shift+R or Cmd+Shift+R)
- Clear your browser cache

---

## Need Help?

If something isn't working:
1. Check the "Weekends" and "Config" tabs are named exactly right
2. Verify the Apps Script URL in schedule.js is correct
3. Make sure the Google Sheet data matches the format in `apps-script/sheet-structure.md`
4. Check the browser console (F12) for error messages

---

## You're All Set! 🏡

Your beautiful Yūnagi Cottage website is live and ready to accept bookings. Enjoy your coastal getaway! 🌅

**Remember:**
- Share the website URL with your guests
- Give them the reservation password
- Check the Google Sheet to see who's booked what
- Update the "About" page with cottage details as needed

Happy hosting! 夕凪
