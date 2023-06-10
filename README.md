# CarCar

## Team:

* Cindy Lam - Automobile Service
* Clarisse Alvarez - Automobile Sales

## How to Run this App
To get started, you will need Docker, GitLab, and Node.js installed.
Fork and clone the repository to your local device.
Run the following commands to build and run the project using Docker:

docker volume create beta-data
docker-compose build
docker-compose up

You may see a warning about an environment variable "OS" being missing if running this on a Mac. You can safely ignore this.

Make sure that all Docker containers are running and open a browser to http://localhost:3000/

**Diagram**

[Link to diagram](https://excalidraw.com/#json=KOlVnXr-hio_isSvlXBrv,SRefxhKvPWfbYjN6WTmxiw)

## Design
There are 3 microservices that interact with each other:
Inventory
Sales
Services

## API Documentation

**URLs and Ports**
Inventory: http://localhost:8100/
Sales: http://localhost:8090/
Services: http://localhost:8080/

**Inventory API**
The endpoints to send and view data for the Inventory are accessible through Insomnia.

**Manufacturers**

| Create a manufacturer | POST | http://localhost:8100/api/manufacturers/ |
Create a manufacturer(SEND JSON BODY)
:
```
{
  "name": "GMC"
}
```
Return Value upon successful creation:
```
{
	"href": "/api/manufacturers/3/",
	"id": 3,
	"name": "GMC"
}
```
| List manufacturers | GET | http://localhost:8100/api/manufacturers/
| Get a specific manufacturer | GET | http://localhost:8100/api/manufacturers/id/
| Update a specific manufacturer | PUT | http://localhost:8100/api/manufacturers/id/
| Delete a specific manufacturer | DELETE | http://localhost:8100/api/manufacturers/id/

**Vehicle Models**
| Create a vehicle model | POST | http://localhost:8100/api/models/
Create a vehicle(SEND JSON BODY)
```
{
  "name": "Forester",
  "picture_url": "https://pictures.dealer.com/g/granitesubarusne/0738/f8dfd863f8b2a8852114a26671daf392x.jpg?impolicy=downsize&w=568",
  "manufacturer_id": 1
}
```
Return Value upon successful creation:
```
{
	"href": "/api/models/1/",
	"id": 1,
	"name": "Forester",
	"picture_url": "https://pictures.dealer.com/g/granitesubarusne/0738/f8dfd863f8b2a8852114a26671daf392x.jpg?impolicy=downsize&w=568",
	"manufacturer": {
		"href": "/api/manufacturers/1/",
		"id": 1,
		"name": "Subaru"
	}
}
```
| List vehicle models | GET | http://localhost:8100/api/models/
| Get a specific vehicle model | GET | http://localhost:8100/api/models/id/
| Update a specific vehicle model | PUT | http://localhost:8100/api/models/id/
| Delete a specific vehicle model | DELETE | http://localhost:8100/api/models/id/

**Automobiles**
| Create an automobile | POST | http://localhost:8100/api/automobiles/
Create an automobile(SEND JSON BODY)
```
{
  "color": "black",
  "year": 2022,
  "vin": "1C3CC5FB2AN120192",
  "model_id": 1
}
```
Return Value upon successful creation:
```
{
	"href": "/api/automobiles/1C3CC5FB2AN120192/",
	"id": 9,
	"color": "black",
	"year": 2022,
	"vin": "1C3CC5FB2AN120192",
	"model": {
		"href": "/api/models/1/",
		"id": 1,
		"name": "Forester",
		"picture_url": "https://pictures.dealer.com/g/granitesubarusne/0738/f8dfd863f8b2a8852114a26671daf392x.jpg?impolicy=downsize&w=568",
		"manufacturer": {
			"href": "/api/manufacturers/1/",
			"id": 1,
			"name": "Subaru"
		}
	},
	"sold": false
}
```
| List automobiles | GET | http://localhost:8100/api/automobiles/
| Get a specific automobile | GET | http://localhost:8100/api/automobiles/vin/
| Update a specific automobile | PUT | http://localhost:8100/api/automobiles/vin/
| Delete a specific automobile | DELETE | http://localhost:8100/api/automobiles/vin/


## **Service microservice**

The Service microservice has the following models:
- Technician
	- first_name
	- last_name
	- employee_id
- AutomobileVO
	- vin
	- sold
- Appointment
	- date
	- time
	- reason
	- status
	- vin
	- customer
	- technician (ForeignKey)
	- vip

**Technicians**
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List technicians | GET | http://localhost:8080/api/technicians/
| Create a technician | POST | http://localhost:8080/api/technicians/
| Delete a technician | DELETE | http://localhost:8080/api/technicians/:id/

Accessing Endpoints:

<details>
<summary> List technicians (GET) </summary>

1. Follow endpoint: http://localhost:8080/api/technicians/

2. No need to provide data because this is a GET request. A list of all technicians will be shown.

	Example:
```json
		{
			"href": "/api/technicians/2/",
			"id": 2,
			"first_name": "Lolly",
			"last_name": "Pop",
			"employee_id": "Pink"
		},
```
</details>

<details>
<summary> Create a technician (POST) </summary>

1. Create a technician by using the following format:

	Example:
```json
		{
			"first_name": "Kit",
			"last_name": "Kat",
			"employee_id": "PB"
		}
```
2. Then submit it as a POST request.
3. This will be the response of that request:
```json
		{
			"href": "/api/technicians/5/",
			"id": 5,
			"first_name": "Kit",
			"last_name": "Kat",
			"employee_id": "PB"
		}
```
</details>

<details>
<summary> Delete a technician (DELETE) </summary>

1. Follow endpoint: http://localhost:8080/api/technicians/:id/. Make sure to put the id of the specific technician in place of ":id".

2. Sending the DELETE request will will show this kind of response:

	Example:
```json
		{
			"deleted": true
		}
```
</details>


**Appointments**
| Action | Method | URL
| ----------- | ----------- | ----------- |
| List service appointments | GET | http://localhost:8080/api/appointments/
| Create service appointment | POST | http://localhost:8080/api/appointments/
| Delete service appointment | DELETE | http://localhost:8080/api/appointments/:id/
| Finish service appointment | PUT | http://localhost:8080/api/appointments/:id/finish/
| Cancel service appointment | PUT | http://localhost:8080/api/appointments/:id/cancel/

Accessing Endpoints:

<details>
<summary> List appointments (GET) </summary>

1. Follow endpoint: http://localhost:8080/api/technicians/:id/. Make sure to put the id of the specific technician in place of ":id".

2. Sending the DELETE request will will show this kind of response:

	Example:
```json
		{
			"deleted": true
		}
```
</details>

## **Sales microservice**

The Sales microservice has the following models:
AutomobileVO,
Salesperson,
Customer,
Sales
The Sales model works with the other three models. The poller works with the AutomobileVO value object and automatically polls the inventory every 60 seconds to return updated data to the sales microservice. When creating a sale you can choose which car is in the inventory that is to be sold and has not yet been sold.

The endpoints to send and view data are accessible through Insomnia.

**Salespeople**

Create or List Salespeople at http://localhost:8090/api/salespeople/ using POST and GET API endpoints. Delete a specific Salesperson at http://localhost:8090/api/salespeople/id/ replacing the id with the specific Salesperson id using DELETE API endpoint. The GET and DELETE endpoints do not require a body however the POST request does require a JSON body.

| Create a salesperson | POST | http://localhost:8090/api/salespeople/ |

The first step is to create a Salesperson. After creating a new HTTP request, choose the POST option from the dropdown, enter the following url: http://localhost:8090/api/salespeople/ in the url field, select JSON from the body dropdown field and enter the JSON body below into the empty field. Send the request using the SEND button next to the URL field and the new Salesperson will be created.

Create a salesperson(SEND JSON BODY):
```
{
"first_name": "Bob",
"last_name": "Jones",
"employee_id": "111"
}
```
Return Value upon successful creation of salesperson:
```
{
	"first_name": "Bob",
	"last_name": "Jones",
	"employee_id": "111",
	"id": 6
}
```
| List salespeople | GET | http://localhost:8090/api/salespeople/ |

After creating a Salesperson, there will be data to produce when listing Salespeople. The GET request does not require a body. Create a new HTTP request and choose GET from the dropdown options. Enter http://localhost:8090/api/salespeople/ in the URL field and hit SEND. A list of Salespeople will populate in the Preview Field.

| Delete a salesperson | DELETE | http://localhost:8090/api/salesperson/id/ |

To delete a Salesperson create a new HTTP request and choose DELETE from the dropdown. Enter http://localhost:8090/api/salespeople/id/ in the URL field. Replace the id at the end of the URL with the Salesperson id whom you wish to delete.

**Customers**

Create or List Customers at http://localhost:8090/api/customers/ using POST and GET API endpoints. Delete a specific Customer at http://localhost:8090/api/Customers/id/ replacing the id with the specific Customer id using DELETE API endpoint. The GET and DELETE endpoints do not require a body however the POST request does require a JSON body.

| Create a customer | POST | http://localhost:8090/api/customers/ |

The first step is to create a Customer. After creating a new HTTP request, choose the POST option from the dropdown, enter the following url: http://localhost:8090/api/customers/ in the url field, select JSON from the body dropdown field and enter the JSON body below into the empty field. Send the request using the SEND button next to the URL field and the new Customer will be created.

Create a customer(SEND JSON BODY):
```
{
	"first_name": "John",
	"last_name": "Jones",
	"address": "1234 Cooler Street",
	"phone_number": "555555555"
}
```
Return Value upon successful creation of customer:
```
{
	"first_name": "John",
	"last_name": "Jones",
	"address": "1234 Cooler Street",
	"phone_number": "555555555",
	"id": 6
}
```
| List Customers | GET | http://localhost:8090/api/customers/ |

After creating a Customer, there will be data to produce when listing Customers. The GET request does not require a body. Create a new HTTP request and choose GET from the dropdown options. Enter http://localhost:8090/api/customers/ in the URL field and hit SEND. A list of Customers will populate in the Preview Field.

| Delete a Customer | DELETE | http://localhost:8090/api/customer/id/ |

To delete a Customer create a new HTTP request and choose DELETE from the dropdown. Enter http://localhost:8090/api/customers/id/ in the URL field. Replace the id at the end of the URL with the Customer id whom you wish to delete.

**Sales**

Create or List Sales at http://localhost:8080/Sales/ using POST and GET API endpoints. Delete a specific Sale at http://localhost:8080/api/Sales/id/ replacing the id with the specific Sale id using the DELETE API endpoint. The GET and DELETE endpoints do not require a body however the POST request deos require a JSON body.

| List all sales | POST | http://localhost:8090/api/sales/ |

The first step is to create an Sale. After creating a new HTTP request, choose the POST option from the dropdown, enter the following url: http://localhost:8080/sales/ and enter the JSON body below into the empty field. Send the request using the SEND button next to the URL field and the new Sale will be created.
The following is an example of the JSON body to be included with a POST request:
```
{
  "salesperson": "5",
	"customer":"5",
	"automobile": "1C3CC5FB2AN120189",
	"price": "100"

}
```
Return Value upon successful creation of sale:
```
{
	"price": "100",
	"automobile": {
		"vin": "1C3CC5FB2AN120189",
		"sold": true
	},
	"salesperson": {
		"first_name": "John",
		"last_name": "Jones",
		"employee_id": 888,
		"id": 5
	},
	"customer": {
		"first_name": "Race",
		"last_name": "Whisenand",
		"address": "1234 Cooler Street",
		"phone_number": "555555555",
		"id": 5
	},
	"id": 21
}
```
| List all sales | POST | http://localhost:8090/api/sales/ |

After creating an Sale, there will be data to produce when listing Sales. The GET request does not require a body. Create a new HTTP request and choose GET from the dropdown options. Enter http://localhost:8080/api/sales/ in the URL field and hit SEND. A list of Sales will populate in the Preview Field.

| Delete a sale | DELETE | http://localhost:8090/api/sales/id/ |
To delete an Sale create a new HTTP request and choose DELETE from the dropdown. Enter http://localhost:8080/api/sales/id/ in the URL field. Replace the id at the end of the URL with the Sale id of the Sale you wish to delete.
