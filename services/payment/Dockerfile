FROM python:3.11-slim

WORKDIR /app

# Install system dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc \
    && rm -rf /var/lib/apt/lists/*

# Install Python dependencies
COPY pyproject.toml .
RUN pip install --no-cache-dir .

# Copy application
COPY manage.py .
COPY payment_service ./payment_service

EXPOSE 3004

CMD ["gunicorn", "--bind", "0.0.0.0:3004", "payment_service.wsgi:application"]
