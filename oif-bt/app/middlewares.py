
from fastapi import Request
from fastapi.responses import JSONResponse
from models.common import ResponseModel



async def request_handler(request: Request, call_next):
    try:
        return await call_next(request)

    except Exception as ex:
        error_msg = str(ex)
        # TODO: Add a logger
        # logger.exception("Exception Occured while code Execution: "+ error_msg)      

        response = ResponseModel("", 500, error_msg, True)
        return JSONResponse(content=response, status_code=500)          
