# RoverPass Frontend

RoverPass Frontend project where users can search and save a favorite campgrounds. It is build in React + Vite with Typescript and pure CSS.

## **Table of Contents**

- [Design](#design)
- [Architecture Overview](#architecture-overview)
- [Prerequisites](#prerequisites)
- [Configuration and Setup](#configuration-and-setup)

---

## **Design**

- The design is inspired in roverpass.com and following the brand guide
- Design URL:
   [Figma URL](https://www.figma.com/design/LxpmDarwa9ZMpQDinRLfpK/RoverPass?node-id=0-1&t=PGDViEcsXF88GiSc-1)

## **Architecture Overview**

The folder has a modular structure, all depends of the page and feature.

### **Directory Structure**
  - **assets:** Contains all media files.
  - **componentes:** Contains all the React components, these components can be reused.
  - **context:** Includes React context and providers. 
  - **hooks:** Contains all the custom hooks. These files handle REST API calls.
  - **interceptor:** Interceptor for axios petitions, helps to add and update token in all the http requests.
  - **interfaces:** Contains all interface files.
  - **layouts:** Includes files that provide a container layout for pages with a header component.
  - **pages:** Includes React components that has a route.
  - **routes:** Files that manage public and private routes.
  - **styles:** Contains .css files separated by pages and logical components.
  - **test:** Contains testing files.
  - **utils:** Files that provides reusable functions.

## **Prerequisites**
  - **NODE version:** v22.11.0

## **Configuration and Setup**

  1. **Clone the Repository**

   ```bash
   git clone https://github.com/pmartinez-blubear/roverpass-frontend.git
   cd roverpass-frontend
   ```

  2. **Install Dependencies**

   ```bash
    npm install
   ``` 

  3. **Configure .env file**

   ```bash
   VITE_API_URL=
   ```

  4. **Start React App**

   ```bash
    npm run dev
   ```

   Access devepment URL: `http://localhost:5173`.

  4. **Test Run**

   ```bash
    npm run test
   ```

   4. **User login for test**

   ```bash
    email: two@example.com
    password: password
   ```

## Video
Link video showing website
[Vimeo URL:](https://vimeo.com/1044193614)
