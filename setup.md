# Project Setup

Follow the steps below to set up the project on your local machine.

## Prerequisites
Make sure you have the following installed:
- [Node.js](https://nodejs.org/) (Latest LTS version recommended)
- [Git](https://git-scm.com/)

## Installation Steps

### 1. Clone the Repository
```sh
git clone https://github.com/Sushant20012003/Darshan-Website.git
cd Darshan-Website
```

### 2. Install Dependencies
### Project Directory
```sh
npm run build
```

### 3. Set Up Environment Variables
In the `project` directory, create a `.env` file and add the following variables:
```env
PORT=8143
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET_KEY=<your-jwt-secret>
AUTH_EMAIL=<email_to_send_verification_mail>
AUTH_EMAIL_PASSWORD=<email_app_password>
VITE_CLOUD_NAME=<cloudinary_cloudname>
ADMIN_SECRET_KEY=<admin_secret_key>
NODE_ENV=<development_or_production>
```
Replace all the placeholders with your actual values.

Also, in frontend/src/lib/uploadToCloudinary.js file, set up an unsigned preset of the cloudinary cloud in the value of 'upload_present' key of form append.

And, in 'frontend' directory make a .env file and add the following variable:

```env
VITE_CLOUD_NAME=<cloudinary_cloudname>
```

### 4. Run the Application
### Project Directory
```sh
npm run start
```

## Notes
- If you encounter any issues, check the `.env` file and ensure all dependencies are installed correctly.
- If you encounter any issue in upload image then check the cloudinary preset and the cloudinary account settings.
  And must have to set the environment variable in frontend .env file and set the cloudinary preset in frontend/src/lib/uploadToCloudinary.js file.

Happy coding! 🚀

