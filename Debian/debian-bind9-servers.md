# Debian Bind9 server

## Setup Master Name Server
#### Install Packages 
`sudo apt install bind9 bind9utils bind9-doc`

`sudo nano /etc/default/named`

```bind9
# run resolvconf?
RESOLVCONF=no

# startup options for the server
OPTIONS="-u bind -4"
```

`sudo systemctl restart bind9`

`sudo nano /etc/bind/named.conf.options`

```config
acl "trusted" {
        172.22.0.0/16; #local subnet
};

options {
        directory "/var/cache/bind";

        recursion yes;
        allow-recursion { trusted; };
        listen-on { 172.22.0.2; }; #ns1 ip
        allow-transfer { none; };

        forwarders {
                8.8.8.8;
                8.8.4.4;
        };

        // If there is a firewall between you and nameservers you want
        // to talk to, you may need to fix the firewall to allow multiple
        // ports to talk.  See http://www.kb.cert.org/vuls/id/800113

        // If your ISP provided one or more IP addresses for stable
        // nameservers, you probably want to use them as forwarders.
        // Uncomment the following block, and insert the addresses replacing
        // the all-0's placeholder.

        // forwarders {
        //      0.0.0.0;
        // };

        //========================================================================
        // If BIND logs error messages about the root key being expired,
        // you will need to update your keys.  See https://www.isc.org/bind-keys
        //========================================================================
        dnssec-validation auto;

        listen-on-v6 { any; };
};
```

`sudo nano /etc/bind/named.conf.local`
```
//
// Do any local configuration here
//

// Consider adding the 1918 zones here, if they are not used in your
// organization
//include "/etc/bind/zones.rfc1918";

zone "lan.renrek.com" {
        type master;
        file "/etc/bind/zones/db.lan.renrek.com"; #zone file path
        allow-transfer { 172.22.0.3; }; #ns2 ip
};

zone "22.172.in-addr.arpa" {
        type master;
        file "/etc/bind/zones/db.172.22"; #172.22.0.0/16 subnet
        allow-transfer { 172.22.0.3; }; #ns2 private Ip address - secondary
};
```
`sudo mkdir /etc/bind/zones`

`sudo cp /etc/bind/db.local /etc/bind/zones/db.lan.renrek.com`

`sudo nano /etc/bind/zones/db.lan.renrek.com`

```
;
; BIND data file for local loopback interface
;
$TTL    604800
@       IN      SOA     ns1.lan.renrek.com. admin.lan.renrek.com. (
                              3         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
;
; name servers - NS records
        IN      NS      ns1.lan.renrek.com.
        IN      NS      ns2.lan.renrek.com.

; name servers - A records
ns1.lan.renrek.com.     IN      A       172.22.0.2
ns2.lan.renrek.com.     IN      A       172.22.0.3

; 172.22.0.0/16 - A records
gateway.lan.renrek.com. IN      A       172.22.0.1
node1.lan.renrek.com.   IN      A       172.22.20.1
node2.lan.renrek.com.   IN      A       172.22.20.2
node3.lan.renrek.com.   IN      A       172.22.20.3


```

`sudo cp /etc/bind/db.127 /etc/bind/zones/db.172.22`

`sudo nano /etc/bind/zones/db.172.22`

```
;
; BIND reverse data file for local loopback interface
;
$TTL    604800
@       IN      SOA     ns1.lan.renrek.com. admin.lan.renrek.com. (
                              3         ; Serial
                         604800         ; Refresh
                          86400         ; Retry
                        2419200         ; Expire
                         604800 )       ; Negative Cache TTL
; name servers
        IN      NS      ns1.lan.renrek.com.
        IN      NS      ns2.lan.renrek.com.

; PTR Records
1.0     IN      PTR     gateway.lan.renrek.com. ; 172.22.0.1
2.0     IN      PTR     ns1.lan.renrek.com.     ; 172.22.0.2
3.0     IN      PTR     ns2.lan.renrek.com.     ; 172.22.0.3
1.20     IN      PTR     node1.lan.renrek.com.   ; 172.22.20.1
2.20     IN      PTR     node2.lan.renrek.com.   ; 172.22.20.2
3.20     IN      PTR     node3.lan.renrek.com.   ; 172.22.20.3


```

`sudo named-checkconf`

`sudo named-checkzone lan.renrek.com /etc/bind/zones/db.lan.renrek.com`

`sudo named-checkzone 22.172.in-addr.arpa /etc/bind/zones/db.172.22`

`sudo systemctl restart bind9`

`sudo ufw allow Bind9`


## Setup Backup Name Server

`sudo apt install bind9 bind9utils bind9-doc`
`sudo nano /etc/bind/named.conf.options`

```
acl "trusted" {
        172.22.0.0/16; #local subnet
};


options {
        directory "/var/cache/bind";

        recursion yes;
        allow-recursion { trusted; };
        listen-on { 172.22.0.3; }; #ns2 ip
        allow-transfer { none; };

        forwarders {
                8.8.8.8;
                8.8.4.4;
        };

        // If there is a firewall between you and nameservers you want
        // to talk to, you may need to fix the firewall to allow multiple
        // ports to talk.  See http://www.kb.cert.org/vuls/id/800113

        // If your ISP provided one or more IP addresses for stable
        // nameservers, you probably want to use them as forwarders.
        // Uncomment the following block, and insert the addresses replacing
        // the all-0's placeholder.

        // forwarders {
        //      0.0.0.0;
        // };

        //========================================================================
        // If BIND logs error messages about the root key being expired,
        // you will need to update your keys.  See https://www.isc.org/bind-keys
        //========================================================================
        dnssec-validation auto;

        listen-on-v6 { any; };
};

```

`sudo nano /etc/bind/named.conf.local`
```
//
// Do any local configuration here
//

// Consider adding the 1918 zones here, if they are not used in your
// organization
//include "/etc/bind/zones.rfc1918";

zone "lan.renrek.com" {
    type slave;
    file "db.lan.renrek.com";
    masters { 172.22.0.2; };  # ns1 private IP
};

zone "22.172.in-addr.arpa" {
    type slave;
    file "db.172.22";
    masters { 172.22.0.2; };  # ns1 private IP
};

```

`sudo named-checkconf`

`sudo systemctl restart bind9`

`sudo ufw allow Bind9`