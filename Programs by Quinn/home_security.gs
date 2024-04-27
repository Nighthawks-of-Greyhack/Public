//Root password is hard coded and must be updated everytime you change the root password
//NightHawks not liable for system damage from using this software
//Questions or Bugs report on the discord: https://discord.gg/FVx8c8Fm9n
color = {};color.u="<u>";color.white = "<color=#FFFFFF>";color.grey = "<color=#A5A5A5>";color.blue = "<color=#003AFF>";color.cyan = "<color=#00FFE7>";color.purple = "<color=#D700FF>";color.red = "<color=#AA0000>";color.yellow = "<color=#FBFF00>";color.orange = "<color=#FF8701>";color.green = "<color=#00ED03>";color.fill = "><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><> ><>";color.cap = "</color>";title = "<color=#00FFE7>[<b>SeaShell</b>]</color> ";init = "<color=#00ED03><b>init:</b></color> ";error = "<color=#AA0000><b>Error:</b></color> ";warning = "<color=#FF8701><b>Warning:</b></color> ";color.rainbow = color.red+"R"+color.cap+color.orange+"A"+color.cap+color.cap+color.yellow+"I"+color.cap+color.cap+color.green+"N"+color.cap+color.cap+color.cyan+"B"+color.cap+color.cap+color.blue+"O"+color.cap+color.cap+color.purple+"W"+color.cap;
shell=get_shell("root","ROOT_PASSWORD_HERE") 
computer=shell.host_computer
lockdown=function(shell)
    shell.host_computer.File("/").set_owner("root",1)
    shell.host_computer.File("/").set_group("root",1)
    computer.File("/").chmod("o-rwx",1)
    computer.File("/").chmod("u-rwx",1)
    computer.File("/").chmod("g-rwx",1)
    computer.File(program_path).chmod("o+x")
    computer.File(program_path).chmod("u+x")
    computer.File(program_path).chmod("g+x")
    computer.File("/usr/bin/Terminal.exe").chmod("o+x")
    computer.File("/usr/bin/Terminal.exe").chmod("u+x")
    computer.File("/usr/bin/Terminal.exe").chmod("g+x")
end function
unlock=function(shell)
    computer.File("/").chmod("o+rwx",1)
    computer.File("/").chmod("u+rwx",1)
    computer.File("/").chmod("g+rwx",1)
end function

o=user_input(color.white+"Login or Unlock?").lower
if o=="login" then
    lockdown(shell)
    shell.start_terminal
else if o=="unlock" then
    unlock(shell)
end if