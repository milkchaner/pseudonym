# pseudonym (the internal name)
this is a little website i made for my family cuz alias games on app store and google play just money-grabbing bullshit  
the src is in english, but the ui and the words arent, feel free to fork this if you wanna make this an actual multilingual website

## how to build
for building and local deployment you'll need:
- typescript compiler
- anything that can host a directory (in the example ill use python)

here is the commands:
```
git clone https://codeberg.org/astralwink/pages pseudonym
cd pseudonym
ln -s ../index.html dist/index.html
ln -s ../style dist/style
ln -s ../assets dist/assets
tsc && python -m http.server 8080 -d dist
```
