# Topazio Shop

This project was built using MERN stack. It was developed for educational purposes to enhance web development skills and to showcase the implementation of various features commonly found in e-commerce applications. Below is an overview of the technologies used and the features implemented in the project.

## Technologies Used

- **Backend:** Node.js, MVC (Model-View-Controller) architecture
- **Frontend:** React, Redux (for state management)
- **Database:** MongoDB

## Features

The e-commerce website incorporates a range of features designed to provide a seamless and user-friendly shopping experience:

- **Shopping Cart:** Users can add products to a shopping cart, review cart contents, and proceed to checkout.
- **User Authentication:** Users can create accounts, log in, and access personalized features such as order history.
- **PayPal Payment Integration:** Seamless integration with PayPal for secure and convenient payment processing.
- **Product Listing:** The application offers searching, sorting, filtering, and pagination functionality for efficient browsing and finding desired products.
- **Multilevel Categories:** Products are organized into multilevel categories for easy navigation and browsing.
- **Bestsellers Carousel:** A carousel component highlights the best-selling products on the website.
- **Star Rating System and Reviews:** Users can rate and provide product reviews, helping others make informed purchasing decisions.
- **Real-Time Sales Charts:** Utilizing Socket.IO, the application displays real-time sales charts for tracking sales and performance.
- **Chat Functionality:** Leveraging Socket.IO, users can chat with customer support.
- **Admin UI:** The application includes an intuitive and user-friendly admin interface for efficient order management.


# API Documentation


## User Routes 

### Public routes:

- **POST** `/api/users/register` - Register a new user.
- **POST** `/api/users/login` - Login a user.

### User routes:

- **PUT** `/api/users/profile` - Update user profile.
- **GET** `/api/users/profile/:id` - Get user profile by ID.
- **POST** `/api/users/review/:productId` - Create a review for a product.

### Admin routes:

- **GET** `/api/users` - Get all users.
- **GET** `/api/users/:id` - Get a user by ID.
- **PUT** `/api/users/:id` - Update a user by ID.
- **DELETE** `/api/users/:id` - Delete a user by ID.

## Product Routes 

### Public routes:

- **GET** `/api/products` - Get all products.
- **GET** `/api/products/category/:categoryName` - Get products by category.
- **GET** `/api/products/search/:searchTextQuery` - Search for products.
- **GET** `/api/products/category/:categoryName/search/:searchTextQuery` - Search products within a category.
- **GET** `/api/products/bestsellers` - Get bestseller products.
- **GET** `/api/products/get-one/:id` - Get product details by ID.

## Order Routes 

### User routes:

- **GET** `/api/orders` - Get all orders for the logged-in user.
- **GET** `/api/orders/user/:id` - Get an order with user data.
- **POST** `/api/orders` - Create a new order.
- **PUT** `/api/orders/paid/:id` - Update order status to paid.

### Admin routes:

- **PUT** `/api/orders/delivered/:id` - Update order status to delivered.
- **GET** `/api/orders/admin` - Get all orders for the admin.
- **GET** `/api/orders/analysis/:date` - Get orders for analysis.

## Category Routes 

- **GET** `/api/categories` - Fetch all categories.
- **POST** `/api/categories` - Create a new category.
- **POST** `/api/categories/attr` - Save category attribute.
- **DELETE** `/api/categories/:category` - Delete a category.



### Admin routes:

- **GET** `/api/products/admin` - Get all products for admin.
- **DELETE** `/api/products/admin/delete/:id` - Delete a product by ID.
- **DELETE** `/api/products/admin/image/:imagePath/:productId` - Delete a product image.
- **POST** `/api/products/admin/create` - Create a new product.
- **PUT** `/api/products/admin/update/:id` - Update a product by ID.
- **POST** `/api/products/admin/upload` - Upload a product image.

## API Routes 

- **GET** `/api/get-token` - Get an access token.
- **GET** `/api/logout` - Logout and clear access token.
- **GET** `/api/health` - Health check for the API.



## API Diagram



