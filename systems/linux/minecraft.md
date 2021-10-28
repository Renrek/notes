Introduction
A Minecraft server allows you to play Minecraft online with other people. This guide explains how to install a Minecraft server on Debian 10 (Buster).

1. Prepare the System
Launch a fresh Debian 10 VPS.
Update the server with our best practices guide.
Create a sudo user named mcuser. Follow our best practices guide. Switch to mcuser for the remainder of this guide.
2. Install Java
Install the headless OpenJDK version.

$ sudo apt install openjdk-11-jre-headless -y
3. Install Screen
Screen is a GNU utility that allows Minecraft to run in the background.

$ sudo apt install screen -y
4. Install Minecraft
Change to the mcuser home directory.

$ cd ~
Create and change to the minecraft folder.

$ mkdir minecraft
$ cd minecraft
Download the Java server. Use the URL on the Minecraft.net download page.

$ wget https://launcher.mojang.com/[NEWEST_VERSION]/server.jar
Create a startup script.

$ nano start.sh
Paste this script into start.sh. Replace 1024M with the RAM installed on your server.

#!/bin/sh

java -Xms512M -Xmx10240M -jar server.jar
Make start.sh executable.

$ chmod +x start.sh
Agree to Minecraft's End User License Agreement.

$ echo "eula=true" > eula.txt
5. Start the Server
Start screen.

$ screen -S "My Minecraft Server"
Run the startup script.

$ cd ~/minecraft
$ ./start.sh
To exit out screen, press CTRL + A, then D. To open the window again, use screen -r.

Conclusion
Congratulations, you now have a Minecraft server installed on Debian 10.