exec ssh-agent bash # windows
eval $(ssh-agent) # linux

chmod 400 ~/.ssh/brad_rsa

ssh-add id_rsa

