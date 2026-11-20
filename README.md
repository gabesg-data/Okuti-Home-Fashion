Okuti Home & Fashion 🛋️

A modern furniture and fashion e-commerce website built for the Namibian market.

Live Website: "okutifurniture.netlify.app" (https://okutifurniture.netlify.app)
Source Code: "GitHub Repository" (https://github.com/gabesg-data/Okuti-Home-Fashion)

---

📌 About the Project

Okuti Home & Fashion is a web-based storefront designed to help customers discover furniture and fashion products online, check product availability, and place enquiries or orders conveniently.

The project combines a responsive storefront with a Supabase-backed database and administrative functionality for managing products and customer orders. It was developed as a practical business project, bringing together web development, database management, authentication, and cloud deployment.

The goal is to create a straightforward shopping experience for customers while providing the business with a foundation for managing its online catalogue and incoming orders.

✨ Features

🛍️ Online Storefront

- Browse a product catalogue covering furniture, home furnishings, and fashion.
- Explore products across categories, including couches, beds, tables, chairs, wardrobes, TV stands, and fashion.
- View product details, descriptions, images, and prices.
- Identify products marked as available, out of stock, or sold.

📦 Product Management

- Store and retrieve product information through Supabase.
- Support product creation, editing, and deletion through the administrative interface.
- Upload product images to cloud storage.
- Maintain product availability information.

🧾 Order Management

- Submit customer orders through the website.
- Store order information in the connected database.
- Provide an administrative workflow for viewing and managing orders.
- Support the handling of incoming customer enquiries and purchases.

🔐 Administrative Access

- Use Supabase Authentication for administrator sign-in.
- Load administrative order information after authentication.
- Connect the storefront to database-backed product and order workflows.

📱 Customer Communication

- Support WhatsApp-based customer communication.
- Provide a direct route for customers to enquire about products and purchases.

☁️ Cloud Deployment

- Deploy the website through Netlify.
- Use Supabase for database services, authentication, and image storage.
- Keep the frontend and backend services connected through the Supabase JavaScript client.

🧰 Technology Stack

Technology| Purpose
HTML5| Application entry point and page structure
CSS3| Layout, styling, and responsive presentation
JavaScript (ES6+)| Application logic and interactive functionality
React 18| Component-based user interface
Supabase| Database, authentication, and storage services
PostgreSQL| Relational database powering Supabase
Netlify| Website hosting and deployment
Git & GitHub| Version control and source-code management

🏗️ Architecture

The application uses a lightweight frontend connected to Supabase as its backend service.

Customer / Administrator
          |
          v
   React Frontend
 HTML + CSS + JavaScript
          |
          v
   Supabase Client
          |
          +------------------+
          |         |        |
          v         v        v
       Products   Orders   Storage
          |
          v
     PostgreSQL

The storefront retrieves product information from the database, while administrative operations interact with product and order records. Supabase Authentication supports administrator access, and Supabase Storage is used for product images.

Database access must be protected by appropriate Row Level Security (RLS) policies; frontend authentication alone is not a security boundary.

📁 Project Structure

Okuti-Home-Fashion/
├── index.html     # HTML entry point and external libraries
├── styles.css     # Website styling and layout
├── app.js         # React application and business logic
└── README.md      # Project documentation

🚀 Running the Project Locally

Prerequisites

- A modern web browser.
- Git installed on your computer.
- A Supabase project configured for the application's database, authentication, and storage.

1. Clone the repository

git clone https://github.com/gabesg-data/Okuti-Home-Fashion.git

2. Open the project directory

cd Okuti-Home-Fashion

3. Start a local web server

The project loads its frontend libraries through CDNs, so a traditional Node.js build step is not required by the current setup. Running it through a local web server is recommended.

If Python is installed, run:

python -m http.server 8000

Then open:

http://localhost:8000

4. Configure Supabase

The application connects to a Supabase project using its project URL and publishable key.

Before using the application with your own database, make sure that:

- The required "products" and "orders" tables exist and match the application's expected fields.
- The "product-images" storage bucket is configured.
- Appropriate Row Level Security policies are enabled.
- Public users can access only the data and operations intended for them.
- Administrative access is properly restricted.

Security note: A Supabase publishable key is designed for use in client-side applications. It does not replace database security. Never expose a Supabase secret key or service-role key in frontend code, and never commit passwords or other private credentials.

🌐 Deployment

The live application is hosted on Netlify and uses Supabase for backend services.

To deploy your own version:

1. Fork or clone this repository.
2. Configure your Supabase project and security policies.
3. Connect the repository to Netlify.
4. Set the deployment publish directory to the project root, where "index.html" is located.
5. Deploy and test the storefront, order submission, authentication, and administrative workflows.

Live demo: "https://okutifurniture.netlify.app" (https://okutifurniture.netlify.app)

🔒 Security Considerations

Security is an important part of a database-backed e-commerce application.

- Apply least-privilege access to database tables and storage.
- Allow public product reads only where intended.
- Restrict product creation, editing, and deletion to authorized administrators.
- Prevent unauthenticated customers from reading other customers' orders.
- Restrict order administration to authorized users.
- Validate customer input and order data.
- Review storage policies before allowing image uploads.
- Avoid exposing secret keys, credentials, or private customer information in the repository.

The effectiveness of these controls depends on the actual Supabase policies configured for the deployed project.

🔮 Potential Future Improvements

- Add product search, sorting, and filtering.
- Improve checkout and order-status tracking.
- Introduce automated order confirmations.
- Add product pagination and performance optimizations.
- Improve form validation and error handling.
- Add automated tests for important application workflows.
- Move configuration into a more maintainable deployment setup.
- Improve accessibility, SEO metadata, and production monitoring.
- Add a documented database schema and repeatable database setup scripts.

🎯 What This Project Demonstrates

This project provides practical experience with:

- Building interactive web applications.
- Integrating a frontend with a cloud-hosted relational database.
- Working with database-backed CRUD operations.
- Implementing authentication and thinking about authorization.
- Managing product images through cloud storage.
- Deploying a website and maintaining its source code with Git and GitHub.
- Applying software development skills to a real business use case.

👨‍💻 Developer

Gabriel Gabriel Junior Kaatya
Data Science Undergraduate | Aspiring Data Scientist & Developer

- GitHub: "@gabesg-data" (https://github.com/gabesg-data)
- Project: "Okuti Home & Fashion" (https://github.com/gabesg-data/Okuti-Home-Fashion)
- Live Website: "okutifurniture.netlify.app" (https://okutifurniture.netlify.app)

---

Built as a practical e-commerce project combining web development, database integration, and cloud deployment for a Namibian business.
