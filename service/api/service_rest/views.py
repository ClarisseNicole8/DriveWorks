from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json

from common.json import ModelEncoder
from .models import AutomobileVO, Appointment, Technician


class AutomobileVOEncoder(ModelEncoder):
    model = AutomobileVO
    properties = [
        "vin",
        "sold",
        "color",
        "year",
        "id"
    ]


class TechnicianEncoder(ModelEncoder):
    model = Technician
    properties = [
        "id",
        "first_name",
        "last_name",
        "employee_id"
    ]


class AppointmentEncoder(ModelEncoder):
    model = Appointment
    properties = [
        "id",
        "date",
        "time",
        "reason",
        "status",
        "vin",
        "customer",
        "technician",
        "vip"
    ]
    encoders = {
        "technician": TechnicianEncoder(),
    }

    def get_extra_data(self, o):
        if isinstance(o.date, str) and isinstance(o.time, str):
            return {
                "date": o.date,
                "time": o.time,
            }
        else:
            return {
                "date": o.date.isoformat(),
                "time": o.time.isoformat(),
            }


@require_http_methods(["GET", "POST"])
def api_list_technicians(request):
    if request.method == "GET":
        technicians = Technician.objects.all()
        return JsonResponse(
            {"technicians": technicians},
            encoder=TechnicianEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician = Technician.objects.create(**content)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "could not create the technician!!!"},
                status=400,
            )


@require_http_methods(["GET", "DELETE"])
def api_show_technician(request, pk):
    if request.method == "GET":
        try:
            technician = Technician.objects.get(id=pk)
            return JsonResponse(
                technician,
                encoder=TechnicianEncoder,
                safe=False,
            )
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "could not retrieve the technician!!!"},
                status=400,
            )
    elif request.method == "DELETE":
        count, _ = Technician.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})


@require_http_methods(["GET", "POST"])
def api_list_appointments(request):
    if request.method == "GET":
        appointments = Appointment.objects.all()
        return JsonResponse(
            {"appointments": appointments},
            encoder=AppointmentEncoder,
        )
    else:
        content = json.loads(request.body)
        try:
            technician_id = content["technician"]
            technician = Technician.objects.get(employee_id=technician_id)
            content["technician"] = technician
        except Technician.DoesNotExist:
            return JsonResponse(
                {"message": "invalid technician!!!"},
                status=400,
            )
        appointment = Appointment.objects.create(**content)
        return JsonResponse(
            appointment,
            encoder=AppointmentEncoder,
            safe=False,
        )


@require_http_methods(["GET", "DELETE"])
def api_show_appointment(request, pk):
    if request.method == "GET":
        try:
            appointment = Appointment.objects.get(id=pk)
            return JsonResponse(
                appointment,
                encoder=AppointmentEncoder,
                safe=False
            )
        except Appointment.DoesNotExist:
            return JsonResponse(
                {"message": "couldn't create appointment!!!"},
                status=400,
            )
    elif request.method == "DELETE":
        try:
            model = Appointment.objects.get(id=pk)
            model.delete()
            return JsonResponse(
                model,
                encoder=AppointmentEncoder,
                safe=False,
                )
        except Appointment.DoesNotExist:
            return JsonResponse({"message": "doesn't exist!!!"})


@require_http_methods(["PUT"])
def api_finish_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.status = "finished"
    appointment.save()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False
    )


@require_http_methods(["PUT"])
def api_cancel_appointment(request, pk):
    appointment = Appointment.objects.get(id=pk)
    appointment.status = "canceled"
    appointment.save()
    return JsonResponse(
        appointment,
        encoder=AppointmentEncoder,
        safe=False
    )


@require_http_methods(["GET"])
def api_list_automobileVO(request):
    if request.method == "GET":
        automobileVO = AutomobileVO.objects.all()
        return JsonResponse(
            {"AutomobileVOs": automobileVO},
            encoder=AutomobileVOEncoder,
            safe=False,
        )
