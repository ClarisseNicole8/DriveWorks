from django.urls import path
from .views import (
    api_list_automobileVOs,
    api_list_salespeople,
    api_delete_salesperson,
    api_list_customers,
    api_delete_customer,
    api_list_sales,
)


urlpatterns = [
    path(
        "salespeople/",
        api_list_salespeople,
        name="api_list_salespeople"
        ),
    path(
        "automobilevos/",
        api_list_automobileVOs,
        name="api_list_automobileVOs"
        ),

    path(
        "salespeople/<int:pk>/",
        api_delete_salesperson,
        name="api_delete_salesperson",
        ),

    path(
        "customers/",
        api_list_customers,
        name="api_list_customers",
    ),

    path(
        "customers/<int:pk>/",
        api_delete_customer,
        name="api_delete_customer",
    ),

    path(
        "sales/",
        api_list_sales,
        name="api_list_sales",
    ),


]
