import os
from pathlib import Path
from fastapi import UploadFile


def add_file(full_path: str, file: UploadFile):
    
    doesPathExist = os.path.exists(full_path)
    
    if doesPathExist == False: 
        Path(full_path).mkdir(parents=True, exist_ok=True)
        
    path_to_file = os.path.join(full_path, file.filename) 
    doesFileExist = os.path.exists(path_to_file)
    if doesFileExist == True:
        remove_file(full_path, file.filename)
    
    try:
        contents = file.file.read()
        with open(path_to_file, 'wb') as f:
            f.write(contents)
    except Exception:
        return {"message": "There was an error uploading the file"}
    finally:
        file.file.close()
    

def remove_file(full_path: str, filename: str):
    path_to_file = os.path.join(full_path, filename) 
    doesFileExist = os.path.exists(path_to_file)
    if doesFileExist == True:
        os.remove(path_to_file)