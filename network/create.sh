CHANNEL_NAME="cpuchannel"

peer channel create -o 10.154.0.3:7050 -c "$CHANNEL_NAME" -f ./channel-artifacts/channel.tx --outputBlock ./channel-artifacts/"$CHANNEL_NAME".block

 peer channel join -b ./channel-artifacts/"$CHANNEL_NAME".block