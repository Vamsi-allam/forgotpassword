# Password Recovery System

A comprehensive authentication system built with Spring Boot and React, featuring login, registration, and password recovery functionality with email OTP verification.

![Password Recovery System](https://via.placeholder.com/800x400?text=Password+Recovery+System)

## 🚀 Features

### Core Features

- **User Authentication** - Secure login with email/phone and password
- **User Registration** - Create new accounts with role selection (Student/Admin)
- **Password Recovery** - Reset forgotten passwords via email OTP
- **Role-based Access** - Different dashboards for students and admins

### Advanced Features

- **Email OTP Verification** - Secure one-time passwords sent via email
- **Real-time Password Validation** - Immediate feedback during registration
- **Responsive Design** - Works on all devices and screen sizes
- **Token-based Authentication** - Secure API access
- **Snackbar Notifications** - User-friendly feedback for actions
- **Form Validation** - Input validation with error messages

## 🔧 Tech Stack

### Backend

- **Spring Boot 3.5.0** - Java-based backend framework
- **Spring Security** - Authentication and authorization
- **Spring Data JPA** - Database operations
- **MySQL** - Database storage
- **JavaMail API** - Email sending functionality
- **BCrypt** - Password encryption

### Frontend

- **React 18** - Modern JavaScript library
- **React Router** - Client-side routing
- **Material UI** - Component library for styling
- **Axios** - API requests
- **React Hooks** - State management
- **Vite** - Fast development environment

## 📁 Project Structure

```
project/
├── backend/
│   ├── src/main/java/com/example/demo/
│   │   ├── config/              # Configuration classes
│   │   │   └── SecurityConfig.java
│   │   ├── controller/          # REST controllers
│   │   │   ├── LoginController.java
│   │   │   ├── RegistrationController.java
│   │   │   └── ForgotPasswordController.java
│   │   ├── entity/              # Data models
│   │   │   ├── User.java
│   │   │   └── PasswordResetToken.java
│   │   ├── repository/          # Database repositories
│   │   │   ├── UserRepository.java
│   │   │   └── PasswordResetTokenRepository.java
│   │   └── service/             # Business logic
│   │       └── EmailService.java
│   └── src/main/resources/
│       └── application.properties # Main config file
├── frontend/forgotpass/
    ├── public/
    └── src/
        ├── components/          # React components
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── ForgotPassword.jsx
        │   ├── VerifyOtp.jsx
        │   ├── Dashboard.jsx
        │   └── SnackbarAlert.jsx
        ├── App.jsx              # Main component
        ├── main.jsx            # Entry point
        └── App.css             # Global styles
```

## 🚀 Quick Start

### Prerequisites

- **Java 21** (or JDK 17+)
- **Node.js 18+** and npm
- **MySQL 8.0**

### Step 1: Database Setup

1. Create a MySQL database:
   ```sql
   CREATE DATABASE forgotpass_database;
   ```

2. Make sure your MySQL server is running on localhost:3306

### Step 2: Backend Setup

1. **Configure application.properties**

   Open `backend/demo/src/main/resources/application.properties`:
   
   ```properties
   # Database Configuration - CHANGE THESE VALUES
   spring.datasource.url=jdbc:mysql://localhost:3306/forgotpass_database?useSSL=false&serverTimezone=UTC
   spring.datasource.username=your_mysql_username
   spring.datasource.password=your_mysql_password
   
   # Email Configuration - CHANGE THESE VALUES
   spring.mail.username=your_gmail_address@gmail.com
   spring.mail.password=your_app_password
   ```

2. **Generate Gmail App Password for Email Service**:

   a. Go to your Google Account settings: https://myaccount.google.com/
   b. Go to Security → 2-Step Verification → App passwords
   c. Select "Mail" as the app and "Other" as the device
   d. Enter a name (e.g., "Spring Boot App")
   e. Copy the 16-character password
   f. Paste it as `spring.mail.password` in application.properties

3. **Run the backend**:

   ```bash
   cd backend/demo
   ./mvnw spring-boot:run
   ```

### Step 3: Frontend Setup

1. **Install dependencies**:

   ```bash
   cd frontend/forgotpass
   npm install
   ```

2. **Run the frontend**:

   ```bash
   npm run dev
   ```

3. **Access the application**:

   Open your browser and go to: http://localhost:5173

## 📱 Core Components

### Authentication Flow

1. **Registration**:
   - User enters name, email, phone, password, and selects role
   - System validates input and checks for existing users
   - Password is hashed using BCrypt before storage

2. **Login**:
   - User enters email/phone and password
   - System authenticates and redirects to appropriate dashboard

3. **Password Recovery**:
   - User enters email address
   - System generates 6-digit OTP and sends via email
   - User enters OTP and new password
   - System verifies OTP and updates password

### Backend Key Components

1. **ForgotPasswordController**:
   - `requestOtp()`: Generates and emails a 6-digit OTP
   - `verifyOtpAndResetPassword()`: Validates OTP and updates password

2. **EmailService**:
   - Sends OTP emails using JavaMail
   - Configurable email templates

3. **PasswordResetToken**:
   - Stores OTP with expiration time (5 minutes)
   - Linked to user email

### Frontend Key Components

1. **ForgotPassword.jsx**:
   - Email input form
   - Triggers OTP generation and email sending

2. **VerifyOtp.jsx**:
   - OTP input fields
   - New password setup
   - Resend OTP functionality

3. **App.jsx**:
   - Routes configuration
   - Global state management
   - Snackbar notifications

## ⚙️ Configuration Guide

### Email Configuration with Gmail App Password

To set up email functionality with Gmail, follow these steps:

1. **Enable 2-Step Verification for your Google Account**
   - Go to [Google Account Security](https://myaccount.google.com/security)
   - Scroll to "Signing in to Google"
   - Select "2-Step Verification" and turn it ON (follow Google's instructions)

2. **Generate an App Password**
   - After enabling 2-Step Verification, go back to the [Security page](https://myaccount.google.com/security)
   - Scroll to "2-Step Verification" and click on it
   - At the bottom, find "App passwords" and click on it
   - Select "Mail" for the app
   - Select "Other (Custom name)" for the device
   - Enter a name (e.g., "Spring Boot App")
   - Click "GENERATE"
   - Google will display a 16-character password (without spaces)
   - **Copy this password immediately** (you won't be able to see it again)

3. **Configure application.properties**
   - Open `backend/demo/src/main/resources/application.properties`
   - Update the following properties:
   
   ```properties
   # Email Configuration
   spring.mail.host=smtp.gmail.com
   spring.mail.port=587
   spring.mail.username=your.actual.email@gmail.com
   spring.mail.password=your16characterapppassword
   spring.mail.properties.mail.smtp.auth=true
   spring.mail.properties.mail.smtp.starttls.enable=true
   ```

   - Replace `your.actual.email@gmail.com` with your actual Gmail address
   - Replace `your16characterapppassword` with the 16-character app password you generated
   - Save the file

4. **Important Notes**
   - Do NOT use your regular Gmail password - it won't work and is not secure
   - The app password is a 16-character code without spaces
   - If you regenerate the app password, you'll need to update application.properties
   - Ensure your Gmail account doesn't have security restrictions that prevent SMTP access

5. **Troubleshooting**
   - If emails aren't sending, verify your app password is correct
   - Check that 2-Step Verification is still enabled
   - Ensure you're not hitting Gmail's sending limits
   - Verify your network allows outbound SMTP connections (port 587)

### Database Configuration

In `application.properties`:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/YOUR_DB_NAME?useSSL=false&serverTimezone=UTC
spring.datasource.username=YOUR_USERNAME
spring.datasource.password=YOUR_PASSWORD
spring.jpa.hibernate.ddl-auto=update
```

### API Endpoints

1. **Authentication**:
   - `POST /api/login` - User login
   - `POST /api/register` - User registration

2. **Password Recovery**:
   - `POST /api/forgot-password/request-otp` - Request password reset OTP
   - `POST /api/forgot-password/verify-otp` - Verify OTP and reset password

## ⚠️ Troubleshooting

### Common Issues

1. **Email Sending Fails**:
   - Verify your Gmail App Password is correct
   - Make sure 2-Step Verification is enabled in your Google account
   - Check that you've configured the correct SMTP settings

2. **Database Connection Issues**:
   - Ensure MySQL is running
   - Verify database name, username and password
   - Check for proper permissions

3. **OTP Verification Fails**:
   - OTPs expire after 5 minutes
   - Check email for the latest OTP
   - Make sure to enter OTP correctly

4. **CORS Errors**:
   - Verify frontend URL is allowed in SecurityConfig.java
   - Check that backend is running on expected port

## 🚀 Customization

### Changing OTP Expiration Time

In `ForgotPasswordController.java`, modify:
```java
LocalDateTime expiryDate = LocalDateTime.now().plusMinutes(5); // Change 5 to desired minutes
```

### Using Different Email Provider

Update `application.properties` with your provider's settings:
```properties
spring.mail.host=your_smtp_server
spring.mail.port=your_smtp_port
# Other mail settings...
```

### Customizing Email Template

Create an HTML template in `src/main/resources/templates/` and modify `EmailService.java` to use it.

## 📱 Responsive Design

The application uses Material UI for responsive design across:
- Mobile phones (portrait and landscape)
- Tablets
- Desktop screens

## 🔒 Security Features

- Passwords encrypted with BCrypt
- Time-limited OTPs (5 minutes)
- CORS protection
- XSS prevention
- CSRF protection

---

Built with Spring Boot and React.
