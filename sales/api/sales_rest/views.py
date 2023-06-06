# from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import AutomobileVO, Salesperson, Sale, Customer
from .encoders import (
    AutomobileVOEncoder,
    SalespersonEncoder,
    SaleEncoder,
    CustomerEncoder
)


@require_http_methods("GET")
def api_list_automobileVOs(request):
    automobileVOs = AutomobileVO.objects.all()
    return JsonResponse(
        automobileVOs,
        encoder=AutomobileVOEncoder,
    )


@require_http_methods(["GET", "POST"])
def api_list_salespeople(request):
    if request.method == "GET":
        salespeople = Salesperson.objects.all()
        return JsonResponse(
            {"salespeople": salespeople},
            encoder=SalespersonEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            salesperson = Salesperson.objects.create(**content)
            return JsonResponse(
                salesperson,
                encoder=SalespersonEncoder,
                safe=False,
            )
        except Salesperson.DoesNotExist:
            return JsonResponse(
                {"message": "Could not create salesperson"},
                status=400,
            )


@require_http_methods(["DELETE"])
def api_delete_salesperson(request, pk):
    if request.method == "DELETE":
        count, _ = Salesperson.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        pass
