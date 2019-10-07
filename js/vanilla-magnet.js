/*
 * Plugin Name: Vanilla-JS Magnet
 * Version: 0.1.0
 * Plugin URL: https://github.com/JavaScriptUtilities/vanillaMagnet
 * JavaScriptUtilities Vanilla-JS Magnet may be freely distributed under the MIT license.
 */

var vanillaMagnet = function($wrapper, $inner, $item, _args) {
    'use strict';

    _args = _args || {};

    /* Values */
    var _hasMag = false,
        _bound = false,
        _animDuration = _args.animDuration || 100,
        _margin = 10;

    /* Change values at resize */
    function setBound() {
        var _item_bound = $item.getBoundingClientRect();
        _bound = $wrapper.getBoundingClientRect();
        _margin = _item_bound.left - _bound.left;
    }
    document.addEventListener('resize', setBound);
    setBound();

    /* Prepare elements */
    $item.style.willChange = 'transform';
    $item.style.pointerEvents = 'none';

    /* Set magnetism */
    $inner.addEventListener('mouseenter', function(e) {
        setTimeout(function() {
            $wrapper.setAttribute('data-magnetism', 1);
        }, _animDuration + 50);
        _hasMag = 1;
    });
    $wrapper.addEventListener('mouseleave', function(e) {
        $wrapper.setAttribute('data-magnetism', 0);
        _hasMag = 0;
        var _transform = 'translate3d(0,0,0)';
        $item.style.transform = _transform;
        $item.style.webkitTransform = _transform;
    });

    /* Magnetism move */
    $wrapper.addEventListener('mousemove', function(e) {
        if (!_hasMag) {
            return;
        }
        var _wi = _bound.width / 2;
        var _he = _bound.height / 2;
        var _x = (e.clientX - _bound.x - _wi) / _wi * _margin;
        var _y = (e.clientY - _bound.y - _he) / _he * _margin;
        var _transform = 'translate3d(' + _x + 'px,' + _y + 'px,0)';
        $item.style.transform = _transform;
        $item.style.webkitTransform = _transform;
    });

};
