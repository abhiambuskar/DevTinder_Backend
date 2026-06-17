- Creating respository
- Use repository
- node_modules, package.json, package-lock.json
- create a server
- listen to port
- write request handler
- install nodemon update scritps


- Initialize git
- .gitignore
- create repo on git
- push code on git
- play with route and route extenstion
- Order of routes mattes a lot
- install a postman
- Write GET, POST , DELETE
- use regex
- use dynamic routes


- Mutiple router handlers
- next()
- write next function with different possiblities
- app.use("/route", rh1, rh2, [rh3, rh4], rh5)
- what is middleware
- how express handles the reqeust handler 
- difference between app.use and app.all
- write a dummy auth
- error handling use app.use(err, req, res, next)


- create a cluster on mongodb
- install mongoose
- connect application to Database using connection ur
- call connectDB function and remember connection to Database before starting the server
- create userSchema and userModel
- create signup API to add data to database
- push some documents from APIs
- do error handling

- difference between json and javascript object
- add express.json to the middleware
- make your signup API dynamic to receive data from end user
- Make an API for finding the user
- Make an API for feed
- User.findOne with duplicates email ids, which object is returned
- Create delete user API
- Explore mongoose documentation and methods
- What are options in findByudpdate
- API update wiht user and email id

- Explore schematypes
- use trim, minlenght, min, max,
- add default
- create a custom validate function for gender
- Improve DB schema put all the validations
- Add Timestamps
- Add API level validations on Patch request and signup post api
- Data sanitiziing - add API validation for each field
- Install validator
- Explore validator library
- Never trust req.body


- validate data in signup data
- install brcypt
- create password hash with brcypt and save the user with crypted password
- Create login API
- compare passowrds, validate API and throw errors

- install cookiepareser, 
- send dummy cookie to server send a response to 
- create a get /profile API  to get the cookie back 
- install jsonwebtoken
- in login API after the email and password vertification create a JWT token and sent it back to the user in cookies
- read the cookie from the response and get to know who is logged in


- write the userauth middleware
- add the userauth middleware in profile api and sendconnectionrequest API
- set the jwt token expiry token
- create userschmea method to getJWT() token
- create userschema method to validate the passwords






