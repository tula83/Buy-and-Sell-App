import os, sys
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), '..')))
from mypackage.userdata import User

user = User()


def test_add_item():
    user.add_users("tularam", "tula81@gmail.com", "tula@123")
    user.add_users("shiva", "shiva81@gmail.com", "shiva@123")
    assert user.add_users() == 'provide valid fields'

    assert user.users[0]['name'] == 'tularam'
    assert user.users[0]['password'] == 'tula@123'
    assert user.users[0]['email'] == 'tula81@gmail.com'
    assert len(user.users) == 2


def test_email_password():
    find1 = user.check_email_password("tula81@gmail.com","tula@123")
    find2 = user.check_email_password("shiva81@gmail.com","shiva@123")
    find3 = user.check_email_password("hemraj81@gmail.com","hemraj")

    assert find1 == 'Found'
    assert find2 == 'Found'
    assert find3 == 'Not Found'


def test_delete_users():
    assert user.delete('tula81@gmail.com') == 'deleted successfully'
    assert user.delete('tula82@gmail.com') == 'email not found'


