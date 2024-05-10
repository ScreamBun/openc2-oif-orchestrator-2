import os
from fastapi import UploadFile
from logic  import file_manager, const
from db  import device_collection


async def store_cert_file(id: str, cert_name: str, cert_file: UploadFile | None) -> bool:
    
    cur_path = os.path.abspath(os.getcwd())
    file_full_path = cur_path + const.DEVICE_PATH + id
    
    if cert_file != None and cert_file.filename != None:
        file_manager.add_file(file_full_path, cert_file)
    else:
        device = await device_collection.get_device_by_id(id)
        if device != None:   
            cert_temp_name = device.get('transport', {}).get('http', {}).get(cert_name)
            if cert_temp_name:
                filename = cert_temp_name.split('\\')[-1]
                if filename:
                    file_manager.remove_file(file_full_path, filename)
                    
    
    return True
        
        
    
    
    