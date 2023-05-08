# traffic-weather-demo
Traffic Weather Demonstration

# Checkout the codes
```
git clone https://github.com/davidktw/traffic-weather-demo.git
```

# Check
Ensure that the `backend/public` folder is symbolic linked to `frontend/build` directory.
To do so, run
```
cd backend
ln -s ../frontend/build public
```

# Install the node modules and build the frontend and backend and run
```
cd traffic-weather-demo
./buildrun.sh
```

# Access the react application (frontend)
Open browser to `http://localhost:3000`


# Note
Backend is running `nestjs` mainly to serve the frontend react application.
There is no backend codes at the moment as the frontend is more than
capable to handle the current application requirements.

# Usage
After loading the application, the current date time will be prepopulated.
Select any of the cameras found from the dropdown list to view the camera view.
Using keystrokes, one may cycle through the time or date or months or even 
# Usage
After loading the application, the current date time will be prepopulated.
Select any of the cameras found from the dropdown list to view the camera view.
Using keystrokes(up/down), one may cycle through the time or date or months or even years fields to see time lapsed captured views from the selected camera.
