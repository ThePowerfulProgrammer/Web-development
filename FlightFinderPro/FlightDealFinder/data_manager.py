import requests

class DataManager:
    #This class is responsible for talking to the Google Sheet.
    
    def __init__(self) -> None:
        self.url = "https://api.sheety.co/a51ec32c3d55dea8bc8eb9b96bcf0953/flightDeals/sheet1"
        
        self.FLRJ = []
        self.locationCode = []
        self.destinationCities = []
        self.destinationCode = []
        self.destinationPrice = []
    
        self.getGoogleSheetData()
        self.populateLists()
        
        
    def getGoogleSheetData(self):
        response = requests.get(url=self.url)
        response.raise_for_status()
        
        self.FLRJ = response.json()
        
    def populateLists(self):
        for i in range(len(self.FLRJ['sheet1'])):
            self.locationCode.append(self.FLRJ['sheet1'][i]['origin'] )
            self.destinationCities.append(self.FLRJ['sheet1'][i]['city'])
            self.destinationCode.append(self.FLRJ['sheet1'][i]['iataCode'])
            self.destinationPrice.append(self.FLRJ['sheet1'][i]['lowestPrice'])        
            
    def getLocationCode(self):
        return self.locationCode
    
    def getDestinationCities(self):
        return self.destinationCities
    
    def getDestinationCodes(self):
        return self.destinationCode
    
    def getDestinationPrice(self):
        return self.destinationPrice
    
    def printData(self):
        print(self.getLocationCode())
        print(self.getDestinationPrice())
        print(self.getDestinationCities())
        print(self.getDestinationCodes())
        return ""
    
    

    
    
        

    