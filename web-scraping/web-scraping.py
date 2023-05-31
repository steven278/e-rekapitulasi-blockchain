from bs4 import BeautifulSoup

with open("test.html", "r") as f: #r mean read mode
    doc = BeautifulSoup(f, "html.parser")

# print(doc.prettify())
tag = doc.h1 #get first h1 tag
print(tag) #print the h1 tag
print(tag.string) #print the content of the h1
tag.string = 'hello world'
print(tag)

tag2 = doc.find("h2") # only search for the first tag found
print(tag2)

tag3 = doc.find_all("h1") # find all tag h1
print(tag3)