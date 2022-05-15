"""Api utils."""


def day_dict(day_obj):
    """Create day's dict."""
    days = {
        1: day_obj.monday,
        2: day_obj.tuesday,
        3: day_obj.wednesday,
        4: day_obj.thursday,
        5: day_obj.friday,
        6: day_obj.saturday,
        7: day_obj.sunday,
    }
    return days
