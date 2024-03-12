from typing import Annotated

from fastapi import Header, HTTPException

# We are using an invented header to simplify this example.
# But in real cases you will get better results using the integrated Security utilities.
# https://fastapi.tiangolo.com/tutorial/security/

async def get_token_header(x_token: Annotated[str, Header()]):
    if x_token != "fake-super-secret-token":
        raise HTTPException(status_code=400, detail="X-Token header invalid")


async def get_query_token(token: str):
    if token != "oif":
        raise HTTPException(status_code=400, detail="OIF token not provided")