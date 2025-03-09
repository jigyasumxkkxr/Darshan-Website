📌 API Documentation for User Authentication & Management

🔗 Base URL: http://localhost:8144/api/user


🧑‍💻 User Registration & Authentication APIs
==============================================

1️⃣ Register a New User

Endpoint:POST /api/user/register
Request Body (JSON):
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword",
  "mobile": "9876543210",
  "location": "New York",
  "admin_secret_key": "ADMIN_SECRET_KEY"     //for admin registration . no need to provide this for normal 
                                               user registration
}


2️⃣ Verify OTP for Registration

Endpoint:POST /api/user/verify-reg-otp
Request Body (JSON):
{
  "email": "john@example.com",
  "otp": "123456"
}


3️⃣ Resend OTP
Endpoint:POST /api/user/resend-otp
Request Body (JSON):
{
  "email": "john@example.com"
}


4️⃣ Login User
Endpoint:POST /api/user/login
Request Body (JSON):
{
  "email": "john@example.com",
  "password": "securepassword"
}


5️⃣ Logout User
Endpoint:POST /api/user/logout
Request Body (JSON):
{
  "success": true,
  "message": "Logged out successfully"
}



🔑 Password Reset & Recovery APIs
=====================================

6️⃣ Send Reset Password OTP
Endpoint:POST /api/user/send-reset-otp
Request Body (JSON):
{
  "email": "john@example.com"
}


7️⃣ Verify Reset Password OTP
Endpoint:POST /api/user/verify-reset-otp
Request Body (JSON):
{
  "email": "john@example.com",
  "otp": "123456"
}



8️⃣ Reset Password
Endpoint:POST /api/user/reset-password
Request Body (JSON):
{
  "email": "john@example.com",
  "password": "new_secure_password"
}






🌍 Destination Management API Documentation

🔗 Base URL: http://localhost:8144/api/destination


1️⃣ Add a Destination
📌 Only Admins can add a new destination package.

Endpoint: POST /api/destination/add
Request Body (JSON):

{
  "packageName": "Sunder Kand Path",
  "overview": "A spiritual journey...",
  "type": "Pilgrimage",
  "onePaxOccupancy": 15000,
  "twoPaxOccupancy": 21000,
  "noOfDays": 1,
  "noOfNights": 0,
  "packageImgUrl": "http://example.com/image.jpg",
  "stayCity": "Haridwar",
  "star": 4,
  "packageCotagory": "Pilgrimage",
  "rateType": "Fixed",
  "gallaryImg": [
    {
      "prference": 1,
      "img": "http://example.com/gallery1.jpg"
    },
    {
      "prference": 2,
      "img": "http://example.com/gallery2.jpg"
    }
  ],
  "inclusion": [
    {
      "inclussion": "Pandits for SunderKand Path"
    },
    {
      "inclussion": "Path along with Bhajan"
    }
  ],
  "exclusion": [
    {
      "exclussion": "5% GST"
    },
    {
      "exclussion": "Hotel Stay"
    }
  ],
  "tableItinerary": {
    "Itinerarys": [
      {
        "Days": 1,
        "Heading": "SunderKand Path",
        "Itinerary": [
          {
            "DayNumber": "1",
            "Description": "Arrive at Haridwar and begin the path.",
            "Counter": 0
          }
        ]
      }
    ]
  },
  "policy": {
    "sday": 7,
    "smonth": 3,
    "syear": 2025,
    "startDate": "2025-03-07",
    "endDate": "2026-12-31",
    "bookingType": "Sale",
    "fixdDates": []
  },
  "currCode": "INR",
  "currSymbol": "₹",
  "conversionRate": 1.0,
  "countryCode": "IN"
}




2️⃣ Get All Destinations

Endpoint: GET /api/destination/getall

