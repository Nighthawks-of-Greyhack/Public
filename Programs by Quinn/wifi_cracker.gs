//Hacks into the wifi networks
//NightHawks not liable for system damage from using this software
//Questions or Bugs report on the discord: https://discord.gg/FVx8c8Fm9n
crypto=null
if typeof(crypto)!="cryptoLib" then crypto=include_lib(home_dir+"/lib/crypto.so")
if typeof(crypto)!="cryptoLib" then crypto=include_lib("/lib/crypto.so")
if typeof(crypto)!="cryptoLib" then crypto=include_lib(current_path+"/crypto.so")
if typeof(crypto)!="cryptoLib" then crypto=include_lib(home_dir+"/crypto.so")
if typeof(crypto)!="cryptoLib" then exit "Crypto.so Not Found in /lib or folder script is ran from"
computer = get_shell.host_computer
network_device = computer.network_devices.split(" ")[0]
wifi_list = computer.wifi_networks(network_device)
num = 0
while num != wifi_list.len
    print((num + 1) + ")" + wifi_list[num].split(" "))
    num = num + 1
    yield
end while
op = user_input("Pick network to connect to:").to_int
op = op - 1
network = wifi_list[op].split(" ")
bssid = network[0]
percent = network[1]
essid = network[2]
max_acks = 300000 / percent.remove("%").to_int
crypto.airmon("start", network_device)
crypto.aireplay(bssid, essid, max_acks)
password = crypto.aircrack(home_dir + "/file.cap")
computer.connect_wifi(network_device, bssid, essid, password)