#!/bin/bash
# as of https://serverfault.com/questions/112795/how-to-run-a-server-on-port-80-as-a-normal-user-on-linux we redirect all traffic to 3000
echo "Installing traffic redirect to thin server (sudo command required)"
sudo iptables -t nat -A PREROUTING -p tcp --dport 80 -j REDIRECT --to-port 3000
sudo iptables -t nat -I OUTPUT -p tcp -d 127.0.0.1 --dport 80 -j REDIRECT --to-ports 3000
echo "Run server and visit 'localhost' to test if it works"

# this is neither testing wheter it's already installed nor is it showing whether it was successful
# needs improvement