Response(200 Ok): 
{
  "success": true,
  "message": "Destination fetched successfully",
  "destinations": [
    {
      "_id": "65a1234e5f6789abc123d456",
      "packageName": "Sunder Kand Path",
      "type": "Pilgrimage",
      "stayCity": "Haridwar"
    },
    {
      "_id": "65a4567e5f6789abc456d789",
      "packageName": "Golden Triangle Tour",
      "type": "Cultural",
      "stayCity": "Delhi"
    }
  ]
}



3️⃣ Get Destination by ID

Endpoint: GET /api/destination/get/:id

Response (200 OK):

{
  "success": true,
  "message": "Destination fetched successfully",
  "destination": {
    "_id": "65a1234e5f6789abc123d456",
    "packageName": "Sunder Kand Path",
    "type": "Pilgrimage",
    "stayCity": "Haridwar",
    "packageCotagory": "Pilgrimage",
    "noOfDays": 1,
    "noOfNights": 0,
    "gallaryImg": [
      {
        "prference": 1,
        "img": "http://example.com/gallery1.jpg"
      },
      {
        "prference": 2,
        "img": "http://example.com/gallery2.jpg"
      }
    ],
    "policy": {
        "sday": 7,
        "smonth": 3,
        "syear": 2025,
        "startDate": "2025-03-07",
        "endDate": "2026-12-31",
        "bookingType": "Sale",
        "fixdDates": []
    },

  }
}



4️⃣ Delete a Destination

Endpoint: DELETE /api/destination/delete/:id
Response (200 OK):
{
  "success": true,
  "message": "Destination removed successfully"
}







📌 Enquiry Management API Documentation

📌 Base URL: http://localhost:8144/api/enquiry


1️⃣ Add a New Enquiry

Endpoint: POST /api/enquiry/add
Request Body:
{
  "packageName": "Golden Triangle Tour",
  "destination": "65a4567e5f6789abc456d789",
  "subtype": "Cultural",
  "name": "John Doe",
  "mobile": "9876543210",
  "email": "john@example.com",
  "adult": 2,
  "child": 1,
  "infant": 0,
  "travelDate": "2025-06-15",
  "specialRequests": "Need vegetarian meals",
  "status": "pending",
  "totalAmmount": 15000,
  "paymentStatus": "pending"
}




2️⃣ Get All Enquiries

Endpoint: GET /api/enquiry/getall
Response (200 OK):
{
  "success": true,
  "enquiries": [
    {
      "_id": "65a7890e5f6789abc789d012",
      "packageName": "Golden Triangle Tour",
      "name": "John Doe",
      "status": "pending",
      "user": {
        "name": "John Doe",
        "email": "john@example.com"
      }
    },
    {
      "_id": "65b7890e5f6789abc789d999",
      "packageName": "Sunder Kand Path",
      "name": "Alice",
      "status": "confirmed",
      "user": {
        "name": "Alice Smith",
        "email": "alice@example.com"
      }
    }
  ]
}



3️⃣ Get Enquiry by ID

Endpoint: GET /api/enquiry/get/:id
Response (200 OK):
{
  "success": true,
  "enquiry": {
    "_id": "65a7890e5f6789abc789d012",
    "packageName": "Golden Triangle Tour",
    "name": "John Doe",
    "mobile": "9876543210",
    "email": "john@example.com",
    "status": "pending",
    "destination": {
      "_id": "65a4567e5f6789abc456d789",
      "packageName": "Golden Triangle Tour"
    }
  }
}




4️⃣ Get All Enquiries of a User

Endpoint: GET /api/enquiry/user/all
Response (200 OK):
{
  "success": true,
  "enquiries": [
    {
      "_id": "65a7890e5f6789abc789d012",
      "packageName": "Golden Triangle Tour",
      "destination": {
        "packageName": "Golden Triangle Tour"
      },
      "status": "pending"
    }
  ]
}




5️⃣ Update Enquiry Status (Admin Only)

Endpoint: PUT /api/enquiry/update/:id
Request Body:
{
  "status": "confirmed",
  "paymentStatus": "paid"
}



6️⃣ Delete an Enquiry (Admin Only)

Endpoint: DELETE /api/enquiry/delete/:id






