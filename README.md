# tagalizer
Tag editor jquery

Requirements
------------
* [jQuery](http://jquery.com/) (just tested with version 3.1.1)

Usage
-----

Include requirements and plugin in the header of your website

```html
<html>
    <head>
        <script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/3.1.0/jquery.min.js"></script>
        <!-- Or other compatible version :) -->

        <!-- to minified version -->
        <script type="text/javascript" src="tagalizer.min.js"></script>
        <link rel="stylesheet" href="tagalizer.min.css">
    </head>
    <!-- ... -->
```


Create the element that will be handled by jquery

```html
<div class="tagalizer"></div>

<!-- input[type="hidden"](prefered) that will receive the values (optional) -->
<input type="hidden" id="tagalizer-input">

<!-- ... -->
```

Now you use the jquery to initialize the plugin

```html
<script type="text/javascript">
$(document).ready(function() {
    $('.tagalizer').tagalizer({
        input: "#tagalizer-input",//This is the input of destiny...If you need, right!!
    })
});
</script>
```

All right? This works fine? :)

Options(No longer informations)
-----

* The itens are demonstrated with the default values

```html
<script type="text/javascript">
$(document).ready(function() {
    $('.tagalizer').tagalizer({
        input: "",//is the input of destiny...some selector, ex: #someSelector
        initialValues: [],//You has init values? put the values(Array) here. ex: ['some', 'word', 'here']
        delimiters: [" ", ",", ";", "Enter"],//keys that identify the new words
        serializerDelimiter: ";",//this is used to serializer the values on input. ex: ["some", "word", "here"] --> input.target.value == some;word;here
        regex: /[a-zA-Z\d-]+/,//Regex to the format of keyword
        placeholder: "keyword",//A placaholder to the input
        actionIn: "keyup", //This can be keyAnything
        duplicate: false,//Acceptable duplacate itens
        minLength: 3,//Minimum size of string
        maxLenght: 10//Maximum size of stirng
    })
});
</script>
```

Interacting with object
-----

```html
<script type="text/javascript">
$(document).ready(function() {
    var _tagalizer = $('.tagalizer').tagalizer({
        input: "#tagalizer-input",//This is the input of destiny...If you need, right!!
    });
    ...
    ...
    console.log(_tagalizer.getItens())//This returns a array with the words
});
</script>
```

Callbacks
-----

Ok, maybe you needs of some callbacks, right? Yes!?

```html
<script type="text/javascript">
$(document).ready(function() {
    $('.tagalizer').tagalizer({
        input: "#tagalizer-input",
        onKeyUp: function(key, keyCode) {
            //when key is added
        },
        onItemAdd: function(item, length) {
            //when keyword is added
        },
        onDelete: function(index, value) {
            //when keyword is deleted
        },
        onClickItem: function(index, value) {
            //when item is clicked
        },
        onDuplicateItem: function() {
            //when found a duplicate item
        }
    })
});
</script>
```
Ok, now the job is yours :)


Want a "live" example? see here [full example](https://github.com/willianbriotto/tagalizer/blob/master/index.html).
