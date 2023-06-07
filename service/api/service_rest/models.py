from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50, unique=True)

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.id})

    # def __str__(self):
    #     return f"{self.last_name} | {self.employee_id}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50, unique=True)
    sold = models.BooleanField(default=False)

    def get_api_url(self):
        return reverse("api_show_automobile", kwargs={"pk": self.id})


class Appointment(models.Model):
    date_time = models.DateTimeField(auto_now=False, auto_now_add=False)
    reason = models.TextField()
    status = models.BooleanField(default=False)
    vin = models.CharField(max_length=50, unique=True)
    customer = models.CharField(max_length=50)
    technician = models.ForeignKey(
        Technician,
        related_name="technician",
        on_delete=models.PROTECT,
        null=True
    )

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.id})
