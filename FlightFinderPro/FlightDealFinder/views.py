from django.shortcuts import render
from django.views.generic import TemplateView


from .data_manager import DataManager
from .flight_search import FlightSearch
from .table_data import TableData

# Create your views here.

class HomePageView(TemplateView):
    
    template_name = "FlightDealFinder/home.html"
    
def main(request):
    #  1) Grab google sheet here
    dataManger = DataManager()

    # 2) Create flight finder

    destinationCodes = dataManger.getDestinationCodes()
    locationCodes = dataManger.getLocationCode()
    destinationPrices = dataManger.getDestinationPrice()

    flightSearch = FlightSearch(destinationCodes,locationCodes, destinationPrices)

    # 3) create the table
    tableData = TableData(flightSearch.getJson())
    tableData.populateLists()
    
    departures = tableData.getDepartures()
    departureTimes = tableData.getDepartureTimes()
    
    arrivals = tableData.getArrivals()
    arrivalTimes = tableData.getArrivalTimes() 
    
    currency = tableData.getCurrecy()
    prices = tableData.getGrandTotal()
    seats = tableData.getSeats()
    
    flights = zip(departures, departureTimes, arrivals, arrivalTimes, currency, prices, seats)
    context = {
        "flights":flights
    }
    
    return render(request, template_name="FlightDealFinder/main.html", context=context)
    
    
class TableView(TemplateView):
    
    template_name = "FlightDealFinder/table.html"