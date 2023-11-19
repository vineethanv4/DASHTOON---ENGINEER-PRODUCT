DASHTOON ASSIGNMENT - ENGINEER,PRODUCT
VINEETH - 200101106 - IIT GUWAHATI

HOW TO RUN:
1. In the main type "node server.js" to start the backend server.
2. Go to client directory and type "npm start" to start the frontend server.
3. Now the website is ready and is accessible at http://localhost:3000/

Features implemented in the Comic Creator Web App:

Frontend:

1.Home page:
Implemented the Home page for the website.

2.Comic Creation Page:
A dedicated page for Comic Creation where users are asked to give username, comic name, required no of panels for input, input strings to generate the images from server.

Note: Also given a save  button to save the generated comic in the database.

3. Comic Blog Page:
A dedicated page to find and read all the comics. A list of all the available comics is displayed on the screen and users have to click on the comic name they want to read and the clicked comic will open on the new page.

4. Comic Display Page:
A dedicated page to read the selected comic.

Backend:
Database used: MONGODB - Please update your mongodb cluster link in server.js file if you want to test the backend features.

1.Fetching images from API:
Implemented function such that when the input strings by user are given to function it sends them to API.
Response data by API will be collected and all the images are transformed into base64 strings.
The base64 strings are sent to the frontend display page and rendered in the comic creation page.

2. Saving Images into Database:
When the user hits the Save Comic button in the comic creation page, all the base64 strings of all images are saved into the database along with the username, comic name.
	

3. Fetching the Comics from Database:
When the user selects the comic that the user wants to read from the Comic Blog page, we will fetch the requested Comic from the Database and show it to the user.

