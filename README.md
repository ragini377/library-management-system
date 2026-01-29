    
   ## library-management-system
   
 This is library-mamagement- system API backed for management of user and the books 

## routes and the endpoints 
# /Users
GET: Get all the list of users in the system 
Post : create /Register a new user 


## / user/{id}
Get : Get a User by their Id
Put : updating a user by their Id 
Delete : Deleting a user by their Id (check it the user still has an issued book)&& (is there any fine /penalty to be collected)

## /user/subscription-details/{Id}
Get : Get a user Subscribe details by their Id
>> date of subcription details by their Id
>> valid till
>> fine it any 


## /book 
Get :Get all the book in the system
Post:Add a new book new book to the system

## /book//{id}
Get : Get a book by its Id
Put : update a book by its Id
DELETE : Delete a book by its Id

## /book/issued 
Get : Get all the issued books

## /book /issued /with fine
Get : Get all issued books with their fine ammount

### Subcription types 
>> Basic (3 months )
>> Standard (6 months )
>> Premium (12 months )

> > if a user  missed his renewal dates then user should be colllected with $100 
if a user  missed his Subcription then user expected to pay $200        

> > if User miissed both renewval & SubCription ,then the collected amount should be $200

# # Commenads
npm init 
npm i nodemon -- save dev 
npm run dev 



