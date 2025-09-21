Inspection UI

A dynamic front-end application to perform inspections for vehicles, sites, and suppliers. The UI renders inspection details, handles conditional fields, photo uploads, notes, and validates user input before submission.

Features

Display categories (Vehicle, Site, Supplier) and inspections dynamically.

Render inspection lines: conditions (state, yes/no), notes, and photos.

Conditional validation: required, optional, and conditional fields.

Dynamic dropdowns using options from the JSON payload.

Photo upload with custom icon button.

Validation errors displayed clearly.

Works with any new inspection payloads following the same JSON structure.

Professional gradient styling with hover effects.

Responsive design.

Getting Started
Prerequisites

Make sure you have the following installed:

Node.js (v16+ recommended)

npm (v8+ recommended)

Installation

Clone the repository:

git clone https://github.com/Giftthane551/inspection-ui.git
cd inspection-ui


Install dependencies:

npm install

Running the App

Start the development server:

npm start


This will open the app at http://localhost:3000/. The page reloads automatically when you make changes to the code.

Project Structure
src/
 ├─ Components/
 │   ├─ CategoryList.jsx      # Displays categories
 │   ├─ InspectionList.jsx    # Displays inspections per category
 │   ├─ InspectionForm.jsx    # Main form for inspection
 │   └─ InspectionLine.jsx    # Renders each input line
 ├─ data/
 │   └─ sampleInspections.json # Sample inspection payload
 ├─ App.jsx
 └─ index.js

JSON Payload Structure

The app uses a JSON structure like this:

[
  {
    "category": "Vehicle",
    "inspections": [
      {
        "id": "engine",
        "name": "Engine Inspection",
        "lines": [
          {
            "id": "engine_status",
            "label": "Engine Status",
            "type": "state",
            "required": true,
            "options": ["Good", "Bad", "Excellence"]
          },
          {
            "id": "engine_photos",
            "label": "Upload Engine Photos",
            "type": "photo",
            "required": "conditional",
            "condition": "{{severity_level}}>50"
          },
          {
            "id": "notes",
            "label": "Notes",
            "type": "text",
            "required": false
          }
        ]
      }
    ]
  }
]


type can be: state, yesno, photo, text.

required can be: true, false, "conditional".

options is used for dropdowns.

condition is evaluated for conditional fields.

Customization

Add new inspections by updating sampleInspections.json with the same structure.

Styles can be updated in InspectionForm.module.css and other CSS modules.

Icons can be replaced or added using react-icons or lucide-react.

Notes

The app uses React functional components and hooks.

Conditional logic is evaluated safely for numeric comparisons.

Photo uploads are handled with a custom button for better UX.