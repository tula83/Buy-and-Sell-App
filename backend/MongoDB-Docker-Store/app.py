from flask import Flask, request
from flask_restful import Resource, Api, reqparse
from random import randint

from pymongo import MongoClient
from bson import ObjectId
from flask_cors import CORS

app = Flask(__name__)
CORS(app)
api = Api(app)

# mongodb-docker-store-db-1 is name of mongo db server in docker

client = MongoClient('mongodb://mongodb-docker-store-db-1')

# comment this one for docker and remove comment from  upper one client
#client = MongoClient('mongodb://localhost:27017')

db = client.BuyAndSell
products = db.Products
users = db.Users
cart = db.cart
order = db.Order

parser = reqparse.RequestParser()
parser.add_argument('productId', type=str, required=False,
                    help='Id cannot be blank')
parser.add_argument('category', type=str, required=False,
                    help='category cannot be blank')
parser.add_argument('name', type=str, required=False,
                    help='name cannot be blank')
parser.add_argument('description', type=str, required=False,
                    help='description cannot be blank')
parser.add_argument('price', type=int, required=False,
                    help='customerPrice cannot be blank')
parser.add_argument('image', type=str, required=False,
                    help='image cannot be blank')


# def customer_exists(customerId):
#    existing_customer = customers.find_one({"customerId": customerId})
#    return existing_customer is not None


class ProductResource(Resource):
    def get(self, product_id=None):
        if product_id:
            print(product_id)
            product = products.find_one({"productId": product_id})
            if product:
                product['_id'] = str(product['_id'])
                return product, 200
            return {'message': 'Product not found'}, 404
        else:
            all_products = list(products.find())
            # Convert ObjectID to string for all products
            for product in all_products:
                product['_id'] = str(product['_id'])
            return all_products, 200

    def post(self):
        args = parser.parse_args()

        category = str(args['category'])

        product_id = str(category + str(randint(110, 500) + 1))
        # product_id = args['productId']
        print(product_id)

        result = products.insert_one({"productId": product_id, "category": args["category"],
                                      "name": args["name"], "description": args["description"], "price": args["price"],
                                      "image": args["image"]})
        return {"id": str(result.inserted_id), "productId": args["productId"], "category": args["category"],
                "name": args["name"], "description": args["description"], "price": args["price"],
                "image": args["image"]}, 201

    def put(self, product_id):
        args = parser.parse_args()
        productId = ''
        all_products = list(products.find())
        for i in range(len(all_products)):
            if product_id == str(all_products[i]['productId']):
                productId = all_products[i]['productId']

        products.update_one({"_id": ObjectId(product_id)}, {
            "$set": {'productId': product_id, "category": args["category"], "name": args["name"],
                     "description": args["description"], "price": args["price"], "image": args["image"]}})
        return {"id": product_id, "productId": args["productId"], "category": args["category"], "name": args["name"],
                "description": args["description"], "price": args["price"], "image": args["image"]}, 200

    def delete(self, product_id):
        product_id = ObjectId(product_id)
        if products.delete_one({"_id": product_id}).deleted_count:
            return {"message": "product Deleted"}, 200
        else:
            return {"no"}


api.add_resource(ProductResource, '/product', '/product/<string:product_id>')

parser.add_argument('userId', type=int, required=False, help='user Id cannot be blank')
parser.add_argument('userName', type=str, required=False, help='user Id cannot be blank')
parser.add_argument("email", type=str, required=False, help='user email cannot be blank')
parser.add_argument('password', type=str, required=False, help='user password cannot be blank')

parser.add_argument('_id', type=str, required=False, help='_id')
parser.add_argument('image', type=str, required=False, help='image')
parser.add_argument('quantity', type=int, required=False, help='quantity')
parser.add_argument('total', type=int, required=False, help='total')
parser.add_argument('product', type=list, location='json', required=False, help='quantity')

parser.add_argument('date', type=str, required=False, help='date')


