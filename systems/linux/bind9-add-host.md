nano /etc/bind/zones/db.lan.renrek.com

nano /etc/bind/zones/db.172.20

named-checkzone lan.renrek.com /etc/bind/zones/db.lan.renrek.com

named-checkzone 20.172.in-addr.arpa /etc/bind/zones/db.172.20

systemctl restart bind9
