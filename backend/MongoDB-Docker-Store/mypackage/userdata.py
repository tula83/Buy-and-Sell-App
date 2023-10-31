class User:
    def __init__(self):
        self.users = []

    def check_email_password(self, email,password):
        users = self.users
        flag = 0


        for i in range(len(users)):
            if users[i]['email'] == email and users[i]['password'] == password:
                flag = 1
                print('found')
                return 'Found'

        if flag == 0:
            print('not found')
            return 'Not Found'

    def add_users(self, name="default", email="default", password="default"):

        if name=='default' or email=='default' or password=='default':
            return 'provide valid fields'


        self.users.append({'name': name, 'password': password, 'email': email})

    def delete(self, email):
        flag = 0
        users=self.users

        for i in  range(len(users)):
            if users[i]['email'] == email:
                flag = 1
                self.users.pop(i)
                break
        if flag == 0:
            return 'email not found'
        else:
            return 'deleted successfully'
