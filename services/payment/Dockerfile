FROM python:3.11-slim

WORKDIR /app

RUN apt-get update && apt-get install -y --no-install-recommends \
    gcc wget \
    && rm -rf /var/lib/apt/lists/*

COPY services/payment/pyproject.toml .
COPY services/payment/poetry.lock .
RUN pip install --no-cache-dir .

COPY services/payment/manage.py .
COPY services/payment/payment_service ./payment_service

EXPOSE 3004

HEALTHCHECK --interval=30s --timeout=10s --start-period=30s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3004/api/payments/health || exit 1

CMD ["sh", "-c", "python manage.py migrate --noinput && gunicorn --bind 0.0.0.0:3004 payment_service.wsgi:application"]
