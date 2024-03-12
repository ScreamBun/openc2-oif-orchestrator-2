def ResponseModel(data, code, message, error=False):
    return {
        "data": data,
        "code": code,
        "message": message,
        "error": error
    }  
