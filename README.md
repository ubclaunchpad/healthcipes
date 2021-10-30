<!-- PROJECT LOGO -->
<br />
<p align="center">
  <h3 align="center">Umami</h3>
</p>


<!-- TABLE OF CONTENTS -->
  <h2 style="display: inline-block">Table of Contents</h2>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#getting-started">Getting Started</a>
      <ul>
        <li><a href="#prerequisites">Prerequisites</a></li>
        <li><a href="#installation">Installation</a></li>
      </ul>
    </li>
    <li><a href="#deployment">Deployment</a></li>
    <li><a href="#contributing">Contributing</a></li>
  </ol>



<!-- ABOUT THE PROJECT -->
## About The Project

Umami has many recipes


### Built With

* React Native - Frontend
* FastAPI - Backend
* MySQL - Database
* Docker Compose - Build/Deployment
* Python - Scraping
* GCP Compute Engine - Hosting


<!-- GETTING STARTED -->
## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

* yarn
* docker
* docker-compose

### Installation
#### Docker Backend

1. `cd` into root folder
2. run `docker-compose -f docker-compose.dev.yml up --build -d`

Backend will be exposed on port 8080
MySQL will be exposed on port 3306

#### React Native Frontend

1. `cd` into umami/frontend
2. start server with `npx react-native start`
3. open a new cli window in the same folder

##### iOS:

4. `cd` into ios and run `pod install`
5. run `npx react-native run-ios`

##### Android: 

4. run `npx react-native run-android`

<!-- DEPLOYMENT -->
## Deployment

1. Clone repo to VM
2. run `docker-compose up --build -d`
3. run chmod +x init-letsencrypt.sh
4. run sudo ./init-letsencrypt.sh

## Further deployment changes 
Inide of Production machine
1. rm -rf ./data
2. sudo ./init-letsencrypt.sh
3. run `docker-compose up --build -d` 

<!-- CONTRIBUTING -->
## Contributing

Contributions are what make the community such an amazing place to be learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
