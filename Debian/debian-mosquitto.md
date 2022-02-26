Project notes - no recipe yet.

https://www.digitalocean.com/community/tutorials/how-to-install-and-secure-the-mosquitto-mqtt-messaging-broker-on-ubuntu-18-04-quickstart

<!-- Installing -->
`sudo apt install mosquitto mosquitto-clients`

<!-- Testing subscribing -->
`mosquitto_sub -h localhost -t test`

<!-- Testing publishing -->
`mosquitto_pub -h localhost -t test -m "hello world"`



<!-- Edit config -->
`sudo nano /etc/mosquitto/conf.d/default.conf`

```text
allow_anonymous false
password_file /etc/mosquitto/passwd

listener 1883 localhost

listener 8883
certfile /etc/letsencrypt/live/mqtt.example.com/cert.pem
cafile /etc/letsencrypt/live/mqtt.example.com/chain.pem
keyfile /etc/letsencrypt/live/mqtt.example.com/privkey.pem

listener 8083
protocol websockets
certfile /etc/letsencrypt/live/mqtt.example.com/cert.pem
cafile /etc/letsencrypt/live/mqtt.example.com/chain.pem
keyfile /etc/letsencrypt/live/mqtt.example.com/privkey.pem
```
`sudo nano /etc/letsencrypt/renewal/mqtt.example.com.conf`
```text
renew_hook = systemctl restart mosquitto
```

`sudo systemctl restart mosquitto`
`sudo systemctl status mosquitto`

`sudo tail /var/log/mosquitto/mosquitto.log`

`sudo ufw allow 8883`
`sudo ufw allow 8083`




`openssl genrsa -des3 -out ca.key 2048`
`openssl req -new -x509 -days 1826 -key ca.key -out ca.crt`
`openssl genrsa -out server.key 2048`
`openssl req -new -out server.csr -key server.key`
`openssl x509 -req -in server.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out server.crt -days 360`




move ca.crt, server.crt server.key to mosq










<!-- gen a key -->
`mkdir /root/certs && cd /root/certs`
`openssl req -new -newkey rsa:4096 -x509 -sha256 -days 365 -nodes -out MyCertificate.crt -keyout MyKey.key`















--------
# ssl-cert and snakeoil
 `ssl-cert`
`/etc/ssl/certs/ssl-cert-snakeoil.pem`
`/etc/ssl/private/ssl-cert-snakeoil.key`

<!-- Remakes snakeoil -->
`make-ssl-cert generate-default-snakeoil --force-overwrite`

--------
# genuine public cert free
<!-- Certs -->
`sudo certbot certonly --standalone --preferred-challenges http -d mqtt.example.com`

---------