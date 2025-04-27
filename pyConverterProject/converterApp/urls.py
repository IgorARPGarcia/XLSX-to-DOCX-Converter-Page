from django.urls import path
from .views import convert_xlsx_to_docx
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path("convert/", convert_xlsx_to_docx, name="convert"),
] + static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)