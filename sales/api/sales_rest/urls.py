from django.urls import path
from .views import (
    api_list_automobileVOs,
    api_list_salespeople,
    api_delete_salesperson,
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
        )
]