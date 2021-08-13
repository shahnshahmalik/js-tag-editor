# simple-tag-editor



## Import the lib

`import { TagEditor } from "simple-tag-editor";`

## Import the Style

`import "simple-tag-editor/index.css";`


## Add a reference to the input

`const inputEl = document.getElementById('inputEL');`


### Add a custom html for the close btn

`const el = '<i class="fa fa-times"></i>';`


## Initialize

`const tagEdit = new TagEditor('tagEdit', inputEl, el);`

`if(inputEl) {`
`    inputEl.addEventListener('keyup', event => {`
`        if (event.keyCode === 13) {`
`            tagEdit.addTag(inputEl.value);`
`            inputEl.value = '';`
`        }`
`    });`
`}`


### :sunglasses: Thanks and PR's are always welcome!