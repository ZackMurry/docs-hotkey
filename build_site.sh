pandoc -s index.md -o index.html --css=index.css
pandoc -s addon/index.md -o addon/index.html --css=../index.css
pandoc -s addon/privacy.md -o addon/privacy.html --css=../index.css
pandoc -s addon/terms.md -o addon/terms.html --css=../index.css
