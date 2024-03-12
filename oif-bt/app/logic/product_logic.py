from fastapi import APIRouter
from models.product import ProductModel, ProductUpdateModel, ResponseModel
from db.database import add_product, read_product, read_products, update_product, delete_product

# APIRouter creates path operations for product module
router = APIRouter(
    prefix="/products",
    tags=["Product"],
    responses={404: {"description": "Not found"}},
)


@router.post("/add", response_description="Product data added into the database")
async def add_product_data(product: ProductModel):
    product = product.as_dict()
    new_product = await add_product(product)
    return ResponseModel(new_product, 200, "Product added successfully.", False)


@router.put("/update")
async def update_product_data(product: ProductUpdateModel):
    product = product.as_dict()
    updated_product = await update_product(product.get("id"), product)
    return ResponseModel(updated_product, 200, "Product updated successfully.", False)


@router.delete("/{product_id}/delete")
async def delete_product_data(product_id: str):
    deleted_result = await delete_product(product_id)
    return ResponseModel(deleted_result, 200, "Product deleted successfully.", False)


@router.get("/{product_id}")
async def read_product_data(product_id: str):
    product = await read_product(product_id)
    return ResponseModel(product, 200, "Product retrieved successfully.", False)