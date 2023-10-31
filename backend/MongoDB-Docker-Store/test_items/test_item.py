import os, sys

sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from mypackage.items import Items

from urllib.parse import urlparse, urlsplit

user_items = Items()


def test_add_items():
    user_items.add_item('car101', 'suzuki', '1 year old', 12000,"car",
                        "https://apollo-singapore.akamaized.net/v1/files/cd84xnh7o6oy1-IN/image;s=300x600;q=60")

    user_items.add_item('car102', 'mercedes', '2 year old', 222000,"car",
                        "https://apollo-singapore.akamaized.net/v1/files/rv6udnzwh9ij-IN/image;s=300x600;q=60")

    result1 = user_items.add_item('car103', 'toyota', '2.5 year old', "222000","car",
                                  "https://apollo-singapore.akamaized.net/v1/files/x376b7udthr21-IN/image;s=300x600;q=60")

    result2 = user_items.add_item('car104', 'toyota', '2.5 year old', 222000,"car","image3.com")

    assert user_items.add_item('car105', 1344, 3334, 23333,"car",
                               "example.com") == "provide valid data in name,category,description it must be string"

    assert user_items.add_item() == 'provide valid data in fields'

    assert len(user_items.items) == 2

    assert result1 == 'provide valid price'

    assert result2 == 'invalid image url'


def test_remove_item():
    assert user_items.remove_item("car102") == "item deleted successfully"
    assert user_items.remove_item("car109") == 'product id not found'
    assert len(user_items.items) == 1


def test_search_item():
    assert user_items.search_item("car101") == 'item has been found'
