import os, sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))

from mypackage.product import Product
from mypackage.shopping_carts import ShoppingCart




def test_add_item():
    cart = ShoppingCart()
    product = Product("laptop", 1000)
    cart.add_item(product, 2)
    assert len(cart.items) == 1
    assert cart.items[0]['product'] == product
    assert cart.items[0]['quantity'] == 2


def test_remove_item():
    cart = ShoppingCart()
    product1 = Product("laptop", 2000)
    product2 = Product("Mouse", 2000)
    cart.add_item(product1, 2)
    cart.add_item(product2, 1)
    cart.remove_item(product1)
    assert len(cart.items) == 1
    assert cart.items[0]['product'] == product2


def test_calculate_total():
    cart = ShoppingCart()
    product1 = Product("laptop", 2000)
    product2 = Product("mouse", 200)

    cart.add_item(product1, 2)
    cart.add_item(product2, 1)

    assert cart.calculate_total() == (2000 * 2 + 200 * 1)
