CHANNEL_NAME="cpuchannel"
CORE_CHAINCODE_ID_NAME="cpu-use:1.0"

peer channel create -o 35.242.141.97:7050 -c "$CHANNEL_NAME" -f ./channel-artifacts/channel.tx --outputBlock ./channel-artifacts/"$CHANNEL_NAME".block

peer channel join -b ./channel-artifacts/"$CHANNEL_NAME".block

peer channel update -o 35.242.141.97:7050 -c "$CHANNEL_NAME" -f ./channel-artifacts/org1MSPanchor.tx

peer chaincode install -n cpu-use -v 1.0 -l node -p /opt/gopath/src/github.com/hyperledger/fabric/peer/chaincode

peer chaincode instantiate -o 35.242.141.97:7050 -C "$CHANNEL_NAME" -n cpu-use -v 1.0 -c '{"Args":["org.cpu-use.cpu:instantiate"]}' -P "OR('org1MSP.member','org2MSP.member')"

peer chaincode invoke -o 35.242.141.97:7050 -C "$CHANNEL_NAME" -n cpu-use -c '{"Args":["org.cpu-use.cpu:instantiate"]}'

peer chaincode invoke -o 35.242.141.97:7050 -C "$CHANNEL_NAME" -n cpu-use -c '{"Args":["org.cpu-use.cpu:addCpu","01"]}'

peer chaincode invoke -o 35.242.141.97:7050 -C "$CHANNEL_NAME" -n cpu-use -c '{"Args":["org.cpu-use.cpu:addUsage","01","1000","1200"]}'

peer chaincode invoke -o 35.242.141.97:7050 -C "$CHANNEL_NAME" -n cpu-use -c '{"Args":["org.cpu-use.cpu:getUsage","01"]}'

 peer chaincode invoke -o 35.242.141.97:7050 -C "$CHANNEL_NAME" -n cpu-use -c '{"Args":["org.cpu-use.cpu:getHist","01"]}'
