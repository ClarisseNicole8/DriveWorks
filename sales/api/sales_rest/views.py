from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
from common.json import ModelEncoder
import json
from .models import AutomobileVO, Salesperson, Sale, Customer
from .encoders import AutomobileVOEncoder, SalespersonEncoder, SaleEncoder, CustomerEncoder


@require_http_methods("GET")
def api_list_automobileVOs(request):
