# Jisho
node.js program that hits the jisho api *https://jisho.org/api/v1/search/words?keyword=house* for english, japanese, and parts of speech for keyword
## Usage
```bsh
$ node index.js <option> <keyword>
```

* Valid <option> are *en*,  *ja* or *ps*. 
  - *en* will translate a japanese word to it's english definition.
  - *ja* will translate an english word to it's japanese translation.
  - *ps* will return the parts of speech for a japanese compound.
* <keyword> is a japanese or english word
