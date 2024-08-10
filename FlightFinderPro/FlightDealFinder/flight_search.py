import requests

amadeus_app_name = "Flight_Deal_Finder"
amadeus_endpoint = "https://test.api.amadeus.com/v2"
amadeus_api_key = "DBicg14VKttT9G9fTDr4C0dH3oS6TIim"
amadeus_api_secret = "L3bVf0IYAGGo8ecS"
amadeus_access_token = ""




class FlightSearch:
    # This class is responsible for talking to the Flight Search API.
    
    def __init__(self, destinationCode, locationCode, destinationPrice):
        self.destinationCode = destinationCode
        self.locationCode = locationCode
        self.destinationPrice = destinationPrice
       
        self.params = {
            "grant_type": "client_credentials",
            "client_id": amadeus_api_key,
            "client_secret": amadeus_api_secret
        }

        self.header = {
            "content-type": "application/x-www-form-urlencoded"
        }
        
        self.response = requests.post(url="https://test.api.amadeus.com/v1/security/oauth2/token", data=self.params, headers=self.header)
        self.amadeus_access_token = self.response.json()['access_token']
        
        self.flight_finder_headers = {
            "authorization": f"Bearer {self.amadeus_access_token}"
        }
        
        self.flight_finder_parameters = self.createFlightFinderParams()
        
        self.json_responses = []
        self.search_flights()

    def createFlightFinderParams(self):
        parameters = []
        for i in range(len(self.destinationCode)):
            flight_params = {
                "originLocationCode": self.locationCode[i],
                "destinationLocationCode": self.destinationCode[i],
                "departureDate": "2024-08-20",
                "adults": 1,
                "currencyCode": "ZAR",
                "maxPrice": self.destinationPrice[i]
            }
            parameters.append(flight_params)
        return parameters
    
    def search_flights(self):
        for params in self.flight_finder_parameters:
            response = requests.get(
                url="https://test.api.amadeus.com/v2/shopping/flight-offers",
                params=params,
                headers=self.flight_finder_headers
            )
            if response.status_code == 200:
                self.json_responses.append(response.json())
            else:
                raise Exception(f"Failed to get flight offers: {response.status_code}")
    
    def getJson(self):
        return self.json_responses
    