FROM python:3.8
COPY ./app /app
WORKDIR /app
RUN pip install flask
EXPOSE 8000
CMD ["python", "/app/main.py"]