# traffic-weather-demo
Traffic Weather Demonstration

# Checkout the codes
```
git clone https://github.com/davidktw/traffic-weather-demo.git
```

# Install the node modules and build the frontend and backend
```
cd frontend
npm ci
npm run build
cd ..
cd backend
npm ci
npm run build
npm run start:prod
```

# Check
Ensure that the `backend/public` folder is symbolic linked to `frontend/build` directory.
To do so, run
```
cd backend
ln -s ../frontend/build public
```

# Access the react application (frontend)
Open browser to `http://localhost:3000`
