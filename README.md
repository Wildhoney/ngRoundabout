ngRoundabout
=======

![Travis](http://img.shields.io/travis/Wildhoney/ngRoundabout.svg?style=flat)
&nbsp;
![npm](http://img.shields.io/npm/v/ng-carousel.svg?style=flat)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat)

* **Heroku**: [http://ng-carousel.herokuapp.com/](http://ng-carousel.herokuapp.com/)
* **Bower:** `bower install ngRoundabout`

![ngRoundabout Screenshot](http://i.imgur.com/b76dbkC.png)

`ngRoundabout` is a HTML5 carousel using the wonderful [`preserve-3d` transformation](http://css-tricks.com/almanac/properties/t/transform-style/). With this module you can easily create your own 3D carousel by specifying the markup for the partial &ndash; which are used for each dimension.

---

# Getting Started

Using `ngRoundabout` is very simple &ndash; first you need to pass an `array` via the `ng-model` to the directive. Therefore you need an `array` of *something* &ndash; in our case pictures taken randomly from [Imgur](http://www.imgur.com/):

```javascript
$http.get('imgur.json').then(function then(response) {
    $scope.pictures = response.data;
});
```

We can then setup our directive, passing in the `pictures` into the `ng-model`:

```html
<carousel ng-model="pictures"></carousel>
```

`ngRoundabout` will then compute how many dimensions it will render based on the array. It's worth noting that if you want multiple items per dimension then simply pass an `array` of an `array`.

The next step is to render each dimension &ndash; which requires you supplying the path to your partial which renders the markup for the dimension. By default `ngRoundabout` will attempt to load your partial from **partials/carousel.html**, but you can modify this &mdash; and other options &mdash; by modifying the `FIGURE_PARTIAL_PATH` option.

In order to modify the `ngRoundabout` options, you need to import the `carouselOptions` object into your controller &ndash; from there you can [modify the options](#options).

Lastly from within your partial you need to specify what to output &ndash; where the `model` is each and every item from your `array`:

```html
<a target="_blank" href="{{model}}">
    <div style="background-image: url({{model}})"></div>
</a>
```

Voila! Any additional styles **should** be done via your stylesheet.

# Options

Import `carouselOptions` into your controller, and then you will have access to the following options:

 * `DIMENSION_WIDTH`: Width of each dimension;
 * `DIMENSION_HEIGHT`: Height of each dimension;
 * `DIMENSION_SPACING`: Margin between the dimensions;
 * `PERSPECTIVE`: Perspective for the carousel;
 * `BACKFACE_VISIBILITY`: Whether the backface is visible;
 * `MAINTAIN_ASPECT_RATIO`: See [maintain aspect ratio](#maintain-aspect-ratio);
 * `FIGURE_PARTIAL_PATH`: Path to your dimension partial;

![ngRoundabout Screenshot](http://i.imgur.com/8MaKMCX.png)

# Maintain Aspect Ratio

By default `ngRoundabout` will not maintain the width &mdash; or *aspect ratio* &mdash; of the carousel when items are added and/or removed. By defining `MAINTAIN_ASPECT_RATIO` as `true`, `ngRoundabout` will maintain the width.

Otherwise if the value is `false` then the carousel will gradually contract as items are removed, and expand as items are added &ndash; which can make it difficult to constrain the carousel in a container of a predefined size.