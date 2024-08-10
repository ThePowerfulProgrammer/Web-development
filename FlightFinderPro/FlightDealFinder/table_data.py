

class TableData():
    
    def __init__(self, json:dict):
        
        self.json_responses = json
        self.departures = []
        self.departureTimes = []
        self.arrivals = []
        self.arrivalTimes = []
        self.currency = []
        self.grandTotals = []
        self.oneWays = []
        self.bookableSeats = []
        self.carrierCodes = []
        
    def populateLists(self):
        for json in self.json_responses:
            for i in range(json['meta']['count']):
                
                self.departures.append(json['data'][i]['itineraries'][0]['segments'][0]['departure']['iataCode'])
                self.departureTimes.append(json['data'][i]['itineraries'][0]['segments'][0]['departure']['at'])
                self.arrivals.append(json['data'][i]['itineraries'][0]['segments'][0]['arrival']['iataCode'])
                self.arrivalTimes.append(json['data'][i]['itineraries'][0]['segments'][0]['arrival']['at'])
                
                self.currency.append(json['data'][i]['price']['currency'])
                self.grandTotals.append(json['data'][i]['price']['grandTotal'])
                self.bookableSeats.append(json['data'][i]['numberOfBookableSeats'])
                
                
                
                
    
    def getDepartures(self):
        return self.departures
    
    def getDepartureTimes(self):
        return self.departureTimes
    
    def getArrivals(self):
        return self.arrivals
    
    def getArrivalTimes(self):
        return self.arrivalTimes
    
    def getCurrecy(self):
        return self.currency
    
    def getGrandTotal(self):
        return self.grandTotals
    
    def getSeats(self):
        return self.bookableSeats
    
    def getData(self):
        return {
            "Departures": self.departures,
            "DepartureTimes": self.departureTimes,
            "Arrivals": self.arrivals,
            "ArrivalTimes": self.arrivalTimes
        }