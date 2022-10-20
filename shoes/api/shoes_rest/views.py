from django.shortcuts import render
from common.json import ModelEncoder
from django.http import JsonResponse
from django.views.decorators.http import require_http_methods
import json
from .models import BinVO, Shoe

class BinVODetailEncoder(ModelEncoder):
    model = BinVO
    properties = ["closet_name", "import_href", "bin_number", "bin_size"]


class ShoeEncoder(ModelEncoder):
    model = Shoe
    properties = [
        "id",
        "manufacturer",
        "model_name",
        "color",
        "picture_url",
    ]
    encoders = {
        "bins": BinVODetailEncoder(),
    }

@require_http_methods(["GET", "POST"])
def api_shoes(request):
    if request.method == "GET":
        shoe = Shoe.objects.all()
        return JsonResponse(
            shoe,
            encoder=ShoeEncoder,
            safe=False,
        )
    else:
        content = json.loads(request.body)

        try:
            href = content["bins"]
            bin = BinVO.objects.get(import_href=href)
            content["bins"] = bin
        except BinVO.DoesNotExist:
            return JsonResponse(
                {"message": "Invalid bin id"},
                status=400,
            )
        shoes = Shoe.objects.create(**content)
        return JsonResponse(
            shoes,
            encoder=ShoeEncoder,
            safe=False,
        )



@require_http_methods(["DELETE"])
def api_shoe(request, pk):
    if request.method == "DELETE":
        count, _ = Shoe.objects.filter(id=pk).delete()
        return JsonResponse({"deleted": count > 0})
