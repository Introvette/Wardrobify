from django.shortcuts import render
from django.http import JsonResponse
import json
from django.views.decorators.http import require_http_methods
from .models import Hats, LocationVO
from common.json import ModelEncoder

# Create your views here.
class LocationVODetailEncoder(ModelEncoder):
    model = LocationVO
    properties = ['import_href', 'closet_name', 'section_number', 'shelf_number', 'id']

class HatsListEncoder(ModelEncoder):
    model = Hats
    properties = ['style_name', 'hat_color', "id"]

    encoders = { "location": LocationVODetailEncoder() }

class HatsDetailEncoder(ModelEncoder):
    model = Hats
    properties = ['fabric', 'style_name', 'hat_color', 'hat_url', 'location', "id"]

    encoders = { "location": LocationVODetailEncoder() }


@require_http_methods(["GET", "POST"])
def hats_list(request):

    if request.method == "GET":
        hats = Hats.objects.all()
        return JsonResponse({"hats": hats},encoder=HatsListEncoder, safe=False)

    else:
        content = json.loads(request.body)
        try:
            location = LocationVO.objects.get(id=content['location'])
            content['location'] = location
        except LocationVO.DoesNotExist:
            return JsonResponse({"error": "Location does not exist"}, status=400)
        hats = Hats.objects.create(**content)
        return JsonResponse({"hats": hats}, encoder=HatsDetailEncoder, safe=False)

@require_http_methods(["GET", "PUT", "DELETE"])
def hats_detail(request, pk):
    try:
        hats = Hats.objects.get(pk=pk)
    except Hats.DoesNotExist:
        return JsonResponse({"error": "Hats does not exist"}, status=404)

    if request.method == "GET":
        return JsonResponse({"hats": hats}, encoder=HatsDetailEncoder, safe=False)

    elif request.method == "PUT":
        content = json.loads(request.body)
        try:
            location_href = content['location']
            location = LocationVO.objects.get(import_href=location_href)
            content['location'] = location
        except LocationVO.DoesNotExist:
            return JsonResponse({"error": "does not exist"}, status=400)
        Hats.objects.filter(id=pk).update(**content)
        hats = Hats.objects.get(id=pk)
        return JsonResponse({"hats": hats}, encoder=HatsDetailEncoder, safe=False)

    elif request.method == "DELETE":
        count, _ = Hats.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0}, safe=False)


@require_http_methods(["GET"])
def location_list(request):
    locations = LocationVO.objects.all()
    return JsonResponse({"locations": locations}, encoder=LocationVODetailEncoder, safe=False)
