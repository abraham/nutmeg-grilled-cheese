&lt;grilled-cheese&gt;
====

Install
----

Polyfill tags if you need them.

```
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-loader.js"></script>
<script nomodule src="https://unpkg.com/browser-es-module-loader@latest/dist/babel-browser-build.js"></script>
<script nomodule src="https://unpkg.com/browser-es-module-loader@latest/dist/browser-es-module-loader.js"></script>
```

Loading this component.

```
<script type="module" src="https://unpkg.com/grilled-cheese@latest/dist/grilled-cheese.js"></script>

```

Usage
----

```
  <grilled-cheese cheese="Some value"></grilled-cheese>

  <grilled-cheese pickles="Some value"></grilled-cheese>

  <grilled-cheese quantity="Some value"></grilled-cheese>

  <grilled-cheese>Slot content</grilled-cheese>
```

License
----

GrilledCheese is released under an MIT license.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
