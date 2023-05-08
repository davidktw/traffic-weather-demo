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
pushd frontend
npm ci
npm run build
popd 
pushd backend
npm ci
npm run build
npm run start:prod
popd 
```

# Access the react application (frontend)
Open browser to `http://localhost:3000`
