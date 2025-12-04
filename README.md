# InterestCalculatorAPI

A lightweight and developer-friendly REST API for performing financial calculations, including simple interest, compound interest, and currency conversion.
Built with Node.js + Express for fast and modular financial computations.

⸻

# Features
	•	Calculate Simple Interest
	•	Calculate Compound Interest
	•	Convert currencies (supports multiple base and target currencies)
	•	Easy to integrate into any backend, mobile app, or frontend project
	•	Fast and lightweight

⸻

# Tech Stack
	•	Node.js
	•	Express.js

⸻

# Installation

<u>Clone the repository</u>

git clone https://github.com/degenmyke/InterestCalculatorAPI.git

<u>Navigate into the project</u>

cd InterestCalculatorAPI

<u>Install dependencies</u>

npm install


⸻

# Run the Server

npm start

The API will start on:

http://localhost:3000

⸻

# Project Structure

InterestCalculatorAPI/
│── routes/
│   ├── simpleInterest.js
│   ├── compoundInterest.js
│   └── currencyConversion.js
│
│── docs/
│   └── (extended documentation, API details, examples)
│
│── index.js
│── package.json
│── README.md


⸻

# Testing the API

You can test endpoints using:
	•	Postman
	•	Insomnia
	•	Browser (for GET requests)
	•	Curl

Example:

curl "http://localhost:3000/simple-interest?principal=5000&rate=7&time=3"


⸻

# Contributing

Pull requests are welcome!
If you want to add new endpoints or improve financial calculations, feel free to open an issue.

⸻

License

This project is licensed under the MIT License.

⸻
