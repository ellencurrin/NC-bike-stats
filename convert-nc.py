oldFile=open("crashdata-city.csv", "r")
newFile=open("crashes-by-city.txt", "w")
lines= oldFile.readlines()
for aLineStr in lines [7:-1]:
    argList = aLineStr.split("\t")
    city = argList[0]
    argList[0]= city + ", NC"
    print argList
    #newFile.write(argList)
newFile.close()
oldFile.close()
print "script complete"

