# ContactApp

This is a full stack PERN (PostgreSQL, Express.js, React.js, and Node.js) web app, inspired by [this](https://github.com/Yosolita1978/week11ContactApp) Techtonica project. Users can build a contact list by entering names, email addresses, phohe numbers, and notes into a form that saves this valuable information in a database. The contacts are listed in the app, and users can click the name of each contact entry get a detailed view. No longer want a contact in your list? Users have the option to delete each entry. The frontend of this app was built and styled with [Material-UI](https://mui.com/).

### How to run this project locally:

1. Clone the project.
2. Install dependencies by running `npm install` in the both `client` and `server` folders.
3. Create a database table in Postgres named `contacts` with columns for `contact_id`, `name`, `email`, `phone` and `notes`.
4. Configure your backend project environment variables by creating a `.env` file in the server folder and adding the following, replacing each <> with your own information:
   `LOCALHOST_DATABASE_URL=<Postgres database URL including the Postgres username, password, domain, port, and database name in the localhost environment.>`
   `DATABASE_USERNAME=<Database username>`
   `DATABASE_PASSWORD=<Your database password, if applicable. If none, leave blank.>`
   `DATABASE=<The name of your database, "contacts" or whatever you chose to name it.>`
   `DATABASE_PORT=<Port specific to the database.>`
   `PORT=<Port the server should listen on.>`
   `LOCALHOST_URL=<URL where the frontend is hosted for the CORS configuration, such as http://localhost:5173/>`

5.`cd` to both `client` and `server` folders (I recommend using a split screen in your terminal or opening two shell windows) and run `npm run dev` to start the server and launch the frontend in your browser.
