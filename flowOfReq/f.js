// Flow of Request-Response:

// Client (Postman): Sends an HTTP request (e.g., POST /users) with data in the body (e.g., user details).
// Express (Server): Receives the request, parses the body, and runs business logic (e.g., save data to MongoDB).
// MongoDB (Database): Stores the data and returns a confirmation to the server.
// Express (Server): Sends an HTTP response back to the client (e.g., success message, status code).
// Client (Postman): Receives the response and displays the output.




//how authentication works during signup:
//1. User submit details i.g email, pass and other things for signUp.
//2. Backend first validates or check that given email or pass are correct.
//3. Then passWord hashing came into the game:
//     =>Insted of using plain text-password backend uses libraries such as bcrypt to add some random string or salt to the plain password.
//     =>User's pass: Admin123,
//     =>Adding salt: Salt + Pass,
//     =>Hashing pass: hash(salt,pass);
//** only the hash and salt values are stored in database(Plain-textPassword never stored in db);




//How cookies interact with client and server:
// The user sends sign-in credentials to the server, for example via a form submission.
// If the credentials are correct, the server updates the UI to indicate that the user is signed in, and responds with a cookie containing a session ID that records their sign-in status on the browser.
// At a later time, the user moves to a different page on the same site. The browser sends the cookie containing the session ID along with the corresponding request to indicate that it still thinks the user is signed in.
// The server checks the session ID and, if it is still valid, sends the user a personalized version of the new page. If it is not valid, the session ID is deleted and the user is shown a generic version of the page (or perhaps shown an "access denied" message and asked to sign in again)
//https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies/cookie-basic-example.png 





// The Request-Response Cycle or middleware:

// To appreciate the role of middleware, let’s briefly outline the request-response cycle in backend development:

// Client Sends Request: A client (e.g., a web browser or a mobile app) sends an HTTP request to a backend server.
// 2. Middleware Processing: The request enters the server, and middleware functions can intercept it. These functions may parse the request, authenticate the user, or perform other tasks as needed.

// 3. Core Application Logic: After middleware processing, the request reaches the core application logic, where the primary tasks of the application are executed. This could involve querying databases, performing calculations, or generating responses.

// 4. Middleware for the Response: Once the core logic is complete, middleware functions can again come into play to process the response. This might include adding headers, logging, or other operations.

// 5. Server Sends Response: The server sends the response back to the client, which interprets it and displays the result to the user.


//Why Use Cookie-Parser?
//The cookie-parser is a middleware in Node.js that helps parse cookies attached to the client requests. It simplifies the handling of cookies by extracting them from the request header and making them available in the req.cookies object.
// When clients send HTTP requests to your server, they often include cookies in the Cookie header. Parsing these manually can be tedious, so cookie-parser automates this process and presents the cookies in a more developer-friendly way.