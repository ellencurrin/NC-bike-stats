stats = open("crashdata-city.txt", "r")

lines= stats.readlines()

print lines[1]

for each in lines:
    each.split(",")
    print each
