import time


def get_current_datetime_in_millis() -> int :
    return int(round(time.time() * 1000))