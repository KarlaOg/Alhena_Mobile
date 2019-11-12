import subprocess, fileinput

IPAddr = subprocess.check_output(['hostname', '-I']).decode("utf-8").rstrip("\n\r\ ")
with open('config/env.js', 'r') as file:
    # read a list of lines into data
    data = file.readlines()
data[0] = "let localURL = '"+IPAddr+":5555';\n"

# and write everything back
with open('config/env.js', 'w') as file:
    file.writelines( data )