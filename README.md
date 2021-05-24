# Dungeonwall (v0.5)
## Build DM screens or layout player info in a nice masonry-style grid.

**Demo**:
![Screenshot of Dungeonwall Video](https://emulrooney.github.io/images/project-Dungeonwall.png)


View at: [https://www.youtube.com/watch?v=fxwmahfIVFE](https://www.youtube.com/watch?v=fxwmahfIVFE)

### Running this Software

* Run the server from the dungeonwall directory with 'npm run start'
* Create a .env file -- see blank.env for format.
* Create a mongoDB instance and start it up. **Will be setting up a docker file to make this easier... eventually.**
* Run 'npm run sass' in the dungeonwall/frontend directory to make sure styles are up to date.
* Run the front-end from the dungeonwall/frontend directory with 'npm run start'
* Navigate to localhost:8080 to view the frontend. If everything went well, you should have the demo panels loaded.
* There's a seedDB file you can run with 'npm run seed' to create a new wall with panels. _You'll need to delete the wall if you need to reseed!_

### Next steps

* Docker to set up mongoDB.
* Adding some control over the wall itself (naming, color, etc)
* Add controls for multiple walls (including having multiple pages on a wall)
* Renameable panel types (esp to allow for other types of note pages)
* Reconsider spacing of panels - would be nice to have these align better.
* Clean up the sass files, split them up a bit
* Refactor to use Vuex **In Progress - still using bus for modals but maybe moving to vuex later.**
* Multiple users
* Better backend validation, authentication