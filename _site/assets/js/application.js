// Generated by CoffeeScript 1.6.3
(function() {
  var Pages, Slideshow, Tutorial,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  Pages = (function() {
    function Pages() {
      this.browserSupportsCSSProperty = __bind(this.browserSupportsCSSProperty, this);
    }

    Pages.prototype.browserSupportsCSSProperty = function(featureName) {
      var domPrefixes, elm, featureNameCapital, i, _i, _ref;
      elm = document.createElement('div');
      featureName = featureName.toLowerCase();
      if (elm.style[featureName] !== void 0) {
        return true;
      }
      domPrefixes = 'Webkit Moz ms O'.split(' ');
      featureNameCapital = featureName.charAt(0).toUpperCase() + featureName.substr(1);
      for (i = _i = 0, _ref = domPrefixes.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
        if (elm.style[domPrefixes[i] + featureNameCapital] !== void 0) {
          return true;
        }
      }
      return false;
    };

    return Pages;

  })();

  Slideshow = (function(_super) {
    __extends(Slideshow, _super);

    Slideshow.prototype.slideShowImages = {};

    function Slideshow() {
      this.slideShowImages = window.slides;
      this.showNextSlide();
      Slideshow.__super__.constructor.call(this, "browserSupportsCSSProperty");
    }

    Slideshow.prototype.numSlides = function() {
      return Object.keys(this.slideShowImages).length;
    };

    Slideshow.prototype.activeIndex = function() {
      var activeIndex;
      return activeIndex = $("#slideshow .active").index();
    };

    Slideshow.prototype.nextIndex = function() {
      if (this.activeIndex() === this.numSlides() - 1) {
        return 0;
      } else {
        return this.activeIndex() + 1;
      }
    };

    Slideshow.prototype.showNextSlide = function() {
      return this.showSlideAtIndex(this.nextIndex());
    };

    Slideshow.prototype.filename = function(index) {
      return Object.keys(this.slideShowImages)[index];
    };

    Slideshow.prototype.title = function(index) {
      var filename;
      filename = this.filename(index);
      return this.slideShowImages[filename];
    };

    Slideshow.prototype.src = function(index) {
      return "/images/slideshow/" + (this.filename(index)) + ".png";
    };

    Slideshow.prototype.imgHtml = function(index) {
      return $("<img src='" + (this.src(index)) + "' class='slide' alt='" + (this.title(index)) + "' />");
    };

    Slideshow.prototype.isLoaded = function(index) {
      return index + 1 <= $("#slideshow img").length;
    };

    Slideshow.prototype.showSlideAtIndex = function(slideIndex) {
      var newImage, start,
        _this = this;
      if (this.isLoaded(slideIndex)) {
        return this.fadeInSlideAfterDelayAtIndex(slideIndex);
      } else {
        newImage = this.imgHtml(slideIndex);
        if (newImage.complete || newImage.readyState === 4) {
          return this.addImageToSlideshow(newImage);
        } else {
          start = new Date().getTime();
          return newImage.load(function() {
            var elapsed;
            elapsed = new Date().getTime() - start;
            return _this.addImageToSlideshow(newImage, elapsed);
          });
        }
      }
    };

    Slideshow.prototype.addImageToSlideshow = function(image, loadTime) {
      var imageWidth;
      if (loadTime == null) {
        loadTime = 0;
      }
      imageWidth = image[0].width === 0 ? $("#slideshow .slide")[0].width : image[0].width / 2;
      image.attr("width", imageWidth).appendTo('#slideshow');
      return this.fadeInSlideAfterDelayAtIndex($("#slideshow .slide").length - 1, loadTime);
    };

    Slideshow.prototype.fadeInSlideAfterDelayAtIndex = function(slideIndex, shortenDelay) {
      var delay,
        _this = this;
      if (shortenDelay == null) {
        shortenDelay = 0;
      }
      delay = shortenDelay < 3000 ? 3000 - shortenDelay : 0;
      return setTimeout(function() {
        var newSlide;
        if (_this.browserSupportsCSSProperty("transition")) {
          $("#slideshow .active").removeClass("active");
          $("#slideshow img:eq(" + slideIndex + ")").addClass("active");
          return _this.showNextSlide();
        } else {
          $("#slideshow .active").fadeTo(600, 0, function() {
            return $(this).removeClass("active");
          });
          newSlide = $("#slideshow img:eq(" + slideIndex + ")");
          return newSlide.fadeTo(600, 1, function() {
            newSlide.addClass("active");
            return _this.showNextSlide();
          });
        }
      }, delay);
    };

    return Slideshow;

  })(Pages);

  Tutorial = (function(_super) {
    __extends(Tutorial, _super);

    Tutorial.prototype.animateInOffset = 80;

    Tutorial.prototype.animateInClass = "dont-animate";

    function Tutorial() {
      this.questionTabClick = __bind(this.questionTabClick, this);
      this.selectTab = __bind(this.selectTab, this);
      this.tutorialTabClick = __bind(this.tutorialTabClick, this);
      this.animateInPresentElements = __bind(this.animateInPresentElements, this);
      if (this.browserSupportsCSSProperty("transition")) {
        this.animateInClass = "animate-in";
      }
      $(window).scroll(this.animateInPresentElements);
      if (this.isMacUser()) {
        $("#option-newuser-w").attr("id", "option-newuser-m");
      }
      $("#tutorial > .tabs a").click(this.tutorialTabClick);
      $(".question .tabs a").click(this.questionTabClick);
      $(".tutorial-list > li").addClass(this.animateInClass);
      $(".next-steps li").addClass(this.animateInClass);
      $(".tutorial-list").each(function(index, element) {
        var chosenOption, questionIndex;
        questionIndex = $(element).find(".question").index();
        $(element).find("> li:eq(" + questionIndex + ")").nextAll().not(".option-all").addClass("hidden");
        chosenOption = $(element).find(".question .selected").attr("id");
        return $(element).find("." + chosenOption).removeClass("hidden");
      });
    }

    Tutorial.prototype.isMacUser = function() {
      return navigator.userAgent.indexOf("Mac OS X") !== -1;
    };

    Tutorial.prototype.resetTutorialStepsAfterStep = function(stepIndex) {
      return $(".tutorial-list.active > li:eq(" + stepIndex + ")").nextAll().addClass(this.animateInClass);
    };

    Tutorial.prototype.resetAllTutorialSteps = function() {
      return $(".tutorial-list.active > li").addClass(this.animateInClass);
    };

    Tutorial.prototype.animateInPresentElements = function(index) {
      var bottomScrollPosition, windowHeight, windowScrollPosition,
        _this = this;
      windowHeight = $(window).height();
      windowScrollPosition = $(window).scrollTop();
      bottomScrollPosition = windowHeight + windowScrollPosition;
      return $(".animate-in").not(".hidden").each(function(i, element) {
        if ($(element).offset().top + _this.animateInOffset < bottomScrollPosition) {
          return $(element).removeClass(_this.animateInClass);
        }
      });
    };

    Tutorial.prototype.tutorialTabClick = function(e) {
      var href;
      e.preventDefault();
      this.selectTab(e.currentTarget);
      $(".tutorial-list.active").removeClass("active");
      href = $(e.currentTarget).attr("href");
      $(href).addClass("active");
      this.resetAllTutorialSteps();
      return this.animateInPresentElements();
    };

    Tutorial.prototype.selectTab = function(tab) {
      $(tab).closest(".tabs").find(".selected").removeClass("selected");
      return $(tab).addClass("selected");
    };

    Tutorial.prototype.questionTabClick = function(e) {
      var currentOption, newOption, stepIndex;
      e.preventDefault();
      currentOption = $(e.currentTarget).closest(".tabs").find(".selected").attr("id");
      this.selectTab(e.currentTarget);
      $(".tutorial-list.active ." + currentOption).addClass("hidden");
      newOption = $(e.currentTarget).attr("id");
      $(".tutorial-list.active ." + newOption).removeClass("hidden");
      stepIndex = $(e.currentTarget).closest(".question").index();
      this.resetTutorialStepsAfterStep(stepIndex);
      return this.animateInPresentElements();
    };

    return Tutorial;

  })(Pages);

  $(function() {
    new Slideshow();
    return new Tutorial();
  });

}).call(this);
