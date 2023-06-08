from django.db import models
from django.urls import reverse


class Technician(models.Model):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    employee_id = models.CharField(max_length=50, unique=True)

    def get_api_url(self):
        return reverse("api_show_technician", kwargs={"pk": self.id})

    def __str__(self):
        return f"{self.first_name} | {self.last_name}"


class AutomobileVO(models.Model):
    vin = models.CharField(max_length=50, unique=True)
    sold = models.BooleanField(default=False)

    # maybe self.vin?
    def get_api_url(self):
        return reverse("api_show_automobile", kwargs={"pk": self.id})


class Appointment(models.Model):
    date = models.DateField(max_length=50, blank=True, null=True)
    time = models.TimeField(max_length=50, blank=True, null=True)
    reason = models.TextField()
    status = models.CharField(max_length=50)
    vin = models.CharField(max_length=50, unique=True)
    customer = models.CharField(max_length=50)
    technician = models.ForeignKey(
        Technician,
        related_name="appointments",
        on_delete=models.CASCADE,
        null=True
    )
    vip = models.BooleanField(default=False)

    def update_vip(self, *args, **kwargs):
        if AutomobileVO.objects.filter(vin=self.vin).exists():
            self.vip_status = True
        super().save(*args, **kwargs)

    def get_api_url(self):
        return reverse("api_show_appointment", kwargs={"pk": self.id})
