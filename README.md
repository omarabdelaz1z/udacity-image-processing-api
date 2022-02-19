# Udacity Image Processing API 

### npm-run Scripts

- `eslint`: `npm run lint`
- `prettier`: `npm run format`
- `development`: `npm run dev`
- `test`: `npm run test`
- `production`: `npm run start`
- `build`: `npm run build`

### Project Structure and Project Tree

Some Description of the folders:
- `assets`: Images to be processed by the API
- `spec`: Jasmine Configuration
- `controllers`: API Handlers
- `routes`: API Routers

```
+---assets
|   \---images
|       \---full
+---spec
|   \---support    
\---src
    |   index.ts
    |
    +---controllers    
    +---middleware
    +---routes
    |   \---api
    |           
    +---tests         
    \---utils
        |   
        \---log
  ```
  
  ### API Endpoint
  Endpoint: `/api/images/:image?width=?&height=?`
  - `:image`: filename supported with the extension.
  - `width`: width to which of the image resized.
  - `height`: height to which of the image resized.
