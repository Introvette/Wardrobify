from django.db import models
from django.urls import reverse
# Create your models here.


class LocationVO(models.Model):
    import_href = models.CharField(max_length=100, blank=True, null=True, unique=True)
    closet_name = models.CharField(max_length=100)
    section_number = models.PositiveIntegerField(blank=True, null=True)
    shelf_number = models.PositiveIntegerField(blank=True, null=True)


    def __str__(self):
        return self.closet_name + " " + str(self.section_number) + " " + str(self.shelf_number)

class Hats(models.Model):
    fabric = models.CharField(max_length=100)
    style_name = models.CharField(max_length=100)
    hat_color = models.CharField(max_length=100)
    hat_url = models.URLField()
    location = models.ForeignKey(LocationVO, related_name='hats', on_delete=models.CASCADE,)

    def get_api_url(self):
        return reverse("hats_detail", kwargs={"pk": self.pk})
