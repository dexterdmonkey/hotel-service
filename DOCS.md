## API Documentation

### Endpoints

#### Create a New Hotel

- **URL**: `/v1/hotel`
- **Method**: `POST`
- **Body**:
  ```json
  {
    "name": "Hotel Name",
    "city": "City Name",
    "price": 100,
    "date": "2023-06-20",
    "slug": "hotel-name-slug"
  }
  ```
- **Success Response**:
  - **Code**: `201 CREATED`
  - **Content**: The created hotel object

#### Update an Existing Hotel

- **URL**: `/v1/hotel/:id`
- **Method**: `PUT`
- **Body**: Fields to update (e.g., `{ "price": 150 }`)
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: The updated hotel object

#### Delete a Hotel

- **URL**: `/v1/hotel/:id`
- **Method**: `DELETE`
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: `{ "message": "Hotel deleted" }`

#### Get a Hotel by ID or Slug

- **URL**: `/v1/hotel/:identifier`
- **Method**: `GET`
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**: The hotel object

#### Get All Hotels with Filters

- **URL**: `/v1/hotel`
- **Method**: `GET`
- **Query Parameters**:
  - `name` (optional): Part of the hotel name to match
  - `city` (optional): Exact city name
  - `price` (optional): Price range, e.g., `100:500`
  - `date` (optional): Date range, e.g., `2023-06-20:2023-06-25`
  - `sort_field` (optional): Field name to sort by
  - `sort_order` (optional): Sort order, `asc` or `desc`
- **Success Response**:
  - **Code**: `200 OK`
  - **Content**:
    ```json
    {
      "hotels": [
        /* Array of hotel objects */
      ]
    }
    ```
