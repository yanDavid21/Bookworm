# Bookworm

## Repo Structure
### Backend  
- bin (has the command to start the server)
- build (the actual react files to serve in prod (don't edit, should be .gitignored))
- routes (holds individual routes for the server)
- server.js (main file that combines routes and includes modules)
### Frontend
- node_modules (external libraries installed from npm, don't edit, should be .gitignored)
- public (template files that React injects itself into)
- src (holds all react related files, edit here!)


## Dev flow

### Backend
- in the /backend folder
- make edits in /routes directory and server.js
- npm start

### Frontend 
- in the /frontend folder
- make edits in React App files
- npm start (to confirm change)  
