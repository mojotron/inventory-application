# Inventory Application

Live 👉[preview]() of the project, hosted by Glitch.

This project is part of [The Odin Project](https://www.theodinproject.com/lessons/nodejs-inventory-application#project-solution) curriculum.

Goal of this project is to create an Inventory management app for an imaginary store.
Inventory app have categories and items, so when the user goes to the home-page they can choose a category to view, and then get a list of every item in that category. Project include all of the CRUD methods for both items and categories, so anybody that’s visiting the site can Create, Read, Update or Delete any Item or Category.

## Technologies used

- Node.js
- Express
- EJS - Embedded JavaScript templates
- Tailwind CSS
- PostgreSQL with Neon PostgreSQL Platform
- Express-validation

### Installing and starting project

1. Clone or fork this repo
2. cd into the inventory-application directory (where this README is located).
3. Create .env file and add POSTGRESQL_URI variable with your postgresql connection link
4. run populate.js script with npm run db:populate
5. run project with npm run dev
6. visit http://localhost:5000 and have fun

## Screenshots

### Homepage

![Home page.](/public/screenshots/screenshot-home.png 'This is a sample image.')

### Category list

![Categories.](/public/screenshots/screenshot-categories.png 'This is a sample image.')

### Inventory List

![Inventory.](/public/screenshots/screenshot-inventory.png 'This is a sample image.')

### Item Details

![Item details.](/public/screenshots/screenshot-item.png 'This is a sample image.')

### Item Form

![Item Form.](/public/screenshots/screenshot-item-form.png 'This is a sample image.')

### Delete Popup

![Delete Popup.](/public/screenshots/screenshot-confirm-box.png 'This is a sample image.')

### Search results

![Search results.](/public/screenshots/screenshot-search.png 'This is a sample image.')
