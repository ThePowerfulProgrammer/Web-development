from django.urls import path
from .import views


app_name = "FlightDealFinder"

urlpatterns = [
    path("", views.HomePageView.as_view(), name="home"),
    path("main", views.main, name="main"),
    path("table", views.TableView.as_view(), name="table"),
]
