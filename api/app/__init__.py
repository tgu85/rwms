from flask import Flask
from flask_cors import CORS
from flask_login import LoginManager
from flask_sqlalchemy import SQLAlchemy
from flask_marshmallow import Marshmallow
from flask_bcrypt import Bcrypt

# Create app
app = Flask(__name__)
CORS(app, supports_credentials=True, origins="https://kraut-und-rueben.herokuapp.com")

# Load configuration
app.config.from_object('config')

# Setup database
db = SQLAlchemy(app)
ma = Marshmallow(app)

# Initialize authentication
bcrypt = Bcrypt(app)
login_manager = LoginManager(app)
login_manager.login_view = "login"

from app.routes import *