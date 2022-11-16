# Jamming - my React web app 

This project is a React single page application (SPA) which allows a user to search for tracks from Spotify, make a playlist with a name and save it to their Spotify account. This uses the Spotify API and is hosted by Surge at www.jammingwithcavey.surge.sh 

## Codecademy project:

This project is part of the Codecademy programming course, specifically front-end web development / React module. 

There's a walkthrough video of a Codecademy developer building this project. Some is different but the concept and some of the code is a copy. 



### Why have I done this project?

This is my first React application project. It brings together learnings of text editors, Node and NPM, Git and version control, React components / JSX syntax, API and asynchronous javascript and SPA web hosting by Surge. 

This represents practice and consolidation of learning, and is a demonstration of the skill sets necessary. 

### Does this application work if I clone it?

No. You will need to log in to a Spotify account and obtain a client ID by declaring a project that involves their API. When you have this you will need to edit the source code found in the myfirstreactapp/src/util/Spotify/Spotify.js file, line 3. Replace the fact client ID with your ID. I have provided a note above this line to reiterate this. 

You will also need to change the the redirectUri location found on the 4th line of the same Spotify.js file. This needs to be set to your file's local serving address. 

### Where are the codecademy resources you used? 

This is the youtube walkthrough video of the project, recorded and published by Codecademy: https://www.youtube.com/watch?v=DH991Dzb9iE

This is the codecademy course which includes the module's step by step guide: https://www.codecademy.com/learn/paths/front-end-engineer-career-path

Happy Hacking! 