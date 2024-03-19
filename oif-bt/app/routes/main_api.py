from fastapi import APIRouter
from routes import actuator_api, command_api, device_api, user_api


router = APIRouter()
router.include_router(actuator_api.router)
router.include_router(command_api.router)
router.include_router(device_api.router)
router.include_router(user_api.router)