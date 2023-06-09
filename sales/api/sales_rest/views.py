import requests
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import (
    AutomobileVO,
    Salesperson,
    Sale,
    Customer,
)

from .encoders import (
    AutomobileVOEncoder,
    SalespersonEncoder,
    CustomerEncoder,
    SaleEncoder,
)


@require_http_methods("GET")
def api_list_automobileVOs(request):
    autoVOs = AutomobileVO.objects.all()
    return JsonResponse(
        {autoVOs: autoVOs},
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


@require_http_methods(["GET", "POST"])
def api_list_customers(request):
    if request.method == "GET":
        customers = Customer.objects.all()
        return JsonResponse(
            {"customers": customers},
            encoder=CustomerEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            customer = Customer.objects.create(**content)
            return JsonResponse(
                customer,
                encoder=CustomerEncoder,
                safe=False,
            )
        except Customer.DoesNotExist:
            return JsonResponse(
                {"message": "Could not create customer"},
                status=400,
            )


@require_http_methods(["DELETE"])
def api_delete_customer(request, pk):
    if request.method == "DELETE":
        count, _ = Customer.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
    else:
        pass


@require_http_methods(["GET", "POST"])
def api_list_sales(request):
    if request.method == "GET":
        sales = Sale.objects.all()
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder
        )

    if request.method == "POST":
        content = json.loads(request.body)
        try:
            salesperson_id = content["salesperson"]
            salesperson = Salesperson.objects.get(id=salesperson_id)
            content["salesperson"] = salesperson
        except Salesperson.DoesNotExist:
            return JsonResponse({"message": "Invalid Salesperson"})

        try:
            customer_id = content["customer"]
            customer = Customer.objects.get(id=customer_id)
            content["customer"] = customer
        except Customer.DoesNotExist:
            return JsonResponse({"message": "Invalid Customer"})

        try:
            auto_vin = content["automobile"]
            auto = AutomobileVO.objects.get(vin=auto_vin)
            setattr(auto, "sold", True)
            auto.save()
            content["automobile"] = auto
        except AutomobileVO.DoesNotExist:
            return JsonResponse({"message": "Invalid Auto"})

        sale = Sale.objects.create(**content)
        requests.put(
            f"http://inventory-api:8000/api/automobiles/{auto_vin}/",
            data=json.dumps(
                {"sold": "True"}
            ))

        return JsonResponse(
            sale,
            encoder=SaleEncoder,
            safe=False
        )


@require_http_methods(["GET"])
def api_salesperson_history(request, pk):
    if request.method == "GET":
        salesperson = Salesperson.objects.get(id=pk)
        sales = Sale.objects.filter(salesperson=salesperson)
        return JsonResponse(
            {"sales": sales},
            encoder=SaleEncoder
        )
