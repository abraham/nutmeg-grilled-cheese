&lt;grilled-cheese&gt;
====

This [demo](https://codepen.io/abrahamwilliams/pen/rGwrvr) Web Component was generated with `nutmeg new grilled-cheese cheese:string[] pickles:boolean quantity:number` followed by a [minimal amount](https://github.com/abraham/nutmeg-grilled-cheese/commit/375dfb0629526cfec6ecddd27e2cf14b33b5a191) of feature and test changes.

Install
----

Polyfill tags if you need them. This will include ShadowDOM and Custom Elements support.

```
<script src="https://unpkg.com/@webcomponents/webcomponentsjs@latest/webcomponents-sd-ce.js"></script>
```

Loading this component. It would be a good idea to use a specific version instead of `latest`.

```
<script src="https://unpkg.com/nutmeg-grilled-cheese@latest/dist/grilled-cheese.min.js"></script>
```

Usage
----

Grilled cheese sandwiches default to a quantity of 1 with cheddar. You can get pickles on them (I know...that's technically a melt) and change the types of cheese to include.

```
  <grilled-cheese></grilled-cheese>

  <grilled-cheese pickles></grilled-cheese>

  <grilled-cheese quantity="5"></grilled-cheese>

  <script>
    document.querySelector('grilled-cheese').cheese = ['cheddar', 'blue'];
  </script>
```

License
----

GrilledCheese is released under an MIT license.

Built, tested, and published with [Nutmeg](https://nutmeg.tools).