``` mermaid
sequenceDiagram
    Client->>+API: GET /api/get-token
    API->>+AccessToken Utils: verifyAccessToken()
    AccessToken Utils->>+Database: Verify token
    Database-->>-AccessToken Utils: Token valid
    AccessToken Utils-->>-API: Return token
    API-->>Client: Return token

    Client->>+API: GET /api/logout
    API->>+Cookie Utils: clear access token
    Cookie Utils-->>-API: Token cleared
    API-->>Client: Return success message

    Client->>+API: GET /api/health
    API->>+API Controller: healthCheck()
    API Controller-->>-API: API is working
    API-->>Client: Return health status

    Client->>+API: POST /api/users/register
    API->>+User Controller: registerUser()
    User Controller->>+Database: Insert new user
    Database-->>-User Controller: User created
    User Controller-->>-API: Return success response
    API-->>Client: Return success message

    Client->>+API: POST /api/users/login
    API->>+User Controller: loginUser()
    User Controller->>+Database: Verify user credentials
    Database-->>-User Controller: Credentials valid
    User Controller-->>-API: Return JWT token
    API-->>Client: Return JWT token

    Client->>+API: PUT /api/users/profile
    API->>+User Controller: updateUserProfile()
    User Controller->>+Database: Update user profile
    Database-->>-User Controller: Profile updated
    User Controller-->>-API: Return success response
    API-->>Client: Return success message

    Client->>+API: POST /api/users/review/:productId
    API->>+User Controller: createReview(productId)
    User Controller->>+Database: Insert review for product
    Database-->>-User Controller: Review created
    User Controller-->>-API: Return success response
    API-->>Client: Return success message

    Client->>+API: GET /api/products
    API->>+Product Controller: getProducts()
    Product Controller->>+Database: Fetch all products
    Database-->>-Product Controller: Return products list
    Product Controller-->>-API: Return products list
    API-->>Client: Return products list

    Client->>+API: GET /api/products/category/:categoryName
    API->>+Product Controller: getProducts(categoryName)
    Product Controller->>+Database: Fetch products by category
    Database-->>-Product Controller: Return products list
    Product Controller-->>-API: Return products list
    API-->>Client: Return products list

    Client->>+API: GET /api/products/search/:searchTextQuery
    API->>+Product Controller: getProducts(searchTextQuery)
    Product Controller->>+Database: Search for products
    Database-->>-Product Controller: Return search results
    Product Controller-->>-API: Return search results
    API-->>Client: Return search results

    Client->>+API: GET /api/products/bestsellers
    API->>+Product Controller: getBestsellers()
    Product Controller->>+Database: Fetch bestsellers
    Database-->>-Product Controller: Return bestsellers
    Product Controller-->>-API: Return bestsellers
    API-->>Client: Return bestsellers

    Client->>+API: GET /api/products/get-one/:id
    API->>+Product Controller: getProductById(id)
    Product Controller->>+Database: Fetch product by ID
    Database-->>-Product Controller: Return product data
    Product Controller-->>-API: Return product details
    API-->>Client: Return product details

    Client->>+API: POST /api/orders
    API->>+Order Controller: createOrder()
    Order Controller->>+Database: Insert new order
    Database-->>-Order Controller: Order created
    Order Controller-->>-API: Return order confirmation
    API-->>Client: Return order confirmation

    Client->>+API: GET /api/orders
    API->>+Order Controller: getUserOrders()
    Order Controller->>+Database: Fetch user orders
    Database-->>-Order Controller: Return orders list
    Order Controller-->>-API: Return orders list
    API-->>Client: Return orders list

    Client->>+API: GET /api/orders/user/:id
    API->>+Order Controller: getOrderWithUserData(id)
    Order Controller->>+Database: Fetch order with user data
    Database-->>-Order Controller: Return order data
    Order Controller-->>-API: Return order data
    API-->>Client: Return order data

    Client->>+API: PUT /api/orders/paid/:id
    API->>+Order Controller: updateOrderToPaid(id)
    Order Controller->>+Database: Update order status to paid
    Database-->>-Order Controller: Order updated
    Order Controller-->>-API: Return success response
    API-->>Client: Return success message

    Admin->>+API: GET /api/orders/admin
    API->>+Order Controller: getAllOrdersAdmin()
    Order Controller->>+Database: Fetch all orders
    Database-->>-Order Controller: Return all orders
    Order Controller-->>-API: Return all orders
    API-->>Admin: Return all orders list

    Admin->>+API: PUT /api/orders/delivered/:id
    API->>+Order Controller: updateOrderToDelivered(id)
    Order Controller->>+Database: Update order status to delivered
    Database-->>-Order Controller: Order updated
    Order Controller-->>-API: Return success response
    API-->>Admin: Return success message

    Admin->>+API: GET /api/orders/analysis/:date
    API->>+Order Controller: getOrderForAnalysis(date)
    Order Controller->>+Database: Fetch order analysis
    Database-->>-Order Controller: Return analysis data
    Order Controller-->>-API: Return analysis data
    API-->>Admin: Return analysis data

    Admin->>+API: POST /api/categories
    API->>+Category Controller: newCategory()
    Category Controller->>+Database: Insert new category
    Database-->>-Category Controller: Category created
    Category Controller-->>-API: Return success response
    API-->>Admin: Return success message

    Admin->>+API: POST /api/categories/attr
    API->>+Category Controller: saveAttr()
    Category Controller->>+Database: Save category attribute
    Database-->>-Category Controller: Attribute saved
    Category Controller-->>-API: Return success response
    API-->>Admin: Return success message

    Admin->>+API: DELETE /api/categories/:category
    API->>+Category Controller: deleteCategory(category)
    Category Controller->>+Database: Delete category
    Database-->>-Category Controller: Category deleted
    Category Controller-->>-API: Return success response
    API-->>Admin: Return success message

    Admin->>+API: GET /api/users
    API->>+User Controller: getUsers()
    User Controller->>+Database: Fetch all users
    Database-->>-User Controller: Return users list
    User Controller-->>-API: Return users list
    API-->>Admin: Return users list

    Admin->>+API: GET /api/users/:id
    API->>+User Controller: getUserById(id)
    User Controller->>+Database: Fetch user by ID
    Database-->>-User Controller: Return user data
    User Controller-->>-API: Return user data
    API-->>Admin: Return user data

    Admin->>+API: PUT /api/users/:id
    API->>+User Controller: updateUserById(id)
    User Controller->>+Database: Update user data
    Database-->>-User Controller: User updated
    User Controller-->>-API: Return success response
    API-->>Admin: Return success message

    Admin->>+API: DELETE /api/users/:id
    API->>+User Controller: deleteUserById(id)
    User Controller->>+Database: Delete user
    Database-->>-User Controller: User deleted
    User Controller-->>-API: Return success response
    API-->>Admin: Return success message


```


