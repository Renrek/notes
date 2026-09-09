### Use this command to generate password to place in .env

```
docker run --rm -it ghcr.io/wg-easy/wg-easy wgpw 'mypassword'
```
The prefix of the password needs the $ escaped by doubling them as shown below
```
$2b$12$G -> $$2b$$12$$G
```