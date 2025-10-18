# JaloBooks - University Library App

![JaloBooks Screenshot](./src/assets/screenshot.png)

JaloBooks is a Single Page Application (SPA) developed as a capstone project for a Web Development course. The goal is to enable users to explore, search, and manage books in a virtual university library.

The application fetches data from the public [Gutendex API](https://gutendex.com/) (based on Project Gutenberg) to display a catalog of classic books. Users can perform advanced searches, view book details, simulate loans and reservations, and manage personal lists such as "Reading," "Completed," and "Wishlist."

## 🚀 Technologies Used

- **Language:** [TypeScript](https://www.typescriptlang.org/)
- **Frontend Framework:** [React](https://react.dev/)
- **Build Tool:** [Vite](https://vitejs.dev/)
- **State Management:** [Redux Toolkit](https://redux-toolkit.js.org/)
- **Routing:** [React Router DOM](https://reactrouter.com/en/main)
- **Styling:** [CSS Modules](https://github.com/css-modules/css-modules)
- **Data Persistence:** `localStorage`
- **Deployment:** [Netlify](https://jalobooks.netlify.app/)
- **Icons:** [React Icons](https://react-icons.github.io/react-icons/)

## 📋 Features

As per the capstone project requirements, the application implements:

1. **Book Navigation:** Displays books fetched from the Gutendex API, including title, author, description, and cover.
2. **Search and Filtering:** Enables searching by title/author and filtering by language and topic, with sorting options.
3. **Simulated Loan System:** Users can "borrow" books (marked as unavailable locally), track simulated due dates, and reserve books "borrowed" by others (simulated locally).
4. **Book Details Page:** Detailed view for each book.
5. **Wishlist (Advanced Feature):** Users can add/remove books to/from a wishlist.
6. **Responsive Design:** Layout adaptable for desktop, tablets, and mobile devices.
7. **User Interface and Accessibility:** Intuitive navigation with a focus on usability.
8. **Performance Optimization:** Structured for efficient loading.
9. **Security Measures:** Form validation and basic XSS prevention.
10. **Build and Deployment:** Ready and deploymented on [Netlify](https://jalobooks.netlify.app/).

_Note: Features like real due dates, notifications, and full backend authentication are simulated with `localStorage` due to the frontend-only project scope._

## 🛠️ Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/en) (recommended: LTS version)
- npm (included with Node.js) or [Yarn](https://yarnpkg.com/)

### Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/nandovx/jalobooks.git
   cd jalobooks
   ```

2. **Install dependencies:**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server:**

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. The application will be available at `http://localhost:5173` (or another port indicated in the terminal).

## 🏗️ Project Structure

```
src/
├── assets/          # Images and icons
├── components/      # Reusable components (BookCard, Header, etc.)
├── hooks/          # Custom hooks (useUserLoans, etc.)
├── pages/          # Page components (Home, BookDetail, Profile, etc.)
├── services/       # Logic for API communication and localStorage
├── store/          # Redux Toolkit configuration (slices)
├── styles/         # Global CSS and variables
├── types/          # TypeScript type definitions
├── App.tsx         # Root application component
├── main.tsx        # Application entry point
└── ...
```

## 📤 Deployment

The application is deployed on Netlify platform in the link: https://jalobooks.netlify.app/.

## 🧪 Testing

_Tests are not yet implemented. Future improvements may include unit and integration tests using Vitest or Jest._

## 🤝 Contributing

This project was developed as an individual academic assignment. External contributions are not expected at this time, but suggestions via GitHub Issues are welcome.

## ✍️ Author

**Fernando Batista (nandovx)**

- GitHub: [@nandovx](https://github.com/nandovx)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