# this is for checking user email and password  using post method  from u and deleting user
class User(Resource):

    def delete(self, user_id):
        result = users.delete_one({"_id": ObjectId(user_id)})
        if result.deleted_count > 0:
            return {"message": "deleted successfully"}, 200
        else:
            return {"message": "id not found"}, 404

    # this is for login purpose
    def post(self):
        args = parser.parse_args()
        email = str(args['email'])
        password = str(args['password'])
        user = users.find_one({"email": email, "password": password})
        if user:
            return {"message": "found"}, 200
        else:
            return {"message": "Not Found"}


# for adding  users and getting all data of users

class Users(Resource):

    def get(self):
        all_users = list(users.find())
        if len(all_users) == 0:
            print('empty database')
            return {"message": "empty database"}, 200
        else:
            for user in all_users:
                user['_id'] = str(user['_id'])
            return all_users, 200

    # this is for adding users by admin
    def post(self):
        args = parser.parse_args()
        # user_id = int(args['userId'])
        user_id = randint(10, 400) + 1

        user_name = (args['userName'])
        email = (args['email'])
        password = (args['password'])

        # checking for pre-existing userId
        users_check = list(users.find())
        flag = 0

        for i in range(len(users_check)):
            if email == users_check[i]['email']:
                flag = 0
                return {"message": "user already exists "}, 409

        if flag == 0:
            result = users.insert_one({"userId": user_id, "userName": user_name, "email": email, "password": password})
            return {"_id": str(result.inserted_id), "name": user_name, }, 201


class Cart(Resource):
    def post(self):
        args = parser.parse_args()
        # user_id = int(args['userId'])

        email = args['email']
        _id = ObjectId(args['_id'])
        name = args['name']
        price = args['price']
        image_url = args['image']

        cart_items = list(cart.find())
        quantity = 1
        for i in range(len(cart_items)):
            if cart_items[i]['_id'] == _id:
                quantity = int(cart_items[i]['quantity'])

        result = cart.insert_one(
            {"_id": _id, "name": name, "email": email, "image": image_url, 'price': price, 'quantity': quantity})
        return {"_id": str(result.inserted_id), "name": name, }, 201

    def get(self, email_id=None):

        if email_id:
            email_id = str(email_id)
            cart_items = list(db.cart.find({'email': email_id}))

            for item in cart_items:
                item['_id'] = str(item['_id'])

            return cart_items, 200
        else:
            cart_items = list(db.cart.find())

            for item in cart_items:
                item['_id'] = str(item['_id'])

            return cart_items, 200

    def put(self, email_id):
        args = parser.parse_args()

        cart.update_one({'_id': ObjectId(email_id)}, {"$set": {'quantity': args['quantity']}})
        return {"_id": str(email_id), 'quantity': args['quantity']}, 200

    def delete(self, email_id):

        result = cart.delete_many({"email": email_id})

        if result.deleted_count > 0:
            return {"message": "deleted successfully"}, 200
        else:
            return {"message": "email not found"}


#removing single cartitem
class CartItem(Resource):
    def delete(self, _id):

        result = cart.delete_one({"_id": ObjectId(_id)})

        if result.deleted_count > 0:
            return {"message": "deleted successfully"}, 200
        else:
            return {"message": "item_id  not found"}


class Order(Resource):
    def post(self):
        args = parser.parse_args()
        result = order.insert_one({"userEmail": args['email'], "product": args['product'],
                                   "total": args["total"], "date": args['date']})

        return {"_id": str(result.inserted_id)}, 201

    def get(self, user_email=None):
        if user_email:
            all_order = list(order.find({"userEmail": user_email}))
            for item in all_order:
                item['_id'] = str(item['_id'])
            return all_order, 200
        else:
            all_order = list(order.find())
            for item in all_order:
                item['_id'] = str(item['_id'])
            return all_order, 200


api.add_resource(User, '/user', '/user/<string:user_id>')
api.add_resource(Users, '/users')
api.add_resource(Cart, '/add-to-cart', '/add-to-cart/<string:email_id>')
api.add_resource(Order, "/order", "/order/<string:user_email>")
api.add_resource(CartItem, '/remove-cart/<string:_id>')
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
