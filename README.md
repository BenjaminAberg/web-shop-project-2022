# Web Technologies 2022 - Webshop Project
#### Webshop by Benjamin Åberg - benjamin.aberg@abo.fi

<br />

The webshop runs on a Python-based backend (Django) with JavaScript frontend (React) as a single page application.

<br />

## <b>The following requirements have been implemented:</b>

#### Functional requirements

- Requirement 1: Site architecture (MANDATORY)
  - The landing page is accessible via http://127.0.0.1:8000 with instructions for entering the webshop.
  - The shop page is accessible via http://127.0.0.1:8000/shop.
  
- Requirement 2: Automatic DB population (MANDATORY)
  - The landing page allows the user to automatically populate the database with 6 users and 30 items.
  
- Requirement 3: Browse (MANDATORY)
    - The listings currently for sale are listed at /shop with information about:
      - Title
      - Description
      - Price
      - Date added
    - 10 items are shown to the user with every click of the "Load more" button at the bottom of the page.
    - The items are ordered by creation date.
    
- Requirement 4: Search (OPTIONAL)
  - Any user can search the webshop for listings by title by clicking the "Search" button.
  - The user can load more than 10 items by clicking the "Load more" button at the bottom of the page.
  
- Requirement 5: Create account (MANDATORY)
  - Users can create a new account via /signup by providing email, username and password.
  
- Requirement 6: Login (MANDATORY)
  - A registered user can login via /login by providing username and password.
  
- Requirement 7: Add item (MANDATORY)
  - A logged in user can create a new listing by going to /myitems and filling title, description and price into the "Create new listing" form on the page.
  - The date of creation is automatically saved on the backend.
  
- Requirement 8: Add to cart (MANDATORY)
  - A logged in user can add an item to the cart by clicking the "Add to cart" button on a listing.
  - If a user attempts to add their own listing to the cart, they are prompted with an alert message.
  - The user can see the contents of their cart by clicking the "View cart" button and the contents of the cart can be refreshed with the "Update cart" button.
  
- Requirement 9: Remove from cart (OPTIONAL)
  - An item can be removed from the cart by clicking the "x" button next to an item.
  
- Requirement 10: Pay (MANDATORY)
  - A logged in user can pay for the items by clicking the button "Make payment" in their cart.
  - If the price of any item in the cart is no longer the same as listed in the cart, the transaction is halted and a notification is shown to the user.
  - If any item in the cart is no longer available, the transaction is halted and a notification is shown to the user.
  - On successful transaction, the items become marked as SOLD and are no longer listed in the webshop.
  - On successful transaction, emails are sent to the buyers and sellers (output to the backend).
  
- Requirement 11: Routing (OPTIONAL)
  - The webshop works as a SPA with the following links available for navigation:
    - Shop: /shop
    - Signup: /signup
    - Login: /login
    - Logout: /logout
    - My items: /myitems
    - Search: /search
    
- Requirement 13: Display inventory (OPTIONAL)
  - A logged in user can view own items for sale, sold items and bought items at /myitems.
  
- Requirement 14: Edit item (OPTIONAL)
  - The seller of a listing can edit the price of the listing at /myitems. 
 
<br />

#### Non-functional requirements
  
- Requirement 15: Responsive (OPTIONAL)
  - The webshop is usable at both larger as well as smaller screen widths.
  
- Requirement 16: Security (OPTIONAL)
  - Only logged in users can buy and sell.
 
- Requirement 17: Usability (OPTIONAL)
  - The site is easy to navigate and use.
  
<br />
  
#### Technical requirements
  
- Requirement 18: Backend (MANDATORY)
  - The application uses Django for backend.
  - Django serves JS for the shop page and HTML for the landing page.
  - SQLite database.
  - Console backend for emails.
  
