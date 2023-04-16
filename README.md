# RadishJS

## Description

RadishJS is a library to help adding dynamic content on server side rendered, static websites

## Usage

Include `radish.js` in your `html` file.

```html
<script src="radish.js" url="http://example.com">
```

or

```html
<script src="https://cdn.jsdelivr.net/gh/lucakrueger/radishjs@master/radish.js" url="http://example.com">
```

using the `url` attribute is optional and just specifies a gloabl url used by all values.

Add Elements by using the Tag
```html
<external-value>
```

<hr>

There are two ways when it comes to loading external values.

### Direct Loading

You can get a value from your server directly by adding `get` and `attr`.
It will be loaded just right after Initialization.

> `get` specifies a url where the content will be loaded from, or if you already specified a url when including the script, a subdirectory.

> `attr` specifies the corresponding item in the response body.

**Example**

```html
<external-value get="http://example.com/value" attr="value-attr">
````
or
```html
<external-value get="value" attr="value-attr">
````

**Server Request (After Loading)**
```url
http://example.com/value
```

**Server Response**
```js
{
    value-attr: "data ..."
    ...
}
```

Now if `attr` matches the key in the servers response, the specified data loads correctly.

<hr>

### Bound Loading

If you dont want to load your data right after initialization you can also bind it by adding `bind`.

> `bind`specifies, like `attr`, an item in the response body.

*Note*
> *When binding a value, you cannot specify a url, because to load because `radishjs` wont handle the networking this time*

To update the value you have to seperately call a function after requesting data from your server

```js
updateBinding(name, response)
```

or

```js
updateBinding(names[], response)
```

**Example**
```html
<external-value bind="value-binding">
```

**Server Request (Example using Fetch API)**
```js
fetch('http://example.com/request', {
        ...
    }).then((body) => {
        body.json().then((response) => {
            updateBinding('value-binding', response)
        })
    })
```

**Server Response**
```js
{
    value-binding: "data ..."
    ...
}
```

Now if bind matches the key in the servers response, the specified data loads correctly.