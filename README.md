# The Online Movie Catalog - progetto di Applicazioni Web e Cloud
Project for the University Bachelor Degree Course of Web e Cloud Application (A.A. 2020-2021)

The project aims to develop the web application The Online Movie Catalog which implements an online movie catalog management and ordering site. The Online Movie Catalog manages the process of organizing movie schedules from multiple online stores and ordering movies within an online videostreaming portal. It is composed of two main macro-scenarios:

• management of the schedule

• order management

There are two types of users: shopkeeper and customer.

### WEBSITE REQUIREMENTS

The first macro-scenario (schedule management) consists of managing films from catalog publication to sale. Merchant users must be able to connect to the application, modify their data/preferences and unsubscribe. For each shopkeeper, information such as shop name, telephone number, VAT number, addresses, reviews, etc. must be managed. Once registered, a shopkeeper can connect to the application and insert the products for sale by selecting them from a list common to all shopkeepers. This list is acquired via The Movie DB portal (https://www.themoviedb.org/ via API access with the REST methodology). For each product (film) on sale, the main information must be managed such as title, actors, director, genre and year of publication, furthermore there must be an illustrative photo (poster) whose reference can always be found via API. A seller can subsequently connect to the application and modify/delete existing products for which he is responsible.

The second scenario (order management) consists of the classic management of customer activities within an online ordering application. Customers must be able to register, modify their data/preferences and unsubscribe. For each user, personal information (e.g., first name, last name) and information relating to the generated account must be stored. Information regarding the payment mechanism for the products (e.g. credit card or prepaid card) is also associated with the customer. Furthermore, during the registration phase, users can select preferences (including privacy and registration preferences relating to the application) to personalize the services (e.g. special offers on the noticeboard for the type of preferred genre). In this scenario, registered users can log in to the site, select a film of interest, add it to the cart and complete the payment for the films in the cart.

When paying for the order the user can decide between two methods:

•  perpetual purchase: the acquired film will always be available among the films available for viewing by the customer.

•  rental: the film paid by the customer will be available in the film visible by the customer only for 72 hours from the day of purchase; subsequently, it will remain in the list but will be marked as unavailable for viewing.
