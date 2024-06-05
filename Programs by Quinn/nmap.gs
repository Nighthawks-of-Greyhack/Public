//Shows all ports on a system
//NightHawks not liable for system damage from using this software
//Questions or Bugs report on the discord: https://discord.gg/FVx8c8Fm9n
color = {};color.u="<u>";color.white = "<color=#FFFFFF>";color.grey = "<color=#A5A5A5>";color.blue = "<color=#003AFF>";color.cyan = "<color=#00FFE7>";color.purple = "<color=#D700FF>";color.red = "<color=#AA0000>";color.yellow = "<color=#FBFF00>";color.orange = "<color=#FF8701>";color.green = "<color=#00ED03>";color.fill = "><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>";color.cap = "</color>";title = "<color=#00FFE7>[<b>SeaShell</b>]</color> ";init = "<color=#00ED03><b>init:</b></color> ";error = "<color=#AA0000><b>Error:</b></color> ";warning = "<color=#FF8701><b>Warning:</b></color> ";color.rainbow = color.red+"R"+color.cap+color.orange+"A"+color.cap+color.cap+color.yellow+"I"+color.cap+color.cap+color.green+"N"+color.cap+color.cap+color.cyan+"B"+color.cap+color.cap+color.blue+"O"+color.cap+color.cap+color.purple+"W"+color.cap;
format = function(text, fillLastRow=false);text = text.replace("\\\\",char(20000)).replace("\\<",char(20001)).replace("\\>",char(20002)).replace("\\ ",char(20003)).replace("\\n",char(10));text = text.replace("<b>","<b><mspace=9.9>").replace("</b>","</mspace></b>");origList = text.split(" ");for e in origList;if e.indexOf(char(10)) isa number then;sp = e.split(char(10));origList[__e_idx] = sp[0];origList.insert(__e_idx+1,[char(10),sp[1]].join(""));__e_idx = __e_idx + 1;end if;end for;while true;start = text.indexOf("<");if typeof(start) == "null" then break;finish = text.indexOf(">",start);if typeof(finish) == "null" then break;text = [text[:start], text[finish+1:]].join("");end while;text = format_columns(text);lines = text.split(char(10));if fillLastRow then text = [text," "*(lines[0].len-lines[-1].len-1)].join("");newList = text.split(" ");i = 0;for item in newList;if item != "" then;newList[__item_idx] = "";while i < origList.len and origList[i] == "";i = i + 1;end while;else;continue;end if;newList[__item_idx] = origList[i];i = i + 1;end for;return newList.join(" ").replace(char(20000),"\").replace(char(20001),"<").replace(char(20002),">").replace(char(20003)," ");end function
clear_screen
program_name=program_path.split("/")[program_path.split("/").len-1]
nmap={"name":"nmap","desc":"Scans the Ports On A Network","usg":program_name+" [ip address]"}
nmap.run=function(ip)
    if not is_valid_ip(ip) then ip=nslookup(ip)
    if not is_valid_ip(ip) then exit(color.red+ip+" Not Valid")
    router=get_router(ip)
    IsLanIP=is_lan_ip(ip)
    if IsLanIP then router=get_router
    if router==null then exit color.red+"nmap: Router Not Found "+ip
    ports=router.device_ports(ip)
    if not IsLanIP then ports=router.used_ports
    if ports==null then exit color.red+"nmap: Ports Not Found "+ip
    if typeof(ports)=="string" then exit color.red+"nmap: Err with ports on"+ip+char(10)+ports
    firewall_map=function(ip)
        firewalls=router.firewall_rules
        rules={}
        n=0
        if firewalls.len>0 then
            print color.red+"Firewalls on: "+ip
            data=color.white+"ACTION PORT SOURCE DESTINATION"
            while firewalls.len>0
                rules[n]=firewalls.pop
                n=n+1
            end while
            n=0
            while rules.len!=0
                t=rules[n]
                fire=t.split(" ")
                if fire[0]=="ALLOW" then
                    fire.remove(0)
                    fire.reverse
                    fire.push("ALLOW")
                    fire.reverse
                    action = fire[0]
                    port = fire[1]
                    source = fire[2]
                    going = fire[3]
                    data=data+char(10)+color.green+action+" "+port+" "+source+" "+going
                else if fire[0]=="DENY" then
                    fire.remove(0)
                    fire.reverse
                    fire.push("DENY")
                    fire.reverse
                    action = fire[0]
                    port = fire[1]
                    source = fire[2]
                    going = fire[3]
                    data=data+char(10)+color.red+action+" "+port+" "+source+" "+going
                end if
                rules.remove(n)
                n=n+1
            end while
            print format(data)
        end if
    end function

    info=color.white+"PORT STATE SERVICE VERSION LAN"
    print color.white+"ESSID: "+color.yellow+router.essid_name+color.white+"("+color.yellow+router.bssid_name+color.white+")"
    print color.white+"Public IP:<b>"+color.yellow+router.public_ip+color.white+"</b> Private IP:<b> "+color.yellow+router.local_ip
    whois=whois(router.public_ip).split(char(10))
    for line in whois
        print color.white+line.split(":")[0]+":"+color.yellow+line.split(":")[1]
    end for
    print(color.white+"Kernel_Router.so Version: "+color.yellow+router.kernel_version)
    for port in ports
        service=router.port_info(port)
        service_name=service.split(" ")[0]
        if service_name == "students" or service_name == "employees" or service_name == "police" then service_name = "sql"
        service_version = service.split(" ")[1]
        service = service.split(" ")
        port_status = color.green+"OPEN"
        if ((port.is_closed) and not is_lan_ip(ip)) then port_status = color.red+"CLOSED"
        info = info + char(10) + port.port_number + " " + service[0] + " " + port_status + " " + service[1] + " " + port.get_lan_ip
    end for
    info=info+char(10)+0+" Kernel_Router.so "+color.green+"OPEN "+router.kernel_version+" "+router.local_ip
    firewall_map(ip)
    print char(10)+format(info)
end function


if params.len==0 or params[0]=="-h" then 
    print "Usage: "+nmap.usg 
else
    nmap.run(params[0])
end if