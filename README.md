Even most of the required functionalities were implemented, I am not very happy with the synchronisation between number of copies added in cart and the one shown in the stepper field for each book, those normally should display the same value based on user interactions or at least to be correlated. The core structure of the application is organized into several key components, slices and pages,  each responsible for specific functionalities:

    * App: The main component that sets up the Redux provider, router, and layout for the application.
    * Navbar: A navigation bar that provides links to the Books Page and User Profile Page, along with a shopping cart toggle.
    * BooksPage: Displays a searchable list of books using mock data. It includes a search bar that filters books by title or author.
    * BookCard: Represents individual book items, displaying their details and an "Add to Cart" button.
    * Cart: A sidebar that shows the items added to the cart, allows quantity adjustments, and provides a submit button.
    * ProfilePage: A form for users to update their personal information, including validation for email and required fields.

I used Redux Toolkit to manage the global state of the application, including the shopping cart and user profile. The cartSlice handles cart operations, while the userSlice manages user profile updates.

Arguments for my choice:
    * Redux Toolkit provides predictable state management
    * Slices for cart and user management allow modular, scalable approach
    * Centralized state reduces prop drilling   

Yup and React Hook Form: Used for form validation in the Profile Page, providing a robust way to handle user input and validation errors.

Future Considerations

1. Backend Integration: The application currently uses mock data for books. In a production environment, integrating a backend API would be essential for dynamic data retrieval and updates. This would allow for real-time stock updates and user data management.
2. User Authentication: Implementing user authentication (e.g., login/logout functionality) was not included but I see it very important and also would better make sens to have a profile page along with a login/register flow.
3. Error Handling: While basic error handling is implemented (e.g., showing error messages for stock limitations), more robust error handling for network requests and form submissions would be necessary in a production environment.
4. Regarding design and responsiveness I used Amplify because I observed is used in your product and lucide, but normally I would go with a Design System strategy in order to assure consistency across the entire product or even multiple products. If the Design System would not be a focus in terms of resource allocation and priorities, I would go with styled components.
5. In terms of testing I would add integration and e2e testing and more comprehensive unit tests and for Redux slices would be beneficial for ensuring application stability and reliability.
7. Enhanced User Experience: I would focus on improving the UI/UX by adding animations, transitions, and more interactive elements to enhance user engagement.
8. Accessibility Improvements: The current implementation has a basic implementation in terms of accessibility, I would ensure a more detailed and professional approach
9. Performance Optimization: I would analyze the application for performance bottlenecks and implement optimizations, such as code splitting and lazy loading, to improve load times and responsiveness.


Project realized by Cornelia Radu in scope of Verbit interview process.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
