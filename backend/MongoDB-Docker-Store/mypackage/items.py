from urllib.parse import urlparse


def valid_url(url):
    parsed_url = urlparse(url)
    return bool(parsed_url.scheme and parsed_url.netloc)


class Items:
    def __init__(self):
        self.items = []

    def add_item(self, product_id='default', name='default', description='default', price='default',
                 category='default',image_url='default'):
        if name == 'default' or description == 'default' or category=='default' or price == 'default' or image_url == 'default':
            return "provide valid data in fields"

        elif type(price) == str:
            return 'provide valid price'

        elif not type(name) == str or not type(description) == str or not type(category)==str :
            return "provide valid data in name,category,description it must be string"

        elif not valid_url(image_url):
            return "invalid image url"

        else:
            self.items.append({"productId": product_id, "name": name,"category":category,"description": description, "price": price,
                               "image_url": image_url})

    def remove_item(self, product_id):
        items = self.items
        flag = 0
        for i in range(len(items)):
            print(items[i]['productId'])
            if items[i]['productId'] == product_id:
                flag = 1
                self.items.pop(i)
                return "item deleted successfully"
        if flag == 0:
            return 'product id not found'

    def search_item(self, product_id):
        items = self.items
        flag = 0
        for i in range(len(items)):
            print(items[i]['productId'])
            if items[i]['productId'] == product_id:
                flag = 1

                return "item has been found"
        if flag == 0:
            return 'product id not found'
