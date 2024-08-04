FROM python:3.8

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy current directory to the working directory
COPY . /app

# Install dependencies
RUN pip3 install -r requirements.txt

# Run Django migrations
RUN python manage.py makemigrations
RUN python manage.py migrate

# Expose port 8000
EXPOSE 8000

# Start the Gunicorn server
CMD gunicorn -b 0.0.0.0:8000 --worker-class=gevent --worker-connections=1000 --workers=5 clearmind.wsgi:application
