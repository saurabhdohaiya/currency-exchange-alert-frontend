# Currency Exchange Rate

![image](https://github.com/user-attachments/assets/055e4584-10f1-43e7-ab18-527f87dca2f8)

### **Live Demo**: [View Live](https://currency-exchange-alert-frontend.onrender.com/)

A **responsive and interactive landing page** for a currency exchange service. This project provides a visually appealing user experience with smooth animations, dynamic content, and multiple features, including currency conversion, live rates, and rate alerts. The application also includes a Firebase-powered authentication system and a feature-rich dashboard.

---

## **Overview**

The landing page and dashboard offer a seamless and visually engaging experience for users to explore currency exchange features, such as:
1. **Live Rates**: Displays live exchange rates dynamically.
2. **Set Rate Alert**: Allows users to set alerts for their desired exchange rates.
3. **Sign-In with Firebase**: Secure authentication using Google Sign-In.
4. **Currency Alert Dashboard**: A dedicated dashboard for managing and viewing alerts.
5. **Exchange Rate History Chart**: A detailed line chart to visualize historical exchange rate data.
6. **Notifications and Feedback**: Integrated with **React Toastify** for instant notifications.
7. **Shimmer Effect**: A loading animation to enhance user experience during data fetching.


The page uses **Framer Motion** for animations and transitions, along with **Tailwind CSS** for styling. The app is built with **React**, ensuring a fast and responsive user experience.

---

![image](https://github.com/user-attachments/assets/34e89230-e89f-4090-bad9-50272801dfd2)


## **Features**

### **1. Landing Page**
- **Tab-Based Navigation**:
  - Three tabs (`Currency Converter`, `Live Rates`, `Set Rate Alert`), each with specific functionality.
  - Users can switch between screens by clicking on the tabs or scrolling vertically.
- **Scroll-Based Navigation**:
  - Smooth transitions between screens as the user scrolls.
  - Animated background layers and gradient effects for added depth.
- **Hero Section**:
  - Dynamic text and buttons with animations.
  - Download links for Google Play Store and Apple App Store.
- **Animations**:
  - Implemented with **Framer Motion** for smooth entry and exit effects.
  - Background images, gradients, and hero text are animated for a polished experience.

### **2. Firebase-Powered Authentication**
- **Google Sign-In**:
  - Allows users to sign in securely using their Google accounts.
  - Integrated with Firebase for authentication.

![image](https://github.com/user-attachments/assets/3dcf8663-c625-4718-a7bd-a226585b09ec)

### **3. Currency Alert Dashboard**
- **Set Alerts**:
  - A modal interface to set rate alerts with a title and target exchange rate.
  - Saves alert data to **Firebase Firestore**.
- **View Alerts**:
  - Displays all created alerts in a responsive list.
  - Includes pagination for efficient navigation through large datasets.
- **Notifications**:
  - Success and error notifications using **React Toastify**.
- **Error Handling**:
  - Validates user input and provides visual feedback for errors.

### **4. Exchange Rate History**
- **Dynamic Chart**:
  - A **line chart** (powered by Chart.js) that displays exchange rate history.
  - Custom styling:
    - Line color: `#79E7A5`
    - Background fill: `#79E7A5` with 15% opacity.
- **Loading and Error States**:
  - Shimmering effect while fetching data.
  - User-friendly error messages for failed requests.
---

## **Technologies Used**
1. **React**:
   - Functional components with hooks for state and effect management.
2. **Framer Motion**:
   - Provides animations and transitions for an engaging user experience.
3. **Tailwind CSS**:
   - Utility-first CSS framework for responsive and scalable styling.
4. **Firebase**:
   - **Authentication**: Secure Google Sign-In.
   - **Firestore**: For storing and managing rate alerts.
5. **React Toastify**:
   - Delivers toast notifications for feedback.
6. **Chart.js**:
   - Displays historical exchange rate data in a customizable chart.
7. **React Router**:
   - Handles navigation between the landing page, sign-in, and dashboard.


