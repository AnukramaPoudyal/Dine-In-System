import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from datetime import datetime, timedelta
import sample.user.models as usermodel

@csrf_exempt
def check_availability(request):
    if request.method == 'POST':
        data = json.loads(request.body.decode('utf-8'))

        table_id = data.get('table_id')
        num_people = int(data.get('num_people'))
        booking_time_str = data.get('booking_time')

        if num_people > 2:  # Check if the number of people exceeds 2
            return JsonResponse({'error': 'Maximum of 2 people allowed for booking'}, status=400)

        try:
            booking_time = datetime.strptime(booking_time_str, '%Y-%m-%d %H:%M:%S')
        except ValueError:
            return JsonResponse({'error': 'Invalid booking time format. Please use YYYY-MM-DD HH:MM:SS'}, status=400)

        try:
            table = usermodel.Table.objects.get(table_id=table_id)
        except usermodel.Table.DoesNotExist:
            return JsonResponse({'error': 'Invalid table ID'}, status=400)

        if table.is_reserved:
            return JsonResponse({'error': 'Table is already reserved'}, status=400)

        if num_people > table.capacity:
            return JsonResponse({'error': 'Table capacity exceeded'}, status=400)

        closing_time = 23  # Restaurant closing time (in 24-hour format)
        min_booking_time = booking_time + timedelta(hours=2.5)
        if min_booking_time.hour >= closing_time:
            return JsonResponse({'error': 'At the moment, there’s no online availability within 2.5 hours of closing time'}, status=400)

        return JsonResponse({'message': 'Table is available'})
    else:
        return JsonResponse({'error': 'Method not allowed'}, status=405)

