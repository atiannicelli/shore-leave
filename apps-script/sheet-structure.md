# Google Sheet Structure for Yūnagi Cottage

This document explains how to set up your Google Sheet to work with the booking system.

## Sheet Tabs

Your spreadsheet should have **two tabs**:

1. **Weekends** — Contains all weekend availability and booking data
2. **Config** — Contains the reservation password

---

## Tab 1: "Weekends"

### Column Headers (Row 1)

| Column | Header | Description |
|--------|--------|-------------|
| A | Weekend ID | Unique ID (1-22) |
| B | Start Date | Friday date |
| C | End Date | Sunday date |
| D | Display Label | Human-readable date range |
| E | Status | "Available" or "Taken" |
| F | Guest Name | Name of person who booked |
| G | Email | Guest email |
| H | Number of Guests | Party size |
| I | Date Reserved | Timestamp of booking |

### Pre-populated Data (Rows 2-23)

Copy and paste this data into your Weekends sheet, starting at row 2:

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

**Important Notes:**
- Columns B and C should be formatted as **Date** format in Google Sheets
- Column E should exactly say "Available" for open weekends (case-sensitive!)
- Columns F-I will be filled automatically when reservations are made

---

## Tab 2: "Config"

This tab stores the reservation password.

### Structure

| Column A | Column B |
|----------|----------|
| Password | yunagi2026 |

**Setup:**
1. Create a new sheet tab named "Config"
2. In cell A1, type: `Password`
3. In cell B1, type: `yunagi2026` (or whatever password you want to use)

**Security Note:** Anyone with edit access to this Google Sheet can see the password. Only share edit access with trusted people. Guests booking weekends don't need access to the sheet — they only interact with the website.

---

## Setting Up the Sheet

1. **Create a new Google Sheet** in your Google Drive
2. Name it something like "Yūnagi Cottage Bookings"
3. **Rename Sheet1** to "Weekends"
4. Add the column headers (row 1)
5. Copy/paste the weekend data (rows 2-23)
6. Format columns B and C as dates
7. **Create a new tab** and name it "Config"
8. Add the password configuration (A1: "Password", B1: "yunagi2026")
9. **Open Apps Script** from Extensions > Apps Script
10. Continue with the Apps Script setup in SETUP.md

---

## Viewing Bookings

When someone makes a reservation:
- Column E will change from "Available" to "Taken"
- Column F will show the guest's name
- Column G will show their email
- Column H will show number of guests
- Column I will show when they booked

You can review this data anytime by opening your Google Sheet. The website only shows "Available" or "Reserved" — guest names are kept private.

---

## Changing the Password

To change the reservation password:
1. Open your Google Sheet
2. Go to the "Config" tab
3. Change the value in cell B1
4. Save (no other changes needed — Apps Script reads this value)

Make sure to tell your guests the new password!